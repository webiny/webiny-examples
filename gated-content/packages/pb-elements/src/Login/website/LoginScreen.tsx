import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Auth } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useWebsiteTenant } from "@demo/website";
import { useRouter } from "@webiny/react-router";
import { LoginElementData } from "../types";

const username = {
    label: "Email",
    placeholder: "Enter your Email",
    required: true
};

const Login = styled.div`
    .amplify-tabs {
        button:nth-of-type(2) {
            display: none;
        }
    }
`;

const Signup = styled.div`
    .amplify-tabs {
        button:nth-of-type(1) {
            display: none;
        }
    }
`;

const LoadingIdentity = styled.div`
    text-align: center;
    font-size: 16px;
    padding: 50px;
`;

const LoginWithSignup = styled.div``;

// This is a crazy hack that allows us to correctly switch between Login/Signup tabs.
// Amplify UI library is not designed to be used in such a dynamic environment, where
// we have different configurations between routes, and so we need to be creative :)
const createTabSwitcher = (type: string) => {
    return function TabSwitcher() {
        const { toSignIn, toSignUp, route } = useAuthenticator();

        useEffect(() => {
            if (route === "signIn" && type === "signup") {
                toSignUp();
            } else if (route === "signUp" && type.includes("login")) {
                toSignIn();
            }
        }, []);
        return <></>;
    };
};

const wrappers = {
    login: Login,
    signup: Signup,
    "login-with-signup": LoginWithSignup
};

export const LoginScreen = ({ type, signupGroup, afterSignupUrl }: LoginElementData) => {
    const { tenant } = useWebsiteTenant();
    const { history } = useRouter();
    const Wrapper = wrappers[type];

    console.log("LoginScreen", { type, tenant, signupGroup });

    return (
        <Wrapper>
            <Authenticator
                initialState={"signIn"}
                signUpAttributes={["family_name", "given_name"]}
                components={{ Header: createTabSwitcher(type) }}
                formFields={{
                    signIn: {
                        username
                    },
                    signUp: {
                        username: {
                            ...username,
                            order: 3
                        },
                        given_name: {
                            label: "First Name",
                            placeholder: "Enter your first name",
                            required: true,
                            order: 1
                        },
                        family_name: {
                            label: "Last Name",
                            placeholder: "Enter your last name",
                            required: true,
                            order: 2
                        }
                    }
                }}
                services={{
                    async handleSignUp(formData) {
                        const { username, password, attributes } = formData;

                        // Assign default username to "email"
                        attributes.email = username;

                        // Per-tenant username
                        const perTenantUsername = `${tenant}:${username.toLowerCase()}`;

                        // Add custom attributes
                        attributes["custom:wby_tenant"] = tenant;
                        attributes["custom:wby_website_group"] = signupGroup;

                        const res = await Auth.signUp({
                            username: perTenantUsername,
                            password,
                            attributes,
                            autoSignIn: {
                                enabled: true
                            }
                        });

                        if (res.userConfirmed) {
                            setTimeout(() => {
                                history.push(afterSignupUrl || "/");
                            });
                        }

                        return res;
                    },
                    handleSignIn({ username, password }) {
                        username = `${tenant}:${username.toLowerCase()}`;

                        return Auth.signIn({
                            username,
                            password
                        });
                    }
                }}
            >
                <LoadingIdentity>Looking for content...</LoadingIdentity>
            </Authenticator>
        </Wrapper>
    );
};

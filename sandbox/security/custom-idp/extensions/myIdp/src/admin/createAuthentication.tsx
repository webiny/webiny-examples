import React, { useEffect, useRef, useState } from "react";
import { setContext } from "apollo-link-context";
import ApolloClient from "apollo-client";
import { DocumentNode } from "graphql";
import { plugins } from "@webiny/plugins";
import { CircularProgress } from "@webiny/ui/Progress";
import { useSecurity } from "@webiny/app-serverless-cms";
import { ApolloLinkPlugin } from "@webiny/app/plugins/ApolloLinkPlugin";
import { useTenancy, withTenant } from "@webiny/app-tenancy";
import {
    createGetIdentityData,
    GetIdentityDataCallable,
    LOGIN_MT,
    LOGIN_ST
} from "./createGetIdentityData";

export interface Config {
    getIdentityData?: GetIdentityDataCallable;
    loginMutation?: DocumentNode;
    onError?: (error: Error) => void;
}

export interface AuthenticationProps {
    getIdentityData(params: { client: ApolloClient<any> }): Promise<{ [key: string]: any }>;

    children: React.ReactNode;
}

interface WithGetIdentityDataProps {
    getIdentityData: GetIdentityDataCallable;
    children: React.ReactNode;
}

interface WithGetIdentityDataFunctionProps {
    children?: React.ReactNode;
}

const myIdpAuth = {
    getIdToken: () => {
        return "id-token-received-from-idp";
    },
    signOut: () => {
        return "sign-out";
    },
    isAuthenticated: async () => {
        return true;
    }
};
export const createAuthentication = ({ onError, ...config }: Config) => {
    const withGetIdentityData = (Component: React.ComponentType<WithGetIdentityDataProps>) => {
        return function WithGetIdentityData({ children }: WithGetIdentityDataFunctionProps) {
            const { isMultiTenant } = useTenancy();
            const loginMutation = isMultiTenant ? LOGIN_MT : LOGIN_ST;
            const getIdentityData = createGetIdentityData(loginMutation);

            return <Component getIdentityData={getIdentityData}>{children}</Component>;
        };
    };

    const Authentication = ({ getIdentityData, children }: AuthenticationProps) => {
        const timerRef = useRef<number | undefined>(undefined);
        const { identity, setIdentity, setIdTokenProvider } = useSecurity();
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            /**
             * We need to give the security layer a way to fetch the `idToken`, so other network clients can use
             * it when sending requests to external services (APIs, websockets,...).
             */
            setIdTokenProvider(myIdpAuth.getIdToken);

            plugins.register(
                new ApolloLinkPlugin(() => {
                    return setContext(async (_, payload) => {
                        clearTimeout(timerRef.current);

                        timerRef.current = setTimeout(() => {
                            // Reload browser after 1 hour of inactivity
                            window.location.reload();
                        }, 3600000) as unknown as number;

                        return payload;
                    });
                }),
                new ApolloLinkPlugin(() => {
                    return setContext(async (_, { headers }) => {
                        // If "Authorization" header is already set, don't overwrite it.
                        if (headers && headers.Authorization) {
                            return { headers };
                        }

                        if (!(await myIdpAuth.isAuthenticated())) {
                            return { headers };
                        }

                        const idToken = myIdpAuth.getIdToken();

                        if (!idToken) {
                            return { headers };
                        }

                        return {
                            headers: {
                                ...headers,
                                Authorization: `Bearer ${idToken}`
                            }
                        };
                    });
                })
            );
        }, []);

        const logout = () => {
            clearTimeout(timerRef.current);
            myIdpAuth.signOut();
            setIdentity(null);
            setIsAuthenticated(false);
        };

        // const authStateChanged = useCallback(async (authState: AuthState) => {
        //     setIsAuthenticated(!!authState.isAuthenticated);
        //     if (authState.isAuthenticated) {
        //         // Make sure current app client ID matches token's clientId.
        //         // If not, verify that current identity can access current app, using the given app client id.
        //         if (authState.idToken.clientId !== clientId) {
        //             try {
        //                 await myIdpAuth.token.renewTokens();
        //             } catch (err) {
        //                 if (
        //                     err.message.includes("User is not assigned to the client application")
        //                 ) {
        //                     setIdentity(null);
        //                     setIsAuthenticated(false);
        //                     return;
        //                 }
        //             }
        //         }
        //
        //         try {
        //             const {id, displayName, type, permissions, ...other} = await getIdentityData({
        //                 client: apolloClient
        //             });
        //
        //             setIdentity({
        //                 id,
        //                 displayName,
        //                 type,
        //                 permissions,
        //                 ...other,
        //                 logout
        //             });
        //
        //             validatePermissions(permissions);
        //         } catch (err) {
        //             if (typeof onError === "function") {
        //                 onError(err);
        //             } else {
        //                 console.error(err);
        //                 logout();
        //             }
        //         }
        //     } else {
        //         // Unset identity
        //         setIdentity(null);
        //     }
        // }, []);

        // useEffect(() => {
        //     const authStateManager: AuthStateManager = myIdpAuth.authStateManager;
        //     authStateManager.subscribe(authStateChanged);
        //
        //     return () => authStateManager.unsubscribe(authStateChanged);
        // }, []);

        return (
            <>
                {identity ? (
                    children
                ) : isAuthenticated ? (
                    <CircularProgress label={"Logging in..."} />
                ) : null}
            </>
        );
    };

    return withGetIdentityData(withTenant(Authentication));
};

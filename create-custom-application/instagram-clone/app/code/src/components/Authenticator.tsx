import React, { useEffect } from "react";
import Auth from "@aws-amplify/auth";
import { useSecurity, SecurityIdentity } from "@webiny/app-security";

Auth.configure({
    region: process.env.REACT_APP_USER_POOL_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    oauth: {
        domain: process.env.REACT_APP_USER_POOL_DOMAIN,
        scope: ["email", "profile", "openid"],
        redirectSignIn: "http://localhost:3001?signedin",
        redirectSignOut: "http://localhost:3001?signedout",
        responseType: "token"
    }
});

window["Auth"] = Auth;

/**
 * The default layout component which you can use on any page.
 * Feel free to customize it or create additional layout components.
 */
const Authenticator: React.FC = props => {
    const { setIdentity } = useSecurity();

    useEffect(() => {
        Auth.currentSession().then(response => {
            const user = response.getIdToken().payload;
            setIdentity(
                new SecurityIdentity({
                    login: user["cognito:username"],
                    firstName: user.given_name,
                    lastName: user.family_name,
                    logout: () => {
                        Auth.signOut();
                        setIdentity(null);
                    }
                })
            );
        });
    }, []);

    return <>{props.children}</>;
};

export default Authenticator;

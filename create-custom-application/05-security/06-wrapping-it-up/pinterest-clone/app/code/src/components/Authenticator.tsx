import React, { useEffect } from "react";
import Auth from "@aws-amplify/auth";
import { useSecurity, SecurityIdentity } from "@webiny/app-security";

// Apart from the React component, we also configure the Auth class here.
Auth.configure({
    region: process.env.REACT_APP_USER_POOL_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    oauth: {
        domain: process.env.REACT_APP_USER_POOL_DOMAIN,
        redirectSignIn: `${location.origin}?signIn`,
        redirectSignOut: `${location.origin}?signOut`,
        responseType: "token",
    },
});

// The `Authenticator` component.
const Authenticator: React.FC = (props) => {
    const { setIdentity } = useSecurity();

    useEffect(() => {
        // Get the currently signed-in user.
        Auth.currentSession()
            .then((response) => {
                const user = response.getIdToken().payload;
                setIdentity(
                    new SecurityIdentity({
                        login: user.email,
                        firstName: user.given_name,
                        lastName: user.family_name,
                        logout: () => {
                            Auth.signOut();
                            setIdentity(null);
                        },
                    })
                );
            })
            .catch(() => {
                /* Do nothing. */
            });
    }, []);

    return <>{props.children}</>;
};

export default Authenticator;

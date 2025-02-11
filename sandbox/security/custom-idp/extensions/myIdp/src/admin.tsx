import React from "react";
import { CreateAuthenticationConfig } from "@webiny/app-admin-users-cognito";
import { ButtonPrimary } from "@webiny/ui/Button";

export const cognitoConfig: CreateAuthenticationConfig = {
    oauth: {
        domain: String(process.env.REACT_APP_USER_POOL_DOMAIN),
        redirectSignIn: "http://localhost:3001",
        redirectSignOut: "http://localhost:3001",
        scope: ["profile", "email", "openid"],
        responseType: "token"
    },

    federatedProviders: [
        {
            name: "MyIDP",
            component: ({ signIn }) => {
                return <ButtonPrimary onClick={signIn}>Sign in via My IDP</ButtonPrimary>;
            }
        }
    ]
};

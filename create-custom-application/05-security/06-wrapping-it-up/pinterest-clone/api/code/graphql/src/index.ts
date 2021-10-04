import { createHandler } from "@webiny/handler-aws";
import graphqlPlugins from "@webiny/handler-graphql";
import logsPlugins from "@webiny/handler-logs";
import securityPlugins, { SecurityIdentity } from "@webiny/api-security";
import cognitoAuthenticationPlugins from "@webiny/api-security-cognito-authentication";

// Imports plugins created via scaffolding utilities.
import scaffoldsPlugins from "./plugins/scaffolds";

const debug = process.env.DEBUG === "true";

export const handler = createHandler({
    plugins: [
        /**
         * Setup Webiny Security Framework to handle authentication and authorization.
         * Learn more: https://www.webiny.com/docs/key-topics/security-framework/introduction
         */
        securityPlugins(),

        /**
         * Cognito authentication plugin.
         * This plugin will verify the JWT token against a provided User Pool.
         */
        cognitoAuthenticationPlugins({
            region: process.env.COGNITO_REGION,
            userPoolId: process.env.COGNITO_USER_POOL_ID,
            identityType: "user",
            getIdentity({ identityType, token }) {
                return new SecurityIdentity({
                    id: token["cognito:username"],
                    type: identityType,
                    displayName: `${token.given_name} ${token.family_name}`,
                    firstName: token.given_name,
                    lastName: token.family_name,
                });
            },
        }),
        logsPlugins(),
        graphqlPlugins({ debug }),
        scaffoldsPlugins(),
    ],
    http: { debug },
});

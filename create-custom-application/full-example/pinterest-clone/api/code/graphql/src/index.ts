import { createHandler } from "@webiny/handler-aws";
import graphqlPlugins from "@webiny/handler-graphql";
import logsPlugins from "@webiny/handler-logs";
import authenticationPlugins from "@webiny/api-authentication";
import { authenticateUsingHttpHeader } from "@webiny/api-authentication/authenticateUsingHttpHeader";
import cognitoAuthenticationPlugins from "@webiny/api-authentication-cognito";

// Imports plugins created via scaffolding utilities.
import scaffoldsPlugins from "./plugins/scaffolds";

const debug = process.env.DEBUG === "true";

export const handler = createHandler({
    plugins: [
        /**
         * Setup authentication plugins.
         */
        authenticationPlugins(),
        authenticateUsingHttpHeader(),

        /**
         * Setup Amazon Cognito authentication plugins.
         */
        cognitoAuthenticationPlugins({
            region: process.env.COGNITO_REGION,
            userPoolId: process.env.COGNITO_USER_POOL_ID,
            identityType: "user"
        }),

        logsPlugins(),
        graphqlPlugins({ debug }),
        scaffoldsPlugins()
    ],
    http: { debug }
});

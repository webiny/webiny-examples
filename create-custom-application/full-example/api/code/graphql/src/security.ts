import security from "@webiny/api-security";
import cognitoAuthentication from "@webiny/api-security-cognito-authentication";

export default () => [
    /**
     * Setup Webiny Security Framework to handle authentication and authorization.
     * Learn more: https://www.webiny.com/docs/key-topics/security-framework/introduction
     */
    security(),

    /**
     * Cognito authentication plugin.
     * This plugin will verify the JWT token against a provided User Pool.
     */
    cognitoAuthentication({
        region: process.env.COGNITO_REGION,
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        identityType: "user"
    })
];

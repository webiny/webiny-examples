import {
    CreateCoreAppParams,
    configureAdminCognitoFederation as baseConfigureAdminCognitoFederation
} from "@webiny/serverless-cms-aws";

export const configureAdminCognitoFederation: NonNullable<CreateCoreAppParams["pulumi"]> = app => {
    app.resources.userPool.config.schemas(schemas => {
        return [
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ...schemas!,
            {
                attributeDataType: "String",
                name: "tenant",
                required: false,
                developerOnlyAttribute: false,
                mutable: true,
                stringAttributeConstraints: {
                    maxLength: "36",
                    minLength: "0"
                }
            }
        ];
    });
    baseConfigureAdminCognitoFederation(app, {
        domain: String(process.env["WEBINY_CORE_COGNITO_USER_POOL_DOMAIN"]),
        callbackUrls: ["http://localhost:3001"],
        identityProviders: [
            {
                name: "Auth0",
                type: "oidc",
                attributeMapping: {
                    "custom:id": "sub",
                    username: "sub",
                    email: "email",
                    given_name: "given_name",
                    family_name: "family_name",
                    preferred_username: "email",
                    "custom:tenant": "tenant"
                },
                providerDetails: {
                    attributes_request_method: "POST",
                    authorize_scopes: "email profile openid",
                    client_id: String(process.env["WEBINY_CORE_AUTH0_CLIENT_ID"]),
                    client_secret: String(process.env["WEBINY_CORE_AUTH0_CLIENT_SECRET"]),
                    oidc_issuer: String(process.env["WEBINY_CORE_AUTH0_OIDC_ISSUER"])
                }
            }
        ]
    });
};

import * as aws from "@pulumi/aws";

class Cognito {
    userPoolClient: aws.cognito.UserPoolClient;
    userPool: aws.cognito.UserPool;
    userPoolDomain: aws.cognito.UserPoolDomain;
    constructor() {
        this.userPool = new aws.cognito.UserPool("instagram-clone", {
            passwordPolicy: {
                minimumLength: 8,
                requireLowercase: false,
                requireNumbers: false,
                requireSymbols: false,
                requireUppercase: false,
                temporaryPasswordValidityDays: 7
            },
            aliasAttributes: ["phone_number", "email", "preferred_username"],
            adminCreateUserConfig: {
                allowAdminCreateUserOnly: false
            },
            autoVerifiedAttributes: ["email"],
            emailConfiguration: {
                emailSendingAccount: "COGNITO_DEFAULT"
            },
            lambdaConfig: {},
            mfaConfiguration: "OFF",
            userPoolAddOns: {
                advancedSecurityMode: "OFF" /* required */
            },
            verificationMessageTemplate: {
                defaultEmailOption: "CONFIRM_WITH_CODE"
            },
            schemas: [
                {
                    attributeDataType: "String",
                    name: "email",
                    required: true,
                    developerOnlyAttribute: false,
                    mutable: true,
                    stringAttributeConstraints: {
                        maxLength: "2048",
                        minLength: "0"
                    }
                },
                {
                    attributeDataType: "String",
                    name: "family_name",
                    required: true,
                    developerOnlyAttribute: false,
                    mutable: true,
                    stringAttributeConstraints: {
                        maxLength: "2048",
                        minLength: "0"
                    }
                },
                {
                    attributeDataType: "String",
                    name: "given_name",
                    required: true,
                    developerOnlyAttribute: false,
                    mutable: true,
                    stringAttributeConstraints: {
                        maxLength: "2048",
                        minLength: "0"
                    }
                }
            ]
        });

        this.userPoolClient = new aws.cognito.UserPoolClient("instagram-clone", {
            userPoolId: this.userPool.id,
            accessTokenValidity: 0,
            callbackUrls: ["http://localhost:3001?signedin"],
            logoutUrls: ["http://localhost:3001?signedout"],
            enableTokenRevocation: true,
            explicitAuthFlows: [
                "ALLOW_USER_SRP_AUTH",
                "ALLOW_REFRESH_TOKEN_AUTH",
                "ALLOW_CUSTOM_AUTH"
            ],
            idTokenValidity: 0,
            readAttributes: [],
            refreshTokenValidity: 30,
            supportedIdentityProviders: ["COGNITO"],
            writeAttributes: [],

            allowedOauthFlows: ["implicit"],
            allowedOauthFlowsUserPoolClient: true,
            allowedOauthScopes: ["openid", "profile", "email"],
        });

        this.userPoolDomain = new aws.cognito.UserPoolDomain("instagram-clone", {
            domain: "instagram-clone-test",
            userPoolId: this.userPool.id
        });
    }
}

export default Cognito;

import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { CorePulumiApp } from "@webiny/pulumi-aws";

// We mark resources as protected if deploying via CI/CD and into one of the specified environments.
const protectResource = (app: CorePulumiApp) => {
    return "CI" in process.env && ["prod", "staging"].includes(app.params.run["env"]);
};

export type CustomCoreOutput = {
    notesAppUserPoolId: string;
    notesAppUserPoolRegion: string;
    notesAppUserPoolClient: string;
    notesAppUserPoolArn: string;
};

export const configureNotesAppCognitoUserPool = (app: CorePulumiApp) => {

    const userPool = app.addResource(aws.cognito.UserPool, {
        name: "notes-app-users",
        config: {
            schemas: [
                {
                    attributeDataType: "String",
                    name: "email",
                    required: false,
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
                    required: false,
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
                    required: false,
                    developerOnlyAttribute: false,
                    mutable: true,
                    stringAttributeConstraints: {
                        maxLength: "2048",
                        minLength: "0"
                    }
                },
                {
                    attributeDataType: "String",
                    name: "wby_tenant",
                    required: false,
                    developerOnlyAttribute: false,
                    mutable: true,
                    stringAttributeConstraints: {
                        maxLength: "30",
                        minLength: "0"
                    }
                },
                {
                    attributeDataType: "String",
                    name: "wby_notes_app_group",
                    required: false,
                    developerOnlyAttribute: false,
                    mutable: true,
                    stringAttributeConstraints: {
                        maxLength: "50",
                        minLength: "0"
                    }
                }
            ],
            passwordPolicy: {
                minimumLength: 8,
                requireLowercase: false,
                requireNumbers: false,
                requireSymbols: false,
                requireUppercase: false,
                temporaryPasswordValidityDays: 7
            },
            autoVerifiedAttributes: ["email"],
            aliasAttributes: ["preferred_username"],
        },
        opts: { protect: protectResource(app) }
    });

    const userPoolClient = app.addResource(aws.cognito.UserPoolClient, {
        name: "notes-app",
        config: {
            userPoolId: userPool.output.id,
            explicitAuthFlows: [
                "ALLOW_USER_SRP_AUTH",
                "ALLOW_CUSTOM_AUTH",
                "ALLOW_REFRESH_TOKEN_AUTH"
            ],

            supportedIdentityProviders: ["COGNITO"]
        }
    });

    app.addOutputs({
        notesAppUserPoolId: userPool.output.id,
        notesAppUserPoolRegion: String(process.env.AWS_REGION),
        notesAppUserPoolArn: userPool.output.arn,
        notesAppUserPoolClient: userPoolClient.output.id
    });
};
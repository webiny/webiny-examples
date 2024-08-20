import { ApiPulumiApp } from "@webiny/pulumi-aws";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";

export const applyNotesAppEnvVariables = (app: ApiPulumiApp) => {
    const core = getStackOutput({
        folder: "apps/core",
        env: app.params.run["env"]
    });

    if (!core) {
        throw new Error("Core application is not deployed.");
    }

    app.setCommonLambdaEnvVariables({
        NOTES_APP_COGNITO_REGION: core["notesAppUserPoolRegion"],
        NOTES_APP_COGNITO_USER_POOL_ID: core["notesAppUserPoolId"]
    });

    // Add permission to GraphQL Lambda policy to interact with the Notes App User Pool
    app.resources.graphql.policy.config.policy(policy => {
        if (typeof policy === "string") {
            return policy;
        }

        return {
            ...policy,
            Statement: [
                ...policy.Statement,
                {
                    Sid: "PermissionForNotesAppCognitoUserPool",
                    Effect: "Allow",
                    Action: "cognito-idp:*",
                    Resource: `${core["notesAppUserPoolArn"]}`
                }
            ]
        };
    });
};
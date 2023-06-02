import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as path from "path";
import { readFileSync } from "fs";

import { createWebsiteApp } from "@webiny/serverless-cms-aws";
import { isResourceOfType } from "@webiny/pulumi";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";

export default createWebsiteApp({
    pulumiResourceNamePrefix: "wby-",
    pulumi: ({ onResource, paths, params }) => {
        onResource(resource => {
            if (isResourceOfType(resource, aws.lambda.Function)) {
                if (resource.name.endsWith("-origin-request")) {
                    const { region, dynamoDbTable } = getStackOutput({
                        folder: "api",
                        env: params.run["env"]
                    });

                    const handler = readFileSync(
                        path.join(paths.workspace, "originRequestRouter/build/handler.js"),
                        "utf-8"
                    );

                    const source = handler
                        .replace("{DB_TABLE_NAME}", dynamoDbTable)
                        .replace("{DB_TABLE_REGION}", region);

                    resource.config.code(
                        new pulumi.asset.AssetArchive({
                            "index.js": new pulumi.asset.StringAsset(source)
                        })
                    );
                }
            }
        });
    }
});

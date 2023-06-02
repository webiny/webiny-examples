# Overriding Website App's Origin Request Lambda@Edge Function

When Webiny's [multi-tenancy](https://webiny.com/docs/enterprise/multi-tenancy) feature is enabled, as part of the **Website** project application, Webiny deploys an additional [Lambda@Edge](https://aws.amazon.com/lambda/edge/) function, which is used for additional multi-tenancy-related routing purposes.

This example shows how to override the Lambda@Edge function's code, in order to add custom logic to it, if needed.

## Adding the Code

For starters, we copy the code located in the [`apps/website/originRequestRouter`](./apps/website/originRequestRouter) folder into our project's `apps/website/originRequestRouter` folder. This is the code that will be deployed as part of the **Website** project application. 

Note that since the folder is a new [Yarn workspace](https://yarnpkg.com/features/workspaces#gatsby-focus-wrapper), we'll also need inform Yarn about it. This is done by adding a new entry into the `workspaces` array in the project's `package.json` file (note the `apps/website/originRequestRouter` entry):

```json
	"workspaces": {
		"packages": [
			"apps/admin",
			"apps/website",
			"apps/website/originRequestRouter",
			"apps/theme",
			"apps/api/graphql",
			"apps/api/headlessCMS",
			"packages/*"
		]
	},
```

> **NOTE**
> 
> Don't forget to run `yarn` once you've added the new workspace. Without it, Yarn won't be able to find the new workspace. 

The code of the handler can be found in the  [`apps/website/originRequestRouter/src/index.ts`](./apps/website/originRequestRouter/src/index.ts) file. 

```ts
import { handler as defaultOriginRequestHandler } from "@webiny/pulumi-aws/components/tenantRouter/functions/origin/request";

export const handler = (event: any) => {
    // Extra logic can be added here.

    // We must not forget to run the default handler code, because
    // otherwise the multi-tenancy routing will stop working.
    return defaultOriginRequestHandler(event);
};
```

As we can see, the code doesn't do anything special, but it's ready to be extended with custom logic.

## Deploying the Code

The next and final step is to update the `apps/website/webiny.application.ts` file, so that the new code is actually taken into consideration and deployed:

```ts
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
                // Upon deploying the origin request AWs Lambda function, we are adjusting
                // the path to the `handler.js` file, so that it points to our code.
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
```

## Deployment

Once the above steps are completed, we can deploy the **Website** project application, by running the following command:

```bash
yarn webiny deploy website --env dev
```

Note that redeploys of Lambda@Edge functions can take up to a couple of minutes to complete (AWS documentation even has mentions of 30 minutes). This is due to the fact that Lambda@Edge functions are replicated across all AWS CloudFront edge locations, and this replication process can take up to a couple of minutes to complete.
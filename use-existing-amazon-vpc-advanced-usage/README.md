# Use Existing Amazon VPC - Advanced Usage

## Introduction

Although the code samples provided in the [Use Existing Amazon VPC](https://www.webiny.com/docs/enterprise/use-existing-amazon-vpc) article work, there's still room for improvement.

The main issue is the fact that we're essentially copy and pasting the same VPC-related values across four `webiny.application.ts` configuration files:

1. **Core** ([`apps/core/webiny.application.ts`](https://github.com/webiny/webiny-js/blob/v5.29.0/packages/cwp-template-aws/template/ddb/apps/core/webiny.application.ts))
2. **API** ([`apps/api/webiny.application.ts`](https://github.com/webiny/webiny-js/blob/v5.29.0/packages/cwp-template-aws/template/ddb/apps/api/webiny.application.ts))
3. **Admin** ([`apps/admin/webiny.application.ts`](https://github.com/webiny/webiny-js/blob/v5.29.0/packages/cwp-template-aws/template/common/apps/admin/webiny.application.ts))
4. **Website** ([`apps/website/webiny.application.ts`](https://github.com/webiny/webiny-js/blob/v5.29.0/packages/cwp-template-aws/template/common/apps/website/webiny.application.ts))

This means that, once a need for a change arises, we'll need to apply the change four times, once for each configuration file.

Also, the provided samples did not demonstrate how we can apply different existing VPC-related configuration, depending on the environment into which the project is being deployed.

## Solution

In this example, we're creating a new [`apps/pulumi`](./apps/pulumi) folder, and in its [`index.ts`](./apps/pulumi/index.ts) file, we're exporting the [`getVpcConfiguration`](./apps/pulumi/index.ts#L4) function, which, depending on the received environment, can return different existing VPC configuration values.

```ts
// apps/pulumi/index.ts
import { CorePulumiAppAdvancedVpcParams } from "@webiny/pulumi-aws/enterprise";

// Returns VPC configuration depending on the provided environment name.
export const getVpcConfiguration = (env: string): CorePulumiAppAdvancedVpcParams | undefined => {
    if (env === "preprod") {
        const subnetIds = [
            "subnet-A",
            "subnet-B",
            "subnet-C"
        ];

        const securityGroupIds = ["sg-A"];
        return {
            useExistingVpc: {
                elasticSearchDomainVpcConfig: { subnetIds, securityGroupIds },
                lambdaFunctionsVpcConfig: { subnetIds, securityGroupIds }
            }
        };
    }

    if (env === "prod") {
        const subnetIds = [
            "subnet-X",
            "subnet-Y",
            "subnet-Z"
        ];

        const securityGroupIds = ["sg-X"];
        return {
            useExistingVpc: {
                elasticSearchDomainVpcConfig: { subnetIds, securityGroupIds },
                lambdaFunctionsVpcConfig: { subnetIds, securityGroupIds }
            }
        };
    }

    return undefined;
};
```

> **NOTE**
> Note that the `apps/pulumi` is a new yarn workspace. As such, it needs to be declared in project root's `package.json` file, within the `workspaces` array. Once declared, in order for `yarn` to actually initialize the workspace, you'll also need to run `yarn` from your project root.

With this function in place, we can easily use it across all four `webiny.project.ts` files, for example:

```
import { createCoreApp } from "@webiny/serverless-cms-aws/enterprise";
import { getVpcConfiguration } from "pulumi";

export default createCoreApp({
    elasticSearch: true,
    vpc: ({ params }) => {
        // https://www.webiny.com/docs/infrastructure/basics/modify-cloud-infrastructure#retrieving-the-deployment-environment
        const { env } = params.run;

        return getVpcConfiguration(env);
    }
});

```

Ultimately, with this approach, we no longer have to paste configuration values across four `webiny.application.ts` files. Once we apply a change in the shown `getVpcConfiguration`, the change will automatically be propagated.
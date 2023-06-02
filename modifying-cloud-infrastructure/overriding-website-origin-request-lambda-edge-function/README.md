# Overriding Website App's Origin Request Lambda@Edge Function

When Webiny's [multi-tenancy](https://webiny.com/docs/enterprise/multi-tenancy) feature is enabled, as part of the **Website** project application, Webiny deploys an additional [Lambda@Edge](https://aws.amazon.com/lambda/edge/) function, which is used for additional multi-tenancy-related routing purposes.

This example shows how to override the Lambda@Edge function's code, in order to add custom logic to it, if needed.

For starters, we copy the code located in the [`apps/website/originRequestRouter`](./apps/website/originRequestRouter) folder into our project's `apps/website/originRequestRouter` folder. This is the code that will be deployed as part of the **Website** project application. Note that since the folder is a new Yarn workspace, we'll also need inform Yarn about it. This is done by adding a new entry into the `workspaces` array in the project's `package.json` file (note the `apps/website/originRequestRouter` entry):

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


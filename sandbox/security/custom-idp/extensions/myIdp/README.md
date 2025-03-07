## Implementing a Custom Identity Provider (IdP)

This extension serves as a starting point for building an integration with an external identity provider (IdP).

Note that Webiny already supports integration with IdPs
like [Okta](https://www.webiny.com/docs/enterprise/okta-integration)
and [Auth0](https://www.webiny.com/docs/enterprise/auth0-integration) out of the box. However, in case you need to
integrate Webiny with another IdP, then this extensions can serve as a good staring point.

## Setup

Once downloaded, this extension does involve a couple of manual steps to set up. Without these steps, the extension will
not work.

In the `extensions/myIdp/src` directory, you'll find two files:

2. `api.ts`
3. `admin.tsx`

Let's go through each of them and see what manual steps are required.

### `api.ts`

The `api.ts` file exports two functions: `myIdpAuthentication` and `createSecurityGraphQL`. Essentially, these functions
ensure that Webiny backend GraphQL API and other services can authenticate users by using your custom IdP.

In order for it to work, the functions must be imported and called in the `apps/api/graphql/src/security.ts` file. We'll
also need to do a bit of cleanup.

Let's go through the steps required to set it up.

#### 1. Import the Functions

We import the functions from the `api.ts` file in the `apps/api/graphql/src/security.ts` file.

```ts
import { createSecurityGraphQL, myIdpAuthentication } from "my-idp/src/api";
```

#### 2. Remove Old Imports Of `cognitoAuthentication` and `createSecurityGraphQL` Functions

Since we've imported the new functions, we can now remove the old imports of `cognitoAuthentication`
and `createSecurityGraphQL` functions.

#### 3. Replace Old `cognitoAuthentication` Call With `myIdpAuthentication`

We need to replace the old `cognitoAuthentication` call with the new one. So, instead of this:

```ts
/**
 * Cognito authentication plugin.
 * This plugin will verify the JWT token against the provided User Pool.
 */
cognitoAuthentication({
  region: String(process.env.COGNITO_REGION),
  userPoolId: String(process.env.COGNITO_USER_POOL_ID),
  identityType: "admin"
});
```

...we now simply have this:

```ts
/**
 * Our custom authentication plugin.
 */
myIdpAuthentication(),
```

#### 4. Remove Non-Required Cognito-related Code

We need to remove any remaining Cognito-related code from the `security.ts` file. Basically, we can just search for
the "cognito" keyword and remove all the code that's not needed anymore.

#### 5. Update Dependencies

Let's remove the `@webiny/api-security-cognito` package from the `apps/api/graphql/package.json` file. We also want to
add the `my-idp` package as a dependency. We can achieve this by running the following commands:

```bash
yarn workspace api-graphql remove @webiny/api-security-cognito && yarn workspace api-graphql add my-idp
```

#### 6. Deploy Changes

Once all of the steps are done, we can run the following command to deploy the changes:

```bash
yarn webiny deploy api --env dev
```

### `admin.tsx`

> [!NOTE]
> This README document in progress! ⚠️ Make sure to check the admin.tsx and the rest of the frontend-related code to
> learn how to integrate the custom IdP with the frontend.

The `admin.tsx` file exports all of the frontend/Admin app-related components that are required for the custom IdP to
work. Note that the `MyIdp` component is a placeholder for the actual IdP integration logic. It does not render any UI, 
but it simply mocks the authentication process. Of course, if no UI is needed in your project, then that's also fine.
It's not that every project requires an authentication UI. Some projects might just need the authentication logic.

In your `apps/admin/src/App.tsx` file, you can import the `MyIdp` component and render it. Here's how you can do it:
```tsx
import React from "react";
import { Admin } from "@webiny/app-serverless-cms";
import { Extensions } from "./Extensions";
import "./App.scss";
import { MyIdp } from "my-idp/src/admin";

export const App = () => {
    return (
        <Admin>
            <MyIdp />
            <Extensions />
        </Admin>
    );
};

```

Same as in the previous step, before deploying these changes, note that it's also recommended for
the `my-idp` package to be listed as a dependency in the `apps/admin/package.json` file. This can be
easily achieved by running the following command:

```bash
yarn workspace admin add my-idp
```

Then run:
```bash
yarn webiny deploy admin --env dev
```


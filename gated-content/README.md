# Gated Content Code Samples

This demo covers a wide variety of features which you can develop yourself, by hooking into Webiny's lifecycle events and composable components. Topics displayed in this demo are:

- creating a custom Cognito User Pool for your website users
- extending Lambda role policies
- injecting ENV variables into React apps
- injecting ENV variables into Lambda functions
- protecting your website content with client side permission checks
- building a custom Admin app CRUD module for your app permissions and users
- custom Page Builder elements, like Login, Signup, editor.js (rich text editor)
- custom PB Page List component renderers
- connecting your custom PB element settings with custom CRUD modules (listing user groups)
- custom Headless CMS field renderers
- programmatic mapping of Headless CMS data to Pages, using Page Builder Template variables
- extending tenant installation to insert initial data (content models, page, page templates, etc.)
- hooking into website content to implement analytics events tracking
- copying data to sub-tenants upon tenant installation

> IMPORTANT: Parts of this example make use of Multi-Tenancy, which is a paid feature. If you want to use multi-tenancy, you need to follow the [Webiny Control Panel](./docs/WCP_Onboarding.pdf) guide. This demo WILL WORK even in a single-tenant mode, so you're not required to have multi-tenancy enabled.

---

The majority of the source code is located in `./packages` folder, which is configured to act as workspaces root. Every child folder of `packages` is as a [Yarn Workspace](https://yarnpkg.com/features/workspaces). 

> IMPORTANT: we're using the `unstable` release for this demo, as it contains some new features, that are not yet in the stable release. The features in question will be released as part of the stable 5.35.0 release, at the end of March 2023.

---

Throughout the code, you'll find comments marked with `POINT OF INTEREST`; you'll be particularly interested in those, as they explain why some things are there, and denote interesting concepts that will be useful to you in the future.

---

In this file [apps/website/webiny.application.ts](./apps/website/webiny.application.ts) you'll find a section where custom domain configuration is commented out. Linking of custom domains is described in this article on [Multi-Tenancy](https://www.webiny.com/docs/enterprise/multi-tenancy). 


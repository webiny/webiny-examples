# CMS Content Editing - Live Preview

This example demonstrates how you can set up a Live Preview for your content creators, when working with Webiny Headless CMS. We'll demonstrate Live Preview in the context of our Admin and Website apps, but the concepts apply to any frontend app framework.

The code is organized using [Extensions](https://www.webiny.com/docs/core-development-concepts/basics/extensions), and consists of a `@demo/admin` extension, and a `@demo/website` extension.

## Using the Code

To enable these extensions in your existing Webiny project, follow these steps:

1. Clone this `webiny-examples` repository.
2. Copy the contents of the [extensions](./extensions) folder (`admin` and `website` folders) into your project's `extensions` folder.
3. In your project, run `yarn webiny link-extensions` to link the new extensions with your project.
4. The `website` app extension has to be enabled manually. Inspect the following files, [apps/website/src/App.tsx](./apps/website/src/App.tsx) and [apps/website/public/index.html](./apps/website/public/index.html), and apply the changes to your own Webiny project.

5. [Deploy your project](https://www.webiny.com/docs/core-development-concepts/basics/project-deployment), or start local development for both Admin and Website apps. If staring local development, in separate terminal windows/tabs, run the following commands:

```shell
# Terminal window 1
yarn webiny watch admin --env=dev

# Terminal window 2
yarn webiny watch website --env=dev
```

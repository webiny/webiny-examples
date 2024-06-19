# Tenant Management using CMS

The code is organized using [Extensions](https://www.webiny.com/docs/core-development-concepts/basics/extensions), and consists of a `@demo/api` extension, `@demo/admin` extension, and a `@demo/shared` workspace with shared code (for example, Typescript types, utility functions, etc.).

## Using the Code

To enable these extensions in your existing Webiny project, follow these steps:

1) Clone this `webiny-examples` repository.
2) Copy the contents of the [extensions](./extensions) folder (`admin`, `api`, and `shared` folders) into your project's `extensions` folder.
3) In your project, run `yarn webiny link-extensions` to link the new extensions with your project.
4) [Deploy your project!](https://www.webiny.com/docs/core-development-concepts/basics/project-deployment)

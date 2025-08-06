# Tenant Management using CMS

The code is organized using [Extensions](https://www.webiny.com/docs/core-development-concepts/basics/extensions), and consists of a `@demo/tenant-management-api` extension, `@demo/tenant-management-admin` extension, and a `@demo/shared` workspace with shared code (for example, Typescript types, utility functions, etc.).

## Using the Code

To enable these extensions in your existing Webiny project, follow these steps:

### 1. Install the extension

In your project, run:

```shell
yarn webiny extension cms-tenant-management
```

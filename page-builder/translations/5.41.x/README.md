# Overview

This example code contains implementation of several features:

- Language CRUD module (Admin app + GraphQL API)
- Page Translation Editor with live preview (Admin app)
- Translation injection into the page content (Website app)

# Prerequisites

Upgrade your `5.40.x` project to `5.41.0-dbt.0` (the `dbt` NPM tag) by running the following command:

```
yarn up "@webiny/*@dbt"
```

> NOTE: if your project is on an even older version, like 5.39.x, you will have to upgrade to 5.40.x first, by following the [5.40.5 upgrade guide](https://www.webiny.com/docs/release-notes/5.40.5/upgrade-guide).

# Installation

> EXPERIMENTAL FEATURE: please note that this code is only applicable to an experimental release published under the `dbt` NPM tag, until the official `5.41.0` is available.

To install the example code into your existing `5.41.0-dbt.0` Webiny project, follow these steps:

1. Clone the https://github.com/webiny/webiny-examples repository somewhere on your machine (this is a temporary clone, just so you can C/P files from the repo).
2. From this new clone, copy the contents of the [page-builder/translations/5.41.0]() directory into your target project. You want to copy the `apps` and `extensions` directories.
3. Install dependencies

```
yarn
```

4. Link the extensions with your project:

```
yarn webiny link-extensions
```

You're now ready to deploy your project!

# Introduction

With this example, we show how you can create a simple `rerender-pages` Webiny CLI command that does the following:

1. lists all published pages created via the Page Builder application
2. visits them and ensures the received HTTP response code is 200
3. if not 200, then we rerender the page via a custom `rerenderPage` GraphQL mutation

# Create the `rerenderPage` Mutation

The mutation can be created by simply registering a new `GraphQLSchemaPlugin` plugin.

Check this file `./rerender-pages-command/api/code/graphql/src/plugins/rerenderPage.ts:43` to see how it's done. Also, make sure the plugin is imported and registered in `api/code/graphql/src/index.ts` file.

Further reading: [Extend GraphQL API](https://www.webiny.com/docs/how-to-guides/webiny-applications/page-builder/extend-graphql-api#custom-graphql-mutations).

# Create custom `rerender-pages` Webiny CLI command

Check this file `./rerender-pages-command/scripts/rerenderPages.ts` to see how it's done. 

Further reading: [Adding Custom Commands](https://www.webiny.com/docs/tutorials/webiny-cli/adding-custom-commands/).

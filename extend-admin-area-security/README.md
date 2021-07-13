This folder contains full code samples for the [Securing Your Application](https://www.webiny.com/docs/tutorials/extend-admin-area/security/introduction/) tutorial.

Note that the code is a bit rudimentary - meaning it could be refactored a bit. For example, throughout the whole code, we're essentially copying authorization logic code. This should probably be abstracted within a simple utility function, or, in case of React code, a simple React hook.

This can be seen in GraphQL API resolvers, for example in [`CarManufacturersQuery.ts`](https://github.com/webiny/webiny-examples/blob/master/extend-admin-area-security/api/code/graphql/src/plugins/scaffolds/carManufacturers/resolvers/CarManufacturersQuery.ts#L47-L79). In Admin Area application code, this can be seen in [`menus.tsx`](https://github.com/webiny/webiny-examples/blob/master/extend-admin-area-security/apps/admin/code/src/plugins/scaffolds/carManufacturers/menus.tsx#L20-L45) and [`CarManufacturersDataList.tsx`](https://github.com/webiny/webiny-examples/blob/master/extend-admin-area-security/apps/admin/code/src/plugins/scaffolds/carManufacturers/views/CarManufacturersDataList.tsx#L68-L86).

If you'd like to see a refactored version here as well, please give us a ping on our community [Slack](https://www.webiny.com/slack).

import { PagePlugin } from "@webiny/api-page-builder/plugins/PagePlugin";
import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { IndexPageDataPlugin } from "@webiny/api-page-builder/plugins/IndexPageDataPlugin";
import { Page } from "@webiny/api-page-builder/types";

interface ExtendedPage extends Page {
    special: boolean;
}

export default [
    // Adding a new `special` field to the PbPage type consists of three steps:
    // 1. Extend the fundamental `PbPage` type.
    // 2. Extend the `PbPageListItem` type which is used when listing pages.
    // 3. In order to update the field, we also need to extend the `PbUpdatePageInput` input.
    new GraphQLSchemaPlugin({
        typeDefs: /* GraphQL */ `
            extend type PbPage {
                special: Boolean
            }

            extend type PbPageListItem {
                special: Boolean
            }

            extend input PbUpdatePageInput {
                special: Boolean
            }
        `
    }),

    // This step is only required if you're using DynamoDB + ElasticSearch setup and you want
    // to be able to get the value of the `special` field while listing pages.
    // With this plugin, we ensure that the value of the `special` field is also stored in
    // ElasticSearch, which is where the data is being retrieved from while listing pages.
    new IndexPageDataPlugin<ExtendedPage>(({ data, page }) => {
        // `data` represents the current page's data that will be stored in ElasticSearch.
        // Let's modify it, by adding the value of the new `special` flag to it.
        data.special = page.special;
    })
];

import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import Error from "@webiny/error";
import { ErrorResponse, ListResponse } from "@webiny/handler-graphql/responses";

// Make sure to import the `Context` interface and pass it to the `GraphQLSchemaPlugin`
// plugin. Apart from making your application code type-safe, it will also make the
// interaction with the `context` object significantly easier.
import { Context } from "~/types";

// We'll use this in our resolver function below.
interface CustomSearchPagesArgs {
    where: { title: string };
}

// We're defining a new `customSearchPages(where: CustomSearchPagesWhereInput): CustomSearchPagesResponse` query.
// In order to see it inside of the pageBuilder field, we're extending the `PbQuery` type. We're also using
// existing `PbPageListItem` and `PbError` types. No need to define them again from scratch.
export default [
    // Plugin for extending an existing GraphQL schema.
    // https://www.webiny.com/docs/how-to-guides/extend-graphql-api
    new GraphQLSchemaPlugin<Context>({
        typeDefs: /* GraphQL */ `
            extend type PbQuery {
                customSearchPages(where: CustomSearchPagesWhereInput): CustomSearchPagesResponse
            }

            input CustomSearchPagesWhereInput {
                title: String
            }

            type CustomSearchPagesResponse {
                data: [PbPageListItem]
                meta: CustomSearchPagesResponseMeta
                error: PbError
            }

            type CustomSearchPagesResponseMeta {
                count: Int
            }
        `,
        resolvers: {
            PbQuery: {
                // The `customSearchPages` resolver function.
                customSearchPages: async (_, args: CustomSearchPagesArgs, context) => {
                    try {
                        const { index } = es(context);
                        const { body } = await context.elasticsearch.search({
                            index,
                            body: {
                                query: {
                                    bool: {
                                        must: [
                                            {
                                                match: {
                                                    title: {
                                                        query: args.where.title,
                                                        operator: "and"
                                                    }
                                                }
                                            }
                                        ],
                                        // We also need to add the `{ published: true }` filter, otherwise
                                        // we'd receive both latest and published pages as the search result.
                                        filter: [
                                            { term: { published: true } },
                                        ]
                                    }
                                }
                            }
                        });

                        const data = body.hits.hits.map(hit => hit._source);
                        const meta = {
                            count: body.hits.total.value
                        };
                        return new ListResponse(data, meta);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                }
            }
        }
    })
];

// From Webiny 5.15.0, this is no longer needed, because you can import this same
// helper via the following import statement:
// import { es } from "@webiny/api-page-builder-so-ddb-es/operations/configurations";
const es = (context: Context) => {
    const tenant = context.tenancy.getCurrentTenant();
    if (!tenant) {
        throw new Error("Tenant missing.", "MISSING_TENANT");
    }

    const sharedIndex = process.env.ELASTICSEARCH_SHARED_INDEXES === "true";
    const index = `${sharedIndex ? "root" : tenant.id}-page-builder`;

    const prefix = process.env.ELASTIC_SEARCH_INDEX_PREFIX;
    if (prefix) {
        return { index: prefix + index };
    }
    return { index };
};

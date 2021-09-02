import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { PbContext } from "@webiny/api-page-builder/types";
import { Response, ErrorResponse, NotFoundResponse } from "@webiny/handler-graphql/responses";

// Make sure to import the `Context` interface and pass it to the `GraphQLSchemaPlugin`
// plugin. Apart from making your application code type-safe, it will also make the
// interaction with the `context` object significantly easier.
import { Context } from "~/types";

export default [
    new GraphQLSchemaPlugin<Context>({
        // Extend the `PbMutation` type with the `reRenderPage` mutation.
        typeDefs: /* GraphQL */ `
            extend type PbMutation {
                # Re-renders given page.
                rerenderPage(id: ID!): PbPageResponse
            }
        `,
        // In order for the `reRenderPage` to work, we also need to create a resolver function.
        resolvers: {
            PbMutation: {
                rerenderPage: async (_, args: { id: string }, context: PbContext) => {
                    // Retrieve the original page. If it doesn't exist, immediately exit.
                    const page = await context.pageBuilder.pages.get(args.id);
                    if (!page) {
                        return new NotFoundResponse("Page not found.");
                    }

                    try {
                        // We only need the `id` of the newly created page.
                        await context.pageBuilder.pages.prerendering.render({
                            paths: [{ path: page.path }]
                        });

                        return new Response(page);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                }
            }
        }
    })
];

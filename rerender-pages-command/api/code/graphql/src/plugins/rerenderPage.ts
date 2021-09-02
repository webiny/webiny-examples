import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { Response, ErrorResponse, NotFoundResponse } from "@webiny/handler-graphql/responses";
import { PageSecurityPermission } from "@webiny/api-page-builder/types";
import checkBasePermissions from "@webiny/api-page-builder/graphql/crud/utils/checkBasePermissions";

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
                rerenderPage: async (_, args: { id: string }, context) => {
                    try {
                        // Let's import the `checkBasePermissions` helper function that will enable
                        // us to perform basic checking of current user's permissions. The function
                        // will throw an error if user doesn't have sufficient permissions.
                        // Note: even though we could invest extra time and create a permission that
                        // checks access to this particular mutation, to spare some time, we'll just
                        // check if the user can publish pages. If so, we'll allow re-rendering as well.
                        await checkBasePermissions<PageSecurityPermission>(
                            context,
                            "pb.page",
                            {
                                pw: "p"
                            }
                        );

                        // If permissions-checks were successful, let's continue with the rest.
                        // Retrieve the original page. If it doesn't exist, immediately exit.
                        const page = await context.pageBuilder.pages.get(args.id);
                        if (!page) {
                            return new NotFoundResponse("Page not found.");
                        }

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

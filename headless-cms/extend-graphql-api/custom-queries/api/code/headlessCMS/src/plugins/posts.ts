import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { ListResponse } from "@webiny/handler-graphql";
import { CmsContentEntry, CmsContentEntryMeta, CmsContext } from "@webiny/api-headless-cms/types";

export default [
    new GraphQLSchemaPlugin({
        // Extend the `Query` type with the `listMyPosts` query. Note the `PostListResponse` type.
        // It exists because we've previously created the `Post` content model via Admin Area.
        typeDefs: /* GraphQL */ `
            extend type Query {
                # List posts that were created by the currently logged in user.
                listMyPosts: PostListResponse
            }
        `,
        // In order for the `listMyPosts` to work, we also need to create a resolver function.
        resolvers: {
            Query: {
                listMyPosts: async (_, args: { id: string }, context: CmsContext) => {
                    const { security, cms } = context;

                    // Retrieve the `post` model.
                    const model = await cms.models.get("post");

                    // Use the `cms.entries.listLatest` method to fetch latest entries for the currently
                    // logged in user. Note that you could also use the `listPublished` method here instead
                    // of `cms.entries.listLatest`, if a list of published pages is what you need.
                    const response: [
                        CmsContentEntry[],
                        CmsContentEntryMeta
                    ] = await cms.entries.listLatest(model, {
                        where: {
                            // Retrieving the currently logged is as easy as calling the security.getIdentity method.
                            createdBy: security.getIdentity().id
                        }
                    });

                    return new ListResponse(...response);
                }
            }
        }
    })
];

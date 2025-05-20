import { createGraphQLSchemaPlugin } from "@webiny/api-serverless-cms";

export const createExtension = () => {
    return [
        createGraphQLSchemaPlugin({
            typeDefs: /* GraphQL */ `
              type Book {
                title: String
                description: String
              }
              extend type TenancyMutation {
                
                listBooks: [Book]
              }
            `,
            resolvers: {
                Query: {
                    listBooks: async (_, args, context) => {
                        // In a real life application, these would be loaded from a database.
                        const books = [
                            { title: "First book", description: "This is the first book." },
                            { title: "Second book", description: "This is the second book." }
                        ];

                        return books;
                    }
                }
            }
        })
    ];
};
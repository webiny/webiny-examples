import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";

export default new GraphQLSchemaPlugin({
    // Extend the `Query` type with the `Book` type and `listBooks` query field,
    // which returns a list of all books previously saved in the database.
    typeDefs: /* GraphQL */ `
        type Book {
            title: String
            description: String
        }
        extend type Query {
            # Returns a list of all users
            listBooks: [Book]
        }
    `,
    // In order for the `listBooks` to work, we also need to create a resolver function.
    resolvers: {
        Query: {
            listBooks: async (_, args, context) => {
                // In a real life application, these would be loaded from the database.
                const books = [
                    { title: "First book", description: "This is the first book." },
                    { title: "Second book", description: "This is the second book." }
                ];

                // Finally, return the list of books using the `ListResponse` class instance.
                return books;
            }
        }
    }
});

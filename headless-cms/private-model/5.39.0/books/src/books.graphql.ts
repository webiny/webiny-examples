import {
    ErrorResponse,
    GraphQLSchemaPlugin,
    ListResponse,
    Response
} from "@webiny/handler-graphql";
import { Context, BooksStorageOperationsListParams } from "./types";

interface CreateBookInput {
    title: string;
    price: number;
}


export const booksGraphql = new GraphQLSchemaPlugin<Context>({
    typeDefs: /* GraphQL */ `
        extend type Query {
            books: BooksQuery
        }

        type BookError {
            code: String
            message: String
            data: JSON
            stack: String
        }

        type BookListMeta {
            cursor: String
            totalCount: Int
            hasMoreItems: Boolean
        }

        type Book {
            id: ID!
            title: String!
            price: Number!
        }

        type BooksListResponse {
            data: [Book]
            error: BookError
            meta: BookListMeta
        }

        type BookResponse {
            data: Book
            error: BookError
        }

        type BooksQuery {
            listBooks(
                limit: Int
                search: String
                after: String): BooksListResponse
        }

        extend type Mutation {
            books: BooksMutation
        }

        input CreateBookInput {
            title: String!
            price: Number!
        }

        type BooksMutation {
            createBook(input: CreateBookInput!): BookResponse
        }
    `,
    resolvers: {
        Query: {
            books: () => ({})
        },
        Mutation: {
            books: () => ({})
        },
        BooksQuery: {
            async listBooks(_, args, context) {
                try {
                    const { limit, after, search } = args as BooksStorageOperationsListParams;
                    const [books, meta] = await context.books.listBooks({ limit, after, search })
                    return new ListResponse(books, meta);
                } catch (err) {
                    return new ErrorResponse(err);
                }
            }
        },
        BooksMutation: {
            async createBook(_, args, context) {
                try {
                    const { title, price } = args["input"] as CreateBookInput;
                    const book = await context.books.createBook({ title, price });
                    return new Response(book);
                } catch (err) {
                    return new ErrorResponse(err);
                }
            }
        }
    }
});

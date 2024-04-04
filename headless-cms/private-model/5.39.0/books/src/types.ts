import type { Context as BaseContext } from "api-graphql/src/types";

export interface Book {
    id: string;
    title: string;
    price: number;
}

export type CreateBookInput = Pick<Book, "title" | "price">;

export interface BooksStorageOperationsListResponseMeta {
    hasMoreItems: boolean;
    totalCount: number;
    cursor: string | null;
}

export type BooksStorageOperationsListResponse = [
    Book[],
    BooksStorageOperationsListResponseMeta
];

export interface BooksStorageOperationsListParams {
    limit: number;
    after?: string | null;
    search?: string;
}

export interface IBooksCrud {
    createBook(data: CreateBookInput): Promise<Book>;
    listBooks(params: BooksStorageOperationsListParams): Promise<BooksStorageOperationsListResponse>;
}

export interface IBooksStorage {
    create(book: CreateBookInput): Promise<Book>;
    list(params: BooksStorageOperationsListParams): Promise<BooksStorageOperationsListResponse>;
}

export interface BooksContext {
    books: IBooksCrud;
}

export interface Context extends BaseContext, BooksContext {}
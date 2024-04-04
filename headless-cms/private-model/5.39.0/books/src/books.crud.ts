import {
    BooksStorageOperationsListParams,
    CreateBookInput,
    IBooksCrud,
    IBooksStorage
} from "./types"

export class BooksCrud implements IBooksCrud {
    private storage: IBooksStorage;

    constructor(storage: IBooksStorage) {
        this.storage = storage;
    }

    async createBook(data: CreateBookInput) {
        return await this.storage.create(data);
    }

    async listBooks(params: BooksStorageOperationsListParams) {
        return await this.storage.list(params);
    }
}

/**
 * You also add lifecycle event and permission checks here.:
 * - add lifecycle events (optional)
 * - add permission checks (optional)
 */
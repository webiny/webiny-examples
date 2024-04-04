import { CmsEntry, CmsModel, HeadlessCms } from "@webiny/api-headless-cms/types";
import { Security } from "@webiny/api-security/types";
import { Book, CreateBookInput } from "./types";
import {
    BooksStorageOperationsListParams,
    BooksStorageOperationsListResponse
} from "./types"

interface GetTenantId {
    (): string;
}

interface GetLocaleCode {
    (): string;
}

interface BooksStorageParams {
    bookModel: CmsModel;
    cms: HeadlessCms;
    security: Security;
    getTenantId: () => string;
    getLocaleCode: () => string;
}

export class BooksStorage {
    private readonly cms: HeadlessCms;
    private readonly getTenantId: GetTenantId;
    private readonly getLocaleCode: GetLocaleCode;
    private readonly security: Security;
    private readonly model: CmsModel;

    static async create(params: BooksStorageParams) {
        return new BooksStorage(
            params.bookModel,
            params.cms,
            params.security,
            params.getTenantId,
            params.getLocaleCode
        );
    }

    private constructor(
        bookModel: CmsModel,
        cms: HeadlessCms,
        security: Security,
        getTenantId: GetTenantId,
        getLocaleCode: GetLocaleCode
    ) {
        this.getTenantId = getTenantId;
        this.getLocaleCode = getLocaleCode;
        this.model = bookModel;
        this.cms = cms;
        this.security = security;
    }

    async create(book: CreateBookInput): Promise<Book> {
        const model = this.getModel();
        const entry = await this.security.withoutAuthorization(() => {
            return this.cms.createEntry(model, {
                ...book
            });
        });
        return this.getBookFromEntry(entry);
    }

    private getModel(): CmsModel {
        return { ...this.model, tenant: this.getTenantId(), locale: this.getLocaleCode() };
    }

    /**
     * Convert a CMS entry to a Book object.
     */
    private getBookFromEntry(cmsEntry: CmsEntry) {
        return {
            id: cmsEntry.entryId,
            ...cmsEntry.values
        } as Book;
    }

    async list(params: BooksStorageOperationsListParams): Promise<BooksStorageOperationsListResponse> {
        const model = this.getModel();
        const [entries, meta] = await this.security.withoutAuthorization(() => {
            return this.cms.listLatestEntries(model, {
                after: params.after,
                limit: params.limit,
                search: params.search
            });
        });
        return [entries.map(entry => this.getBookFromEntry(entry)), meta];
    }
}


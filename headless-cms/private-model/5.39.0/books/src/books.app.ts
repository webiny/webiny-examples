import { ContextPlugin } from "@webiny/handler-aws";
import { Context } from "./types";
import { CmsModelPlugin } from "@webiny/api-headless-cms";
import WebinyError from "@webiny/error";
import { booksGraphql } from "./books.graphql";
import { BOOK_MODEL_ID, createBookModel } from "./book.model";
import { BooksStorage } from "./books.storage";
import { BooksCrud } from "./books.crud";

export const createBooksApp = () => {
    return new ContextPlugin<Context>(async context => {
        // Registering the private model.
        context.plugins.register(new CmsModelPlugin(createBookModel()));

        const bookModel = await context.security.withoutAuthorization(() => {
            return context.cms.getModel(BOOK_MODEL_ID);
        });

        if (!bookModel) {
            throw new WebinyError(`Missing private model "${BOOK_MODEL_ID}".`);
        }

        const getTenantId = () => {
            return context.tenancy.getCurrentTenant().id;
        };

        const getLocaleCode = () => {
            const locale = context.i18n.getContentLocale();
            if (!locale) {
                throw new WebinyError("Missing locale in Books module.", "LOCALE_ERROR");
            }
            return locale.code;
        };

        const booksStorage = await BooksStorage.create({
            bookModel,
            cms: context.cms,
            security: context.security,
            getTenantId,
            getLocaleCode
        });

        context.books = new BooksCrud(booksStorage);

        // Registering the GraphQL schema
        context.plugins.register(booksGraphql);
    });
};

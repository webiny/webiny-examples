import { createContextPlugin, createGraphQLSchemaPlugin } from "@webiny/api-serverless-cms";
import { createCmsModelPlugin } from "@webiny/api-headless-cms";
import {
    CloneTranslatedCollectionUseCase,
    CloneTranslatableCollectionUseCase
} from "@webiny/api-page-builder/translations";
import type { RenderEvent } from "@webiny/api-prerendering-service/types";
import { languageSchema } from "./languages/graphql/schema";
import { languageResolvers } from "./languages/graphql/resolvers";
import { ListLanguagesUseCase } from "./languages/useCases/ListLanguagesUseCase";
import { translationLanguageModel } from "./languages/repository/translationLanguage.model";

export const createExtension = () => {
    return [
        // Prerender pages for all languages
        createContextPlugin(context => {
            context.pageBuilder.onPageAfterPublish.subscribe(async ({ page }) => {
                const listLanguages = new ListLanguagesUseCase(context);
                const languages = await listLanguages.execute();

                const translatedPages: RenderEvent[] = languages.map(language => {
                    return {
                        path: `/${language.getCode()}${page.path}`,
                        tenant: page.tenant,
                        locale: page.locale
                    };
                });

                await context.prerenderingServiceClient.render(translatedPages);
            });
        }),
        // Clone a translatable collection and all translated collections for the new revision.
        createContextPlugin(context => {
            context.pageBuilder.onPageAfterCreateFrom.subscribe(async ({ original, page }) => {
                const sourceCollectionId = `page:${original.id}`;
                const newCollectionId = `page:${page.id}`;

                // Clone the translatable collection.
                const cloneCollection = new CloneTranslatableCollectionUseCase(context);
                await cloneCollection.execute({ sourceCollectionId, newCollectionId });

                // Clone the translated collections in their respective languages.
                const listLanguages = new ListLanguagesUseCase(context);
                const languages = await listLanguages.execute();

                const cloneTranslatedCollection = new CloneTranslatedCollectionUseCase(context);

                for (const language of languages) {
                    await cloneTranslatedCollection.execute({
                        sourceCollectionId,
                        newCollectionId,
                        languageCode: language.getCode()
                    });
                }
            });
        }),
        createGraphQLSchemaPlugin({
            typeDefs: languageSchema,
            resolvers: languageResolvers
        }),
        createCmsModelPlugin(translationLanguageModel, { validateLayout: false })
    ];
};

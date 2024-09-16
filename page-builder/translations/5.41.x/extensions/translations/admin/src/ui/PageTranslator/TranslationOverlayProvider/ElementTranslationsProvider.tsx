import { createGenericContext } from "@webiny/app";
import { TranslatedCollection } from "@webiny/app-page-builder/translations";
import { TranslatableItemContext } from "./TranslatableItemContext";

export type TranslatedItem = TranslatedCollection<TranslatableItemContext>["items"][0];

const ElementTranslationsContext = createGenericContext<{
    translatedCollection: TranslatedCollection<TranslatableItemContext>;
}>("ElementTranslations");

export const ElementTranslationsProvider = ElementTranslationsContext.Provider;
export const useElementTranslations = ElementTranslationsContext.useHook;

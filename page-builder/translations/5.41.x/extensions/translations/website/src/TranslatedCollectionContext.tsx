import { createGenericContext } from "@webiny/app";
import { TranslatedCollection } from "./TranslatedCollection";

const { useHook, Provider } = createGenericContext<{ translatedCollection: TranslatedCollection }>(
    "TranslatedCollectionContext"
);

export const useTranslatedCollection = useHook;
export const TranslatedCollectionProvider = Provider;

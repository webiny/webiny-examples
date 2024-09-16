export interface TranslatableItemContext {
    element: {
        type: string;
        id: string;
    };
    input: {
        name: string;
    };
}

export interface TranslatedCollection {
    collectionId: string;
    languageCode: string;
    items: Array<{
        itemId: string;
        value?: string;
        context?: TranslatableItemContext;
    }>;
}

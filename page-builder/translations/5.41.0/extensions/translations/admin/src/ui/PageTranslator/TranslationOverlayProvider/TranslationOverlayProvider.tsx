import React, { useCallback, useMemo, useState } from "react";
import { PageTranslationOverlay } from "./PageTranslationOverlay";

interface TranslationOverlayProviderProps {
    children: React.ReactNode;
}

const TranslationOverlayContext = React.createContext<TranslationOverlayContext | undefined>(
    undefined
);

interface TranslationOverlayContext {
    translatePage: (pageId: string) => void;
}

export const TranslationOverlayProvider = ({ children }: TranslationOverlayProviderProps) => {
    const [pageId, setPageId] = useState<string | undefined>(undefined);

    const context: TranslationOverlayContext = useMemo(
        () => ({
            translatePage: pageId => setPageId(pageId)
        }),
        [setPageId]
    );

    const unsetPage = useCallback(() => setPageId(undefined), [setPageId]);

    return (
        <TranslationOverlayContext.Provider value={context}>
            {children}
            {pageId ? <PageTranslationOverlay pageId={pageId} onClose={unsetPage} /> : null}
        </TranslationOverlayContext.Provider>
    );
};

export const useTranslationOverlay = () => {
    const context = React.useContext(TranslationOverlayContext);
    if (!context) {
        throw Error(`Missing "TranslationOverlayContext" in the component hierarchy!`);
    }

    return context;
};

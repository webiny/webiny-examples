import React, { useCallback } from "react";
import { createProvider } from "@webiny/app";
import { LinkPreload, Page, PageRenderer } from "@webiny/app-website";
import { RouteProps, useLocation } from "@webiny/react-router";
import { useListLanguages } from "./useListLanguages";
import { LanguagesProvider } from "./LanguagesContext";
import { useCurrentLanguage } from "./useCurrentLanguage";
import { TranslatedCollectionProvider } from "./TranslatedCollectionContext";
import { useGetTranslatedCollection } from "./useGetTranslatedCollection";
import { InjectTranslatedValues } from "./InjectTranslatedValues";

export * from "./useListLanguages";
export * from "./useCurrentLanguage";
export * from "./useTranslatedPathname";

export const createLanguageProvider = () => {
    return createProvider(PrevComponent => {
        // Load languages and prevent rendering while languages are being loaded.
        return function LanguageProvider({ children }) {
            const { languages, loading } = useListLanguages();

            console.log("Loaded languages", languages);

            return loading ? null : (
                <LanguagesProvider languages={languages}>
                    <PrevComponent>{children}</PrevComponent>
                </LanguagesProvider>
            );
        };
    });
};

export const createPageRoute = (): RouteProps => {
    return {
        path: "*",
        element: <ParsePagePathname />
    };
};

const ParsePagePathname = () => {
    const location = useLocation();
    const currentLanguage = useCurrentLanguage();

    const basePathname = location.pathname.replace(`/${currentLanguage.code}/`, "/");

    return (
        <>
            <Page pathname={basePathname} />
        </>
    );
};

const TranslationsLoader = PageRenderer.createDecorator(PageRenderer => {
    return function TranslationsLoader(props) {
        const language = useCurrentLanguage();
        const { loading, translatedCollection } = useGetTranslatedCollection(props.page, language);

        if (!props.page) {
            return null;
        }

        return loading || !translatedCollection ? null : (
            <TranslatedCollectionProvider translatedCollection={translatedCollection}>
                <PageRenderer {...props} />
            </TranslatedCollectionProvider>
        );
    };
});

const PreloadPagePath = LinkPreload.createDecorator(Original => {
    return function LinkPreload(props) {
        const { languages } = useListLanguages();

        const getPathWithoutLanguagePrefix = useCallback(
            (path: string) => {
                return languages.reduce((path, language) => {
                    return path.replace(`/${language.code}`, "");
                }, path);
            },
            [languages.length]
        );

        const getPreloadPath = props.getPreloadPagePath ?? getPathWithoutLanguagePrefix;

        return <Original {...props} getPreloadPagePath={getPreloadPath} />;
    };
});

export const Translations = () => {
    return (
        <>
            <TranslationsLoader />
            <InjectTranslatedValues />
            <PreloadPagePath />
        </>
    );
};

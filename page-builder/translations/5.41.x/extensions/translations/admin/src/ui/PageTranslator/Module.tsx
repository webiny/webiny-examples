import React from "react";
import { Provider, createProvider } from "@webiny/app-serverless-cms";
import { PageListConfig } from "@webiny/app-page-builder";
import { TranslatePageAction } from "./TranslatePageAction";
import { TranslationOverlayProvider } from "./TranslationOverlayProvider/TranslationOverlayProvider";

const { Browser } = PageListConfig;

const TranslationsOverlayHoc = createProvider(Original => {
    return function TranslationsOverlayHoc({ children }) {
        return (
            <Original>
                <TranslationOverlayProvider>{children}</TranslationOverlayProvider>
            </Original>
        );
    };
});

export const PageTranslatorModule = () => {
    return (
        <>
            <PageListConfig>
                <Browser.PageAction name={"translate-page"} element={<TranslatePageAction />} />
            </PageListConfig>
            <Provider hoc={TranslationsOverlayHoc} />
        </>
    );
};

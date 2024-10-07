import React, { useCallback } from "react";
import { PageListConfig, usePage } from "@webiny/app-page-builder";
import { ReactComponent as TranslateIcon } from "@material-design-icons/svg/outlined/translate.svg";
import { useTranslationOverlay } from "./TranslationOverlayProvider/TranslationOverlayProvider";

const { OptionsMenuItem } = PageListConfig.Browser.PageAction;

export const TranslatePageAction = () => {
    const { page } = usePage();
    const { translatePage } = useTranslationOverlay();

    const openTranslationUi = useCallback(() => {
        translatePage(page.data.id);
    }, [page.data.id]);

    if (!page) {
        return null;
    }

    return (
        <OptionsMenuItem
            icon={<TranslateIcon />}
            label={"Translate"}
            onAction={openTranslationUi}
        />
    );
};

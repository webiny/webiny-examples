import React from "react";
import { Page } from "@webiny/app-page-builder-elements";

interface PagePreviewProps {
    page: any;
}

export const PagePreview = ({ page }: PagePreviewProps) => {
    /* TODO: Webiny team to fix the issue with types, to avoid using `any`. */
    return <Page page={page} />;
};

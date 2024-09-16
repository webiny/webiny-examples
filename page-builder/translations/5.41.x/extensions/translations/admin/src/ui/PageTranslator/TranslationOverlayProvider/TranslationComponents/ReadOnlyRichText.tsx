import React from "react";
import { LexicalHtmlRenderer } from "@webiny/lexical-editor";
import { usePageElements } from "@webiny/app-page-builder-elements";

interface ReadOnlyRichTextProps {
    value: string;
}

export const ReadOnlyRichText = ({ value }: ReadOnlyRichTextProps) => {
    const { theme } = usePageElements();

    return <LexicalHtmlRenderer theme={theme} value={value} />;
};

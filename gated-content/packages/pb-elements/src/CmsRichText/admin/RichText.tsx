import React from "react";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import { RichTextRenderer } from "@webiny/react-rich-text-renderer";
import { useElementVariableValue } from "@webiny/app-page-builder/editor/hooks/useElementVariableValue";

export const RichText = createRenderer(() => {
    // Let's retrieve the variables that were chosen by
    // the user upon dropping the page element onto the page.
    const { getElement } = useRenderer();
    const element = getElement();
    const variableValue = useElementVariableValue(element);

    return <RichTextRenderer data={variableValue || element.data?.cmsRichText || []} />;
});

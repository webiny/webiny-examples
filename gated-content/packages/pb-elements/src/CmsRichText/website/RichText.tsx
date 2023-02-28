import React from "react";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import { RichTextRenderer } from "@webiny/react-rich-text-renderer";

export const RichText = createRenderer(() => {
    // Let's retrieve the variables that were chosen by
    // the user upon dropping the page element onto the page.
    const { getElement } = useRenderer();
    const element = getElement();

    return <RichTextRenderer data={element.data?.cmsRichText || []} />;
});

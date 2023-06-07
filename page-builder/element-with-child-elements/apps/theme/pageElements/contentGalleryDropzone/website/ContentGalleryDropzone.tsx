import React from "react";
import { createRenderer, useRenderer, Elements } from "@webiny/app-page-builder-elements";

// The renderer React component.
export const ContentGalleryDropzone = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement();

    return <Elements element={element} />;
});

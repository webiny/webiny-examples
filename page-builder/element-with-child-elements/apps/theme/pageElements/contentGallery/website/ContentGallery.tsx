import React from "react";
import { createRenderer, useRenderer, Elements } from "@webiny/app-page-builder-elements";

export const ContentGallery = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement();

    return <Elements element={element} />;
});

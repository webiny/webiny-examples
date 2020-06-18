import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";
import IFrameRender from "./iFrameRender";

export default () => {
    return [
        {
            name: "pb-render-page-element-iframe",
            type: "pb-render-page-element",
            elementType: "iframe",
            render({ element }) {
                return <IFrameRender data={element.data} />
            }
        } as PbRenderElementPlugin,
    ];
};

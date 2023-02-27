import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";
import { RichText } from "./RichText";

export const cmsRichTextRendererPlugin = {
    name: "pb-render-page-element-cms-rich-text",
    type: "pb-render-page-element",
    elementType: "cmsRichText",
    render: RichText
} as PbRenderElementPlugin;

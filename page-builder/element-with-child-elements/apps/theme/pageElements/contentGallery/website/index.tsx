import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";
import { ContentGallery } from "./ContentGallery";

const plugin = {
    name: "pb-render-page-element-content-gallery",
    type: "pb-render-page-element",
    elementType: "content-gallery",
    render: ContentGallery
} as PbRenderElementPlugin;

export default plugin;
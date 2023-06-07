import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";
import { ContentGalleryDropzone } from "./ContentGalleryDropzone";

const plugin = {
    name: "pb-render-page-element-content-gallery-dropzone",
    type: "pb-render-page-element",
    elementType: "content-gallery-dropzone",
    render: ContentGalleryDropzone
} as PbRenderElementPlugin;

export default plugin;

import React from "react";
import { PbEditorPageElementPlugin } from "@webiny/app-page-builder/types";
import { ContentGalleryDropzone } from "./ContentGalleryDropzone";

export default [
    {
        name: "pb-editor-page-element-content-gallery-dropzone",
        type: "pb-editor-page-element",
        elementType: "content-gallery-dropzone",
        render: ContentGalleryDropzone,
        target: ["content-gallery"],
        canReceiveChildren: true,
        onCreate: "open-settings",
        create(options) {
            return {
                type: "content-gallery-dropzone",
                elements: [],
                data: {},
                ...options
            };
        }
    } as PbEditorPageElementPlugin
];

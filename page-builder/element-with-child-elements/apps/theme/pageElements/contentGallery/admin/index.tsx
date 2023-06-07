import React from "react";
import { PbEditorPageElementPlugin } from "@webiny/app-page-builder/types";
import { createElement } from "@webiny/app-page-builder/editor/helpers";

import { ContentGallery } from "./ContentGallery";

export default [
    {
        name: "pb-editor-page-element-content-gallery",
        type: "pb-editor-page-element",
        elementType: "content-gallery",
        render: ContentGallery,
        toolbar: {
            title: "Content Gallery",
            group: "pb-editor-element-group-media",
            preview() {
                return <>Content Gallery</>;
            }
        },
        settings: ["pb-editor-page-element-settings-delete"],
        target: ["cell", "block"],
        onCreate: "open-settings",
        create(options) {
            return {
                type: "content-gallery",
                elements: [
                    createElement("heading"),
                    createElement("paragraph"),
                    createElement("paragraph"),
                    createElement("content-gallery-dropzone")
                ],
                data: {},
                ...options
            };
        }
    } as PbEditorPageElementPlugin
];

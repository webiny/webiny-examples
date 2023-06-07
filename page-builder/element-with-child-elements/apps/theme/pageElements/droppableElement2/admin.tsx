import React from "react";
import { PbEditorPageElementPlugin } from "@webiny/app-page-builder/types";

import { DroppableElement2 } from "./DroppableElement2";

export default [
    {
        name: "pb-editor-page-element-droppable-element-2",
        type: "pb-editor-page-element",
        elementType: "droppable-element-2",
        render: DroppableElement2,
        toolbar: {
            title: "Droppable Element 2",
            group: "pb-editor-element-group-media",
            preview() {
                return <>Droppable Element 2</>;
            }
        },
        settings: ["pb-editor-page-element-settings-delete"],
        target: ["content-gallery-dropzone"],
        onCreate: "open-settings",

        // `create` function creates the initial data for the page element.
        create(options) {
            return {
                type: "droppable-element-2",
                elements: [],
                data: {},
                ...options
            };
        }
    } as PbEditorPageElementPlugin
];

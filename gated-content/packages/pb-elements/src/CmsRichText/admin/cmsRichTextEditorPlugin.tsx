import React from "react";
import { PbEditorPageElementPlugin } from "@webiny/app-page-builder/types";
import { RichText } from "./RichText";

export const cmsRichTextEditorPlugin = {
    name: "pb-editor-page-element-cms-rich-text",
    type: "pb-editor-page-element",
    elementType: "cmsRichText",
    render: RichText,
    toolbar: {
        title: "CMS Rich Text",
        group: "pb-editor-element-group-media",
        preview() {
            return <span>CMS Rich Text</span>;
        }
    },

    // Defines which types of element settings are available to the user.
    settings: [
        "pb-editor-page-element-style-settings-background",
        "pb-editor-page-element-style-settings-border",
        "pb-editor-page-element-style-settings-shadow",
        "pb-editor-page-element-style-settings-padding",
        "pb-editor-page-element-style-settings-margin",
        "pb-editor-page-element-settings-delete"
    ],

    // Defines which existing elements our element can be dropped onto.
    // In most cases, using `["cell", "block"]` will suffice.
    target: ["cell", "block"],
    onCreate: "open-settings",

    // `create` function creates the initial data for the page element.
    create(options) {
        return {
            type: "cmsRichText",
            elements: [],
            data: {
                cmsRichText: [
                    {
                        type: "paragraph",
                        data: {
                            text: "The content of this Rich Text element will be populated dynamically from the Headless CMS content entries.",
                            textAlign: "left",
                            className: ""
                        }
                    }
                ]
            },
            ...options
        };
    }
} as PbEditorPageElementPlugin;

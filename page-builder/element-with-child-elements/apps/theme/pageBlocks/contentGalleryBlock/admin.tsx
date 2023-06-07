import React from "react";
import { createElement } from "@webiny/app-page-builder/editor/helpers";
import { PbEditorBlockPlugin } from "@webiny/app-page-builder/types";
import blockPreview from "./blockPreview.png";

const plugin: PbEditorBlockPlugin = {
    name: "pb-editor-block-content-gallery",
    type: "pb-editor-block",
    blockCategory: "general",
    title: "Content Gallery Block",
    tags: [],
    preview() {
        return <img width={600} src={blockPreview} />;
    },
    create() {
        return createElement("block", {
            elements: [createElement("content-gallery")],
            data: {
                settings: {
                    property: {
                        className: "content-gallery-block"
                    }
                }
            }
        });
    }
};
export default plugin;

import React from "react";
import { LexicalEditorConfig } from "@webiny/app-headless-cms";
import {CustomFloatingLinkEditorPlugin} from "./plugins/CustomFloatingLinkEditorPlugin/CustomFloatingLinkEditorPlugin";

const { Plugin, ToolbarAction } = LexicalEditorConfig;

export const CmsLexicalEditorPlugin = () => {
    return (
        <LexicalEditorConfig>
         <ToolbarAction
                after={"fontColor"}
                name={"myComponent"}
                element={<button>New</button>}
            />
            <ToolbarAction name={"numberedList"} element={<button>NL</button>} />
            <Plugin name={"floatingLinkEditor"} element={<CustomFloatingLinkEditorPlugin />} />
        </LexicalEditorConfig>
    );
};

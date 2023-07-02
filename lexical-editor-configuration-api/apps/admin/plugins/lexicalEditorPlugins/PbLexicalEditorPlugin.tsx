import React from "react";

import { LexicalEditorConfig } from "@webiny/app-page-builder";
import {CustomFloatingLinkEditorPlugin} from "./plugins/CustomFloatingLinkEditorPlugin/CustomFloatingLinkEditorPlugin";

const { Heading, Paragraph } = LexicalEditorConfig;

export const LexicalHeadingEditor = () => {
    return (
        <LexicalEditorConfig>
            <Heading.ToolbarAction name={"fontColor"} element={<button>PB</button>} />
            <Heading.ToolbarAction name={"divider3"} remove />
            <Heading.ToolbarAction name={"typography"} remove />
            <Heading.ToolbarAction
                name={"myToolbarAction"}
                after={"fontColor"}
                element={<button>MTA</button>}
            />
            <Heading.ToolbarAction name={"bold"} after={"italic"} element={<button>B</button>} />
            <Heading.Plugin name={"floatingLinkEditor"} element={<CustomFloatingLinkEditorPlugin />} />
        </LexicalEditorConfig>
    );
};

export const LexicalParagraphEditor = () => {
    return (
        <LexicalEditorConfig>
            <Paragraph.Plugin name={"floatingLinkEditor"} element={<CustomFloatingLinkEditorPlugin />} />
        </LexicalEditorConfig>
    );
};

export const PbLexicalEditorPlugin = () => {
    return (
        <>
            <LexicalParagraphEditor />
            <LexicalHeadingEditor />
        </>
    );
};

import React from "react";
import {
    PbBlockEditorCreateVariablePlugin,
    PbEditorPageElementVariableRendererPlugin
} from "@webiny/app-page-builder/types";
import { Alert } from "@webiny/ui/Alert";
import { useElementVariables } from "@webiny/app-page-builder/editor/hooks/useElementVariableValue";

export const cmsRichTextVariable = [
    {
        name: "pb-block-editor-create-variable-cms-rich-text",
        type: "pb-block-editor-create-variable",
        elementType: "cmsRichText",
        createVariables({ element }) {
            return [
                {
                    id: element.id,
                    type: "cmsRichText",
                    label: "entry.content",
                    value: element.data?.cmsRichText
                }
            ];
        },
        getVariableValue({ element }) {
            return element.data?.cmsRichText;
        }
    } as PbBlockEditorCreateVariablePlugin,
    {
        name: "pb-editor-page-element-variable-renderer-cms-rich-text",
        type: "pb-editor-page-element-variable-renderer",
        elementType: "cmsRichText",
        getVariableValue(element) {
            const variables = useElementVariables(element);
            return variables?.length > 0 ? variables[0].value : null;
        },
        renderVariableInput() {
            return (
                <Alert title={"Programmatic value"} type={"info"}>
                    Value of this element is populated programmatically.
                </Alert>
            );
        },
        setElementValue(element) {
            return element;
        }
    } as PbEditorPageElementVariableRendererPlugin
];

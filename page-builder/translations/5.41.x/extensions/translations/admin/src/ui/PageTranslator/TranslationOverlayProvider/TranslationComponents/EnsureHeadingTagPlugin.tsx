import { useEffect } from "react";
import { useRichTextEditor } from "@webiny/lexical-editor";
import { ParagraphNode } from "@webiny/lexical-nodes";

export const EnsureHeadingTagPlugin = () => {
    const { editor } = useRichTextEditor();

    useEffect(
        () =>
            editor.registerNodeTransform(ParagraphNode, node => {
                console.log("paragraph node", node);
            }),
        []
    );
    return null;
};

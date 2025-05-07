import { PbEditorElementTree } from "@webiny/app-page-builder/types";

export class ElementTreeTraverser {
    traverse(
        currentTreeElement: PbEditorElementTree,
        visitor: (currentTreeElement: PbEditorElementTree) => void | false
    ): void | false {
        const result = visitor(currentTreeElement);
        if (result !== false) {
            for (const node of currentTreeElement.elements) {
                const result = this.traverse(node, visitor);
                if (result === false) {
                    return result;
                }
            }
        }
    }
}

import { PbPageElement } from "./types";

export class ElementTreeTraverser<TEditorElementTree extends PbPageElement = PbPageElement> {
    traverse(
        currentTreeElement: TEditorElementTree,
        visitor: (currentTreeElement: TEditorElementTree) => void | false
    ): void | false {
        const result = visitor(currentTreeElement);
        if (result !== false) {
            for (const node of currentTreeElement.elements) {
                const result = this.traverse(node as TEditorElementTree, visitor);
                if (result === false) {
                    return result;
                }
            }
        }
    }
}

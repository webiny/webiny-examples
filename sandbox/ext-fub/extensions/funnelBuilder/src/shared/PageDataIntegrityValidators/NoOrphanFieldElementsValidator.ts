import { ElementTreeTraverser } from "../ElementTreeTraverser";
import { PbPage } from "../types";
import { isFieldElementType } from "../constants";
import { withContainer } from "./withContainer";

export class NoOrphanFieldElementsValidator {
    static id = "NoOrphanFieldElementsValidator";

    // Ensures sync between field page elements and fields listed in the container element's data.
    static validate(page: PbPage) {
        return withContainer(page, containerElement => {
            const fieldIdsFoundInContainerElement = containerElement.data.fields.map(
                field => field.id!
            );
            const fieldIdsFoundInFieldElements: string[] = [];

            const traverser = new ElementTreeTraverser();
            traverser.traverse(page.content, element => {
                if (isFieldElementType(element.type)) {
                    fieldIdsFoundInFieldElements.push(element.data.id);
                }
            });

            const orphanFields = fieldIdsFoundInFieldElements.filter(
                fieldId => !fieldIdsFoundInContainerElement.includes(fieldId)
            );

            const hasOrphanFields = orphanFields.length > 0;
            if (hasOrphanFields) {
                throw new Error("Orphan fields found.", {
                    cause: { orphanFields }
                });
            }
        });
    }
}

import { createFileModelModifier } from "@webiny/api-file-manager";

export const createExtension = () => {
    return [
        createFileModelModifier(({ modifier }) => {
            modifier.addField({
                id: "description",
                fieldId: "description",
                label: "Description",
                type: "text",
                renderer: {
                    name: "text-input"
                }
            });

            modifier.addField({
                id: "year",
                fieldId: "year",
                label: "Year",
                type: "number",
                renderer: {
                    name: "number-input"
                }
            });
        })
    ];
};

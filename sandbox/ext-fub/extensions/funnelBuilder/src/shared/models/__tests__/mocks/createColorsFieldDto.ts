import { CheckboxGroupField, CheckboxGroupFieldDto } from "../../fields/CheckboxGroupField";

export const createColorsFieldDto = (dto: CheckboxGroupFieldDto) => {
    return new CheckboxGroupField({
        id: "colors",
        fieldId: "colors",
        label: "Colors",
        helpText: "Colors",
        value: {
            value: [],
            type: "stringArray"
        },
        extra: {
            options: [
                { value: "red", label: "Red" },
                { value: "green", label: "Green" },
                { value: "blue", label: "Blue" }
            ]
        },
        ...dto
    }).toDto();
};

import { CheckboxGroupField, CheckboxGroupFieldDto } from "../../models/fields/CheckboxGroupField";

export const createColorsFieldDto = (dto: CheckboxGroupFieldDto) => {
    return new CheckboxGroupField({
        id: "colors",
        fieldId: "colors",
        label: "Colors",
        helpText: "Colors",
        value: {
            value: [],
            array: true,
            type: "stringArray"
        },
        extra: {
            options: [
                { id: "redXyz123", value: "red", label: "Red" },
                { id: "greenXyz123", value: "green", label: "Green" },
                { id: "blueXyz123", value: "blue", label: "Blue" }
            ]
        },
        ...dto
    }).toDto();
};

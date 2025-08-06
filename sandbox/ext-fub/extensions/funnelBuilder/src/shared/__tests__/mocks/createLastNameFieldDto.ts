import { TextField, TextFieldDto } from "../../models/fields/TextField";

export const createLastNameFieldDto = (dto: TextFieldDto) => {
    return new TextField({
        id: "lastName",
        fieldId: "lastName",
        label: "Last Name",
        helpText: "Enter your last name",
        validators: [],
        value: {
            array: false,
            value: "",
            type: "string"
        },
        ...dto
    }).toDto();
};

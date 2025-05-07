import { TextField, TextFieldDto } from "../../fields/TextField";

export const createLastNameFieldDto = (dto: TextFieldDto) => {
    return new TextField({
        id: "lastName",
        fieldId: "lastName",
        label: "Last Name",
        helpText: "Enter your last name",
        validators: [],
        value: {
            value: "",
            type: "string"
        },
        ...dto
    }).toDto();
};

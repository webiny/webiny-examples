import { TextField, TextFieldDto } from "../../models/fields/TextField";

export const createFirstNameFieldDto = (dto: TextFieldDto) => {
    return new TextField({
        id: "firstName",
        fieldId: "firstName",
        label: "First Name",
        helpText: "Enter your first name",
        validators: [],
        value: {
            array: false,
            value: "",
            type: "string"
        },
        ...dto
    }).toDto();
};

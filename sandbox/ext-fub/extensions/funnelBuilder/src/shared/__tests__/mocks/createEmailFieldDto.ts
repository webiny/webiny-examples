import { TextField, TextFieldDto } from "../../models/fields/TextField";

export const createEmailFieldDto = (dto: TextFieldDto) => {
    return new TextField({
        id: "email",
        fieldId: "email",
        label: "Email",
        helpText: "Enter your email address",
        value: {
            value: "",
            array: false,
            type: "string"
        },
        ...dto
    }).toDto();
};

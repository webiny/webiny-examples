import { TextField, TextFieldDto } from "../../fields/TextField";

export const createEmailFieldDto = (dto: TextFieldDto) => {
    return new TextField({
        id: "email",
        fieldId: "email",
        label: "Email",
        helpText: "Enter your email address",
        value: {
            value: "",
            type: "string"
        },
        ...dto
    }).toDto();
};

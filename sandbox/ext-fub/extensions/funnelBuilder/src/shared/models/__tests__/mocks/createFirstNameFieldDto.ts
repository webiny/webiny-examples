import { TextField, TextFieldDto } from "../../fields/TextField";

export const createFirstNameFieldDto = (dto: TextFieldDto) => {
    return new TextField({
        id: "firstName",
        fieldId: "firstName",
        label: "First Name",
        helpText: "Enter your first name",
        validators: [],
        value: {
            value: "",
            type: "string"
        },
        ...dto
    }).toDto();
};

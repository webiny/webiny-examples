import { createPrivateModel, createModelField } from "@webiny/api-headless-cms";

const required = () => {
    return {
        name: "required",
        message: "Value is required."
    };
};

export const BOOK_MODEL_ID = "pvBook";

export const createBookModel = () => {

    return createPrivateModel({
        name: "PvBook",
        modelId: BOOK_MODEL_ID,
        titleFieldId: "title",
        fields: [
            createModelField({
                label: "Title",
                fieldId: "title",
                type: "text",
                validation: [required()]
            }),
            createModelField({
                label: "Price",
                fieldId: "price",
                type: "number",
                validation: [required()]
            })
        ]
    });
};

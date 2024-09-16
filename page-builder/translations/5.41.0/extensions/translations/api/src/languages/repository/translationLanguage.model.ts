import { createPrivateModel } from "@webiny/api-headless-cms";

export const translationLanguageModel = createPrivateModel({
    name: "Translation Language",
    modelId: "translationLanguage",
    titleFieldId: "name",
    fields: [
        {
            id: "name",
            fieldId: "name",
            storageId: "text@name",
            type: "text",
            label: "Name",
            tags: [],
            multipleValues: false,
            validation: [
                {
                    name: "required",
                    settings: {},
                    message: "Value is required."
                }
            ]
        },
        {
            id: "code",
            fieldId: "code",
            storageId: "text@code",
            type: "text",
            label: "Code",
            tags: [],
            multipleValues: false,
            validation: [
                {
                    name: "required",
                    settings: {},
                    message: "Value is required."
                }
            ]
        },
        {
            id: "direction",
            fieldId: "direction",
            storageId: "text@direction",
            type: "text",
            label: "Direction",
            tags: [],
            multipleValues: false,
            validation: [
                {
                    name: "required",
                    settings: {},
                    message: "Value is required."
                }
            ]
        },
        {
            id: "baseLanguage",
            fieldId: "baseLanguage",
            storageId: "boolean@baseLanguage",
            type: "boolean",
            label: "Base Language",
            tags: [],
            multipleValues: false,
            validation: [],
            listValidation: [],
            settings: {
                defaultValue: false
            }
        }
    ]
});

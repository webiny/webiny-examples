import { createCmsModelPlugin } from "@webiny/api-headless-cms";
import { group } from "./contentModelGroup";

export const createCompanyModel = () => {
    return createCmsModelPlugin({
        tenant: "root",
        name: "Company",
        group: {
            id: group.id,
            name: group.name
        },
        icon: "fas/building",
        description: "Company",
        modelId: "company",
        singularApiName: "Company",
        pluralApiName: "Companies",
        savedOn: "2024-06-14T13:07:09.730Z",
        titleFieldId: "name",
        descriptionFieldId: "description",
        imageFieldId: null,
        lockedFields: [],
        layout: [["0b6vu1w0"], ["2w3eey4k"], ["1kdv2fla"], ["1de2937p"]],
        tags: ["type:model"],
        fields: [
            {
                id: "0b6vu1w0",
                fieldId: "name",
                storageId: "text@0b6vu1w0",
                type: "text",
                label: "Name",
                tags: [],
                placeholderText: null,
                helpText: "Enter a company name",
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "text-input",
                    settings: {}
                },
                validation: [
                    {
                        name: "required",
                        settings: {},
                        message: "Value is required."
                    }
                ],
                listValidation: [],
                settings: {}
            },
            {
                id: "2w3eey4k",
                fieldId: "description",
                storageId: "long-text@2w3eey4k",
                type: "long-text",
                label: "Description",
                tags: [],
                placeholderText: null,
                helpText: "Enter a short company description",
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "long-text-text-area",
                    settings: {}
                },
                validation: [
                    {
                        name: "required",
                        settings: {},
                        message: "Value is required."
                    }
                ],
                listValidation: [],
                settings: {}
            },
            {
                id: "1de2937p",
                fieldId: "theme",
                storageId: "object@1de2937p",
                type: "object",
                label: "Theme",
                tags: [],
                placeholderText: null,
                helpText: "Configure the Admin app theme for this company.",
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "object-accordion",
                    settings: {
                        open: false
                    }
                },
                validation: [],
                listValidation: [],
                settings: {
                    fields: [
                        {
                            type: "text",
                            validation: [],
                            renderer: {
                                name: "text-input"
                            },
                            label: "Primary Color",
                            fieldId: "primaryColor",
                            helpText: "Enter a color code (e.g., #000000)",
                            id: "6szn25bu",
                            storageId: "text@6szn25bu"
                        },
                        {
                            type: "text",
                            validation: [],
                            renderer: {
                                name: "text-input"
                            },
                            label: "Secondary Color",
                            fieldId: "secondaryColor",
                            helpText: "Enter a color code (e.g., #000000)",
                            id: "msev3l7j",
                            storageId: "text@msev3l7j"
                        },
                        {
                            type: "file",
                            validation: [],
                            renderer: {
                                name: "file-input"
                            },
                            label: "Logo",
                            fieldId: "logo",
                            settings: {
                                imagesOnly: true
                            },
                            id: "4grhbpth",
                            storageId: "file@4grhbpth"
                        }
                    ],
                    layout: [["6szn25bu", "msev3l7j"], ["4grhbpth"]]
                }
            },
            {
                id: "1kdv2fla",
                fieldId: "isInstalled",
                storageId: "boolean@1kdv2fla",
                type: "boolean",
                label: "Is installed?",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "hidden",
                    settings: {}
                },
                validation: [],
                listValidation: [],
                settings: {
                    defaultValue: false
                }
            }
        ]
    });
};

import { createSingleEntryModelPlugin } from "@webiny/api-serverless-cms";
import { group } from "./contentModelGroup";

export const createThemeSettingsModel = () => {
    return createSingleEntryModelPlugin({
        name: "Theme settings",
        group: {
            id: group.id,
            name: group.name
        },
        icon: "fas/building",
        description: "Adjust the theme settings.",
        modelId: "themeSettings",
        singularApiName: "ThemeSettings",
        pluralApiName: "ThemeSettings",
        titleFieldId: "name",
        imageFieldId: null,
        lockedFields: [],
        layout: [["1de2937p"]],
        tags: ["type:model"],
        fields: [
            {
                id: "1de2937p",
                fieldId: "theme",
                storageId: "object@1de2937p",
                type: "object",
                label: "Theme",
                tags: [],
                placeholderText: null,
                helpText: "Customize the theme settings.",
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "object",
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
            }
        ]
    });
};

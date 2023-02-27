export const contentModels = [
    {
        name: "Article",
        modelId: "article",
        description: "Model for articles",
        titleFieldId: "title",
        tags: ["type:model"],
        layout: [["27rhzftn"], ["y8qugyok"], ["6ip5ffo9"], ["38ypaz63"], ["m1k38336"]],
        fields: [
            {
                id: "27rhzftn",
                fieldId: "title",
                storageId: "text@27rhzftn",
                type: "text",
                label: "Title",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "text-input"
                },
                validation: [],
                listValidation: [],
                settings: {}
            },
            {
                id: "y8qugyok",
                fieldId: "snippet",
                storageId: "long-text@y8qugyok",
                type: "long-text",
                label: "Snippet",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "long-text-text-area"
                },
                validation: [
                    {
                        name: "maxLength",
                        settings: {
                            value: "500"
                        },
                        message: "Snippet must be no longer than {value} characters."
                    }
                ],
                listValidation: [],
                settings: {}
            },
            {
                id: "6ip5ffo9",
                fieldId: "coverImage",
                storageId: "file@6ip5ffo9",
                type: "file",
                label: "Cover Image",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "file-input"
                },
                validation: [],
                listValidation: [],
                settings: {
                    imagesOnly: true
                }
            },
            {
                id: "m1k38336",
                fieldId: "tags",
                storageId: "text@m1k38336",
                type: "text",
                label: "Tags",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: true,
                renderer: {
                    name: "tags"
                },
                validation: [],
                listValidation: [],
                settings: {}
            },
            {
                id: "38ypaz63",
                fieldId: "content",
                storageId: "rich-text@38ypaz63",
                type: "rich-text",
                label: "Content",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "rich-text-input"
                },
                validation: [],
                listValidation: [],
                settings: {}
            }
        ]
    },
    {
        name: "News",
        description: "Model for News",
        modelId: "news",
        titleFieldId: "title",
        layout: [["27rhzftn"], ["y8qugyok"], ["6ip5ffo9"], ["38ypaz63"], ["m1k38336"]],
        tags: ["type:model"],
        fields: [
            {
                id: "27rhzftn",
                fieldId: "title",
                storageId: "text@27rhzftn",
                type: "text",
                label: "Title",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "text-input"
                },
                validation: [],
                listValidation: [],
                settings: {}
            },
            {
                id: "y8qugyok",
                fieldId: "snippet",
                storageId: "long-text@y8qugyok",
                type: "long-text",
                label: "Snippet",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "long-text-text-area"
                },
                validation: [
                    {
                        name: "maxLength",
                        settings: {
                            value: "500"
                        },
                        message: "Snippet must be no longer than {value} characters."
                    }
                ],
                listValidation: [],
                settings: {}
            },
            {
                id: "6ip5ffo9",
                fieldId: "coverImage",
                storageId: "file@6ip5ffo9",
                type: "file",
                label: "Cover Image",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "file-input"
                },
                validation: [],
                listValidation: [],
                settings: {
                    imagesOnly: true
                }
            },
            {
                id: "m1k38336",
                fieldId: "tags",
                storageId: "text@m1k38336",
                type: "text",
                label: "Tags",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: true,
                renderer: {
                    name: "tags"
                },
                validation: [],
                listValidation: [],
                settings: {}
            },
            {
                id: "38ypaz63",
                fieldId: "content",
                storageId: "rich-text@38ypaz63",
                type: "rich-text",
                label: "Content",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "rich-text-input"
                },
                validation: [],
                listValidation: [],
                settings: {}
            }
        ]
    },
    {
        name: "Static Page",
        description: "Model for static pages",
        modelId: "staticPage",
        titleFieldId: "title",
        layout: [["27rhzftn"], ["1ujoic7t"], ["38ypaz63"], ["m1k38336"]],
        tags: ["type:model"],
        fields: [
            {
                id: "27rhzftn",
                fieldId: "title",
                storageId: "text@27rhzftn",
                type: "text",
                label: "Title",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "text-input"
                },
                validation: [],
                listValidation: [],
                settings: {}
            },
            {
                id: "m1k38336",
                fieldId: "tags",
                storageId: "text@m1k38336",
                type: "text",
                label: "Tags",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: true,
                renderer: {
                    name: "tags"
                },
                validation: [],
                listValidation: [],
                settings: {}
            },
            {
                id: "38ypaz63",
                fieldId: "content",
                storageId: "rich-text@38ypaz63",
                type: "rich-text",
                label: "Content",
                tags: [],
                placeholderText: null,
                helpText: null,
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "rich-text-input"
                },
                validation: [],
                listValidation: [],
                settings: {}
            },
            {
                id: "1ujoic7t",
                fieldId: "path",
                storageId: "text@1ujoic7t",
                type: "text",
                label: "Path",
                tags: [],
                placeholderText: null,
                helpText: "Enter page path, e.g.: /terms-of-service",
                predefinedValues: {
                    enabled: false,
                    values: []
                },
                multipleValues: false,
                renderer: {
                    name: "text-input"
                },
                validation: [],
                listValidation: [],
                settings: {}
            }
        ]
    }
];

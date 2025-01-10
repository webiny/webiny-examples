import { createCmsModelPlugin, createModelField } from "@webiny/api-headless-cms";

export const createExtension = () => {
    return [
        // Defines a new "Article" content model.
        createCmsModelPlugin({
            name: "Article",
            modelId: "article",
            description: "A simple article model.",
            group: { id: "", name: "" },
            fields: [
                createModelField({
                    fieldId: "title",
                    type: "text",
                    label: "name",
                    helpText: "Title",
                    renderer: { name: "text-input" },
                    validation: [
                        {
                            name: "required",
                            message: "Value is required."
                        }
                    ]
                }),
                createModelField({
                    fieldId: "slug",
                    type: "text",
                    label: "Slug",
                    helpText:
                        "Slug (path) used for the article URL, for example 'top-cars-in-2024'.",
                    renderer: { name: "text-input" },
                    validation: [
                        {
                            name: "required",
                            message: "Value is required."
                        }
                    ]
                }),
                createModelField({
                    fieldId: "content",
                    type: "long-text",
                    label: "Content",
                    helpText: "Content of the article.",
                    renderer: { name: "long-text-text-area" },
                    validation: [
                        {
                            name: "required",
                            message: "Value is required."
                        }
                    ]
                })
            ],
            layout: [["title", "slug"], ["content"]],
            titleFieldId: "title"
        })
    ];
};

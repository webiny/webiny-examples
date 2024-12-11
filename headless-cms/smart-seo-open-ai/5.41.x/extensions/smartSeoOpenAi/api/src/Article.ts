import {
    createCmsModelPlugin,
    createModelField
} from "@webiny/api-headless-cms";

export const Article = () => {
    return [
        // Defines a new Ungrouped content models group.
        createCmsModelPlugin({
            name: "Article - Smart SEO",
            modelId: "article-smart-seo",
            description: "Article content model for Smart SEO",
            group: {id: "", name: ""},
            fields: [
                createModelField({
                    fieldId: "content",
                    type: "rich-text",
                    label: "Content",
                    renderer: { name: "lexical-text-input" },
                }),
                createModelField({
                    fieldId: "seoTitle",
                    type: "text",
                    label: "SEO - Title",
                    renderer: { name: "text-input" },
                }),
                createModelField({
                    fieldId: "seoDescription",
                    type: "long-text",
                    label: "SEO - Description",
                    renderer: { name: "long-text-text-area" },
                }),
                createModelField({
                    fieldId: "seoMetaTags",
                    type: "object",
                    label: "SEO - Meta tags",
                    renderer: { name: "objects" },
                    settings: {
                        fields: [
                            createModelField({
                                id: "tagName",
                                fieldId: "tagName",
                                type: "text",
                                label: "Tag Name",
                                renderer: { name: "text-input" }
                            }),
                            createModelField({
                                id: "tagValue",
                                fieldId: "tagValue",
                                type: "text",
                                label: "Tag Value",
                                renderer: { name: "text-input" }
                            })
                        ],
                        layout: [["tagName"], ["tagValue"]]
                    }
                })
            ],
            layout: [["content"], ["seoTitle"], ["seoDescription"], ["seoMetaTags"]],
            titleFieldId: "content"
        })
    ];
};
import {
    createCmsGroupPlugin,
    createCmsModelPlugin,
    createModelField,
    StorageTransformPlugin
} from "@webiny/api-headless-cms";

import type { CmsModel, CmsModelField } from "@webiny/api-headless-cms/types";

const encrypt = async (value?: string) => {
    return value ? `ENCRYPTED:${value}` : null;
};

const decrypt = async (value: string) => {
    return value === null ? null : value.replace("ENCRYPTED:", "");
};

const usesEncryption = (
    model: Pick<CmsModel, "modelId">,
    field: Pick<CmsModelField, "fieldId">
) => {
    return model.modelId === "product" && field.fieldId === "productSku";
};

export const createExtension = () => {
    return [
        // Defines a new "E-Commerce" content models group.
        createCmsGroupPlugin({
            id: "ecommerce",
            name: "E-Commerce",
            description: "E-Commerce content model group",
            slug: "e-commerce",
            icon: "fas/shopping-cart"
        }),

        // Defines a new "Product" content model.
        createCmsModelPlugin({
            name: "Product",
            modelId: "product",
            description: "Product content model",
            group: {
                id: "ecommerce",
                name: "E-Commerce"
            },
            fields: [
                createModelField({
                    fieldId: "name",
                    type: "text",
                    label: "name",
                    helpText: "A short product name",
                    renderer: { name: "text-input" },
                    validation: [
                        {
                            name: "required",
                            message: "Value is required."
                        }
                    ]
                }),
                createModelField({
                    fieldId: "productSku",
                    type: "text",
                    label: "SKU",
                    placeholderText: "SKU = Stock Keeping Unit",
                    renderer: { name: "text-input" }
                }),
                createModelField({
                    fieldId: "productPrice",
                    type: "number",
                    label: "Price",
                    renderer: { name: "text-input" }
                })
            ],
            layout: [["name"], ["productSku", "productPrice"]],
            titleFieldId: "name"
        }),
        new StorageTransformPlugin({
            fieldType: "text",
            fromStorage: async ({ model, field, value }) => {
                if (usesEncryption(model, field)) {
                    return decrypt(value);
                }

                return value;
            },
            toStorage: async ({ model, field, value }) => {
                if (usesEncryption(model, field)) {
                    return encrypt(value);
                }

                return value;
            }
        })
    ];
};

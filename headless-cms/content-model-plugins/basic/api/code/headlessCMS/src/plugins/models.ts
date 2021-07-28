import { ContentModelPlugin } from "@webiny/api-headless-cms/content/plugins/ContentModelPlugin";
import { ContentModelGroupPlugin } from "@webiny/api-headless-cms/content/plugins/ContentModelGroupPlugin";

export default [
    // Defines a new "E-Commerce" content models group.
    new ContentModelGroupPlugin({
        id: "ecommerce",
        name: "E-Commerce",
        slug: "e-commerce",
        icon: "fas/shopping-cart"
    }),

    // Defines a new "Product" content model.
    new ContentModelPlugin({
        name: "Product",
        modelId: "product",
        group: {
            id: "ecommerce",
            name: "E-Commerce"
        },
        fields: [
            {
                id: "name",
                fieldId: "name",
                type: "text",
                label: "Product Name",
                helpText: "A short product name",
                renderer: { name: "text-input" },
                validation: [
                    {
                        name: "required",
                        message: "Value is required."
                    }
                ]
            },
            {
                id: "sku",
                fieldId: "sku",
                type: "text",
                label: "SKU",
                placeholderText: "SKU = Stock Keeping Unit",
                renderer: { name: "text-input" }
            },
            {
                id: "price",
                fieldId: "price",
                type: "number",
                label: "Price",
                renderer: { name: "text-input" }
            }
        ],
        layout: [["name"], ["sku", "price"]],
        titleFieldId: "name"
    })
];

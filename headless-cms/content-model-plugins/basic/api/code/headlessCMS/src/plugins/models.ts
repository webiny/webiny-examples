import { CmsModelPlugin } from "@webiny/api-headless-cms/content/plugins/CmsModelPlugin";
import { ContentGroupPlugin } from "@webiny/api-headless-cms/content/plugins/ContentGroupPlugin";

export default [
    // Defines a new "E-Commerce" content models group.
    new ContentGroupPlugin({
        id: "ecommerce",
        name: "E-Commerce",
        slug: "e-commerce",
        icon: "fas/shopping-cart"
    }),

    // Defines a new "Product" content model.
    new CmsModelPlugin({
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

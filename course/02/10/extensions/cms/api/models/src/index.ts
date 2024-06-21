import { createCmsModelPlugin, createModelField } from "@webiny/api-headless-cms";

export const createExtension = () => {
    return [
        createCmsModelPlugin({
            name: "Product",
            modelId: "product",
            description: "Product content model",
            group: {
                id: "eCommerce",
                name: "E-Commerce"
            },
            fields: [
                createModelField({
                    fieldId: "productName",
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

            // In the `layout` array, every array that we pass resembles a new row in the form.
            // Then, for each row, we specify the fields (field IDs) that we want to render.
            layout: [["productName"], ["productSku", "productPrice"]],
            titleFieldId: "productName"
        })
    ];
};
import { createCmsModelPlugin, createModelField } from "@webiny/api-headless-cms";
import { createContextPlugin } from "@webiny/api-serverless-cms";

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
        }),
        createContextPlugin(context => {
            context.cms.onEntryBeforePublish.subscribe(async ({ model }) => {
                if (model.modelId !== "product") {
                    return;
                }

                // `getHours` returns the hour in the local timezone, starting from 0 to 23.
                const currentHourInTheDay = new Date().getHours();
                const canPublish = currentHourInTheDay >= 7 && currentHourInTheDay <= 19;
                if (!canPublish) {
                    throw new Error("You can only publish products between 8 AM and 8 PM.");
                }
            });
        })
    ];
};
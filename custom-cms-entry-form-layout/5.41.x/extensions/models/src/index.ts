import {
    createCmsGroupPlugin,
    createCmsModelPlugin,
    createModelField
} from "@webiny/api-headless-cms";

export const createExtension = () => {
    return [
        // Defines a new "E-Commerce" content models group.
        createCmsGroupPlugin({
            id: "pizzeria",
            name: "Pizzeria",
            description: "Pizzeria-related content models.",
            slug: "pizzeria",
            icon: "fas/pizza-slice"
        }),

        // Defines a new "Product" content model.
        createCmsModelPlugin({
            name: "Pizza",
            modelId: "pizza",
            description: "Pizza related content.",
            group: {
                id: "pizzeria",
                name: "Pizzeria"
            },
            fields: [
                createModelField({
                    id: "gaj2w2eb",
                    fieldId: "name",
                    storageId: "text@gaj2w2eb",
                    type: "text",
                    label: "Name",
                    renderer: {
                        name: "text-input",
                        settings: {}
                    },
                    validation: [
                        {
                            name: "required",
                            settings: {},
                            message: "Title is a required field."
                        }
                    ]
                }),
                createModelField({
                    id: "wz3runy7",
                    fieldId: "price",
                    storageId: "number@wz3runy7",
                    type: "number",
                    label: "Price",
                    renderer: {
                        name: "number-input",
                        settings: {}
                    }
                }),
                createModelField({
                    id: "s7wqd2g0",
                    fieldId: "numberOfIngredients",
                    storageId: "number@s7wqd2g0",
                    type: "number",
                    label: "Number of ingredients",
                    renderer: {
                        name: "number-input",
                        settings: {}
                    }
                }),
                createModelField({
                    id: "pcofsq5m",
                    fieldId: "glutenFree",
                    storageId: "boolean@pcofsq5m",
                    type: "boolean",
                    label: "Gluten-free",
                    renderer: {
                        name: "boolean-input",
                        settings: {}
                    },
                    settings: {
                        defaultValue: false
                    }
                }),
                createModelField({
                    id: "02hbjdy6",
                    fieldId: "recipe",
                    storageId: "long-text@02hbjdy6",
                    type: "long-text",
                    label: "Recipe",
                    renderer: {
                        name: "long-text-text-area",
                        settings: {}
                    }
                }),
                createModelField({
                    id: "occavfqi",
                    fieldId: "history",
                    storageId: "long-text@occavfqi",
                    type: "long-text",
                    label: "History",
                    renderer: {
                        name: "long-text-text-area",
                        settings: {}
                    }
                })
            ],
            icon: "fas/pizza-slice",
            descriptionFieldId: "recipe",
            layout: [
                ["gaj2w2eb"],
                ["wz3runy7"],
                ["s7wqd2g0"],
                ["pcofsq5m"],
                ["02hbjdy6"],
                ["occavfqi"]
            ],
            titleFieldId: "name"
        })
    ];
};

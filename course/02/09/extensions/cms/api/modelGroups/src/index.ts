import { createCmsGroupPlugin } from "@webiny/api-headless-cms";

export const createExtension = () => {
    return [
        // Defines a new "E-Commerce" content models group.
        createCmsGroupPlugin({
            id: "eCommerce",
            name: "E-Commerce",
            description: "E-Commerce content model group",
            slug: "e-commerce",

            // https://fontawesome.com/v5/search
            icon: "fas/shopping-cart"
        })
    ];
};


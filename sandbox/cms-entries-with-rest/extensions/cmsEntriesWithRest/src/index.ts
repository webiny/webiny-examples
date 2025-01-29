import { createApiGatewayRoute } from "@webiny/handler-aws";
import { type Context } from "@webiny/api-serverless-cms";
import {
  createCmsGroupPlugin,
  createCmsModelPlugin,
  createModelField
} from "@webiny/api-headless-cms";

export const createExtension = () => {
  return [
    // at the end of the plugins array you need to create a new API Gateway route
    createApiGatewayRoute<Context>(({ onGet, context }) => {
      onGet("/create", async (_, reply) => {
        const model = await context.cms.getModel("product");

        const createdModel = await context.cms.createEntry(model, {
          name: "Product 1",
          productSku: "product-1",
          productPrice: 100
        });

        return reply.send(createdModel);
      });
    }),

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
    })
  ];
};

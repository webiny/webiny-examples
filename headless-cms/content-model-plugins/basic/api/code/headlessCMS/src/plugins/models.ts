import { CmsModelPlugin } from "@webiny/api-headless-cms/content/plugins/CmsModelPlugin";
import { CmsGroupPlugin } from "@webiny/api-headless-cms/content/plugins/CmsGroupPlugin";

export default [
    // Defines a new "E-Commerce" content models group.
    new CmsGroupPlugin({
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
        name: "E-Commerce",
      },
      fields: [
        {
          id: "productName",
          fieldId: "productName",
          type: "text",
          label: "Product Name",
          helpText: "A short product name",
          renderer: { name: "text-input" },
          validation: [
            {
              name: "required",
              message: "Value is required.",
            },
          ],
        },
        {
          id: "productSKU",
          fieldId: "productSKU",
          type: "text",
          label: "SKU",
          placeholderText: "SKU = Stock Keeping Unit",
          renderer: { name: "text-input" }
        },
        {
          id: "productPrice",
          fieldId: "productPrice",
          type: "number",
          label: "Price",
          renderer: { name: "text-input" }
        },
        {
          id: "productCategory",
          fieldId: "productCategory",
          type: "ref",
          label: "Category",
          renderer: { name: "ref-input" },
          settings: {
           models: [
            {
             modelId: "category"
            }
           ]
          }
         }
      ],
      layout: [["productName"], ["productSKU", "productPrice"], ["productCategory"]],
      titleFieldId: "productName"
    }),

    // Defines a new "Category" content model.
    new CmsModelPlugin({
      name: "Category",
      modelId: "category",
      group: {
        id: "ecommerce",
        name: "E-Commerce"
      },
      fields: [
        {
          id: "categoryName",
          fieldId: "categoryName",
          type: "text",
          label: "Category Name",
          renderer: { name: "text-input" },
          validation: [
            {
              name: "required",
              message: "Value is required.",
            },
            {
              name: "unique",
              message: "Field value must be unique."
            }
          ]
        }
      ],
      layout: [["categoryName"]],
      titleFieldId: "categoryName"
    })
  ]

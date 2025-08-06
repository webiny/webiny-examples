import { CmsGroupInput, createModelGroupPlugin } from "@webiny/api-headless-cms";

export const group: CmsGroupInput = {
    id: "my-business",
    name: "My Business",
    description: "Content models for my business domain",
    icon: "fa/building",
    slug: "my-business"
};

export const createModelGroup = () => {
    return createModelGroupPlugin(group);
};

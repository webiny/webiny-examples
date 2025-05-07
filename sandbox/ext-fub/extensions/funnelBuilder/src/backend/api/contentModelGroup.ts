import { createModelGroupPlugin } from "@webiny/api-serverless-cms";

type ModelGroup = Parameters<typeof createModelGroupPlugin>[0];

export const group: ModelGroup = {
    id: "settings",
    name: "Settings",
    description: "Settings",
    icon: "fa/building",
    slug: "settings"
};

export const createModelGroup = () => {
    return createModelGroupPlugin(group);
};

import { Context } from "../types";

export const getCompanyModel = async (context: Context) => {
    const model = await context.cms.getModel("company");

    if (!model) {
        throw new Error(`Model "company" was not found!`);
    }

    return model;
};

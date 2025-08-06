import { Context } from "../types";
import { COMPANY_MODEL_ID } from "../storage/companyModel";

export const getCompanyModel = async (context: Context) => {
    const model = await context.cms.getModel(COMPANY_MODEL_ID);

    if (!model) {
        throw new Error(`Model "${COMPANY_MODEL_ID}" was not found!`);
    }

    return model;
};

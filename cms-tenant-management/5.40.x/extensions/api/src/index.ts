import { createCompanyModel } from "./companyModel";
import { createModelGroup } from "./contentModelGroup";
import { getCurrentCompany } from "./getCurrentCompany";
import { installTenant } from "./installTenant";

export const createExtension = () => {
    return [createModelGroup(), createCompanyModel(), installTenant(), getCurrentCompany()];
};

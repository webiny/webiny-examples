import { createCompanyModel } from "./storage/companyModel";
import { createModelGroup } from "./storage/contentModelGroup";
import { installTenant } from "./graphql/installTenant";
import { getCurrentCompany } from "./graphql/getCurrentCompany";
import { createGoldenKeyAuthentication } from "./authentication/apiKeyAuthentication";

export const createExtension = () => {
  return [
    createModelGroup(),
    createCompanyModel(),
    installTenant(),
    getCurrentCompany(),
    createGoldenKeyAuthentication()
  ];
};

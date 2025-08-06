import { InstallTenant } from "@webiny/api-serverless-cms";
import { parseIdentifier } from "@webiny/utils";
import type { Context } from "../types";
import { getCompanyModel } from "./getCompanyModel";
import { GetCompanyById } from "./GetCompanyById";

export class CreateAndInstallTenant {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(companyId: string) {
        const { id: entryId } = parseIdentifier(companyId);
        const { cms, tenancy } = this.context;

        const companyModel = await getCompanyModel(this.context);

        const company = await new GetCompanyById(this.context).execute(entryId);

        const tenant = await tenancy.createTenant({
            id: entryId,
            name: company.name,
            parent: "root",
            description: company.name,
            tags: []
        });

        const installTenant = new InstallTenant(this.context);
        await installTenant.execute(tenant, {
            i18n: {
                defaultLocaleCode: "en-US"
            }
        });

        await cms.updateEntry(companyModel, companyId, { ...company, isInstalled: true });
    }
}

import { Company } from "@demo/shared";
import { parseIdentifier } from "@webiny/utils";
import { Context } from "../types";
import { getCompanyModel } from "./getCompanyModel";

const rootCompanyMock: Company = {
    id: "company:root",
    name: "Root",
    isInstalled: true,
    description: "Platform Root",
    theme: {
        primaryColor: "#fa5723",
        secondaryColor: "#00ccb0",
        logo: ""
    }
};

export class GetCompanyById {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(id: string): Promise<Company> {
        const currentTenant = this.context.tenancy.getCurrentTenant();
        if (currentTenant.id === "root") {
            return rootCompanyMock;
        }

        const { id: entryId } = parseIdentifier(id);

        return this.context.tenancy.withRootTenant(async () => {
            const companyModel = await getCompanyModel(this.context);

            const companyEntry = await this.context.cms.getEntry(companyModel, {
                where: { entryId, latest: true }
            });

            return { id: entryId, ...companyEntry.values } as Company;
        });
    }
}

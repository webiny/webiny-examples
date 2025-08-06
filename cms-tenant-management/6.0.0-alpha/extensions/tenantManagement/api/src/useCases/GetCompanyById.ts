import type { Company } from "@demo/tenant-management-shared";
import { parseIdentifier } from "@webiny/utils";
import type { Context } from "../types";
import { getCompanyModel } from "./getCompanyModel";

/**
 * Since there's no Company record for the "root" tenant, we mock the result here.
 */
const rootCompanyMock: Company = {
    id: "root",
    name: "Root",
    isInstalled: true,
    description: "Platform Root",
    theme: {
        websiteTitle: "Your Company",
        primaryColor: "#fa5723",
        additionalColors: ["#00ccb0", "#0a0a0a", "#616161"],
        font: "Roboto"
    }
};

export class GetCompanyById {
    private readonly context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    async execute(id: string): Promise<Company> {
        if (id === "root") {
            return rootCompanyMock;
        }

        const { id: entryId } = parseIdentifier(id);

        return this.context.tenancy.withRootTenant(async () => {
            return this.context.security.withoutAuthorization(async () => {
                const companyModel = await getCompanyModel(this.context);

                const companyEntry = await this.context.cms.getEntry(companyModel, {
                    where: { entryId, latest: true }
                });

                return { id: entryId, ...companyEntry.values } as Company;
            });
        });
    }
}

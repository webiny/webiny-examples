import { CREATE_TENANT, LIST_TENANTS } from "./graphql";
import { TenancyMigrator } from "../../TenancyMigrator";

export class TenantsMigrator {
    private readonly tenancyMigrator: TenancyMigrator;

    constructor(tenancyMigrator: TenancyMigrator) {
        this.tenancyMigrator = tenancyMigrator;
    }

    async run() {
        const { sourceGqlClient, targetGqlClient } = this.tenancyMigrator;
        const sourceListTenants = await sourceGqlClient.run(LIST_TENANTS).then(res => {
            return res.tenancy.listTenants;
        });
        const targetListTenants = await targetGqlClient.run(LIST_TENANTS).then(res => {
            return res.tenancy.listTenants;
        });

        if (sourceListTenants.data.length === 0) {
            console.log("No tenants to migrate.");
            return;
        }

        for (const tenant of sourceListTenants.data) {
            const alreadyExists = targetListTenants.data.some(
                (m: Record<string, any>) => m.id === tenant.id
            );

            if (alreadyExists) {
                console.log(`Tenant "${tenant.name}" already exists in the target environment.`);
                continue;
            }

            console.log(`Migrating tenant "${tenant.name}"...`);

            // Migrate tenant items.
            const res = await targetGqlClient.run(CREATE_TENANT, {
                data: {
                    id: tenant.id,
                    tags: tenant.tags,
                    name: tenant.name,
                    description: tenant.description,
                    settings: tenant.settings
                }
            });

            const { error } = res.tenancy.createTenant;
            if (error) {
                console.log(`Failed to migrate tenant "${tenant.title}". Error:`, error);
                continue;
            }

            // Install tenant.

        }
    }
}

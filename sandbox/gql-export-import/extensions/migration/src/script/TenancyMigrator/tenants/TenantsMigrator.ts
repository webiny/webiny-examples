import { CREATE_TENANT, INSTALL_TENANT, LIST_TENANTS } from "./graphql";
import { TenancyMigrator } from "../../TenancyMigrator";

export class TenantsMigrator {
    private readonly tenancyMigrator: TenancyMigrator;

    constructor(tenancyMigrator: TenancyMigrator) {
        this.tenancyMigrator = tenancyMigrator;
    }

    async run() {
        console.log("Migrating Tenant records...");

        const { sourceRootGqlClient, targetRootGqlClient } = this.tenancyMigrator;
        const sourceListTenants = await sourceRootGqlClient.run(LIST_TENANTS).then(res => {
            return res.tenancy.listTenants;
        });

        if (sourceListTenants.error) {
            throw new Error(
                `Failed to list tenants in the source environment: ${sourceListTenants.error.message}. Did you provide the correct source API key?`
            );
        }

        const tenantId = this.tenancyMigrator.tenantId;
        if (tenantId === "root") {
            console.log("No need to run this in a root tenant.");
            console.log("For reference, here's the list of non-root tenants:");

            const tenantsList = sourceListTenants.data
                .map((t: Record<string, any>, i: number) => `${i + 1}. ${t.name} (${t.id})`)
                .join("\n");
            console.log(tenantsList);
            return;
        }

        const targetListTenants = await targetRootGqlClient
            .run(LIST_TENANTS)
            .then(res => {
                return res.tenancy.listTenants;
            });

        if (targetListTenants.error) {
            throw new Error(
                `Failed to list tenants in the target environment: ${targetListTenants.error.message}. Did you provide the correct source API key?`
            );
        }

        const sourceTenant = sourceListTenants.data.find(
            (m: Record<string, any>) => m.id === tenantId
        );

        if (!sourceTenant) {
            throw new Error(`Tenant "${tenantId}" not found in the source environment.`);
        }

        const tenantExists = targetListTenants.data.some(
            (m: Record<string, any>) => m.id === tenantId
        );

        if (tenantExists) {
            console.log(
                `Tenant "${sourceTenant.name}" ("${tenantId}") already exists in the target environment.`
            );
            return;
        }

        console.log(`Migrating tenant "${sourceTenant.name}"...`);

        // Migrate tenant items.
        const createTenantResponse = await targetRootGqlClient.run(CREATE_TENANT, {
            data: {
                id: sourceTenant.id,
                tags: sourceTenant.tags,
                name: sourceTenant.name,
                description: sourceTenant.description,
                settings: sourceTenant.settings
            }
        });

        const { error: createTenantError } = createTenantResponse.tenancy.createTenant;
        if (createTenantError) {
            console.log(
                `Failed to migrate tenant "${sourceTenant.title}". Error:`,
                createTenantError
            );
            return;
        }

        // Install tenant.
        const installTenantResponse = await targetRootGqlClient.run(INSTALL_TENANT, {
            tenantId: sourceTenant.id
        });

        const { error: installTenantError } = installTenantResponse.tenancy.installTenant;
        if (installTenantError) {
            console.log(
                `Failed to migrate tenant "${sourceTenant.title}". Error:`,
                installTenantError
            );
        }
    }
}

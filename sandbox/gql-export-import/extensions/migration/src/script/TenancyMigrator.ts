import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { TenantsMigrator } from "./TenancyMigrator/tenants/TenantsMigrator";

export class TenancyMigrator extends AbstractMigrator {
    readonly sourceGqlClient: GqlClient;
    readonly targetGqlClient: GqlClient;

    constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string,
        tenantId: string
    ) {
        super(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey, tenantId);

        this.sourceGqlClient = new GqlClient(
            this.sourceApiUrl + "/graphql",
            this.sourceApiKey,
            this.tenantId
        );
        this.targetGqlClient = new GqlClient(
            this.targetApiUrl + "/graphql",
            this.targetApiKey,
            this.tenantId
        );
    }

    async run() {
        // No need to run this in a non-root tenant.
        if (this.tenantId !== "root") {
            return;
        }

        const start = Date.now();
        console.log("🌀 Starting Tenants migration...");

        const tenantsMigrator = new TenantsMigrator(this);

        console.log("Migrating Tenant records...");
        await tenantsMigrator.run();

        console.log("🟢 Tenants migration completed in", Date.now() - start, "ms");
        console.log();
    }
}

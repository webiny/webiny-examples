import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { TenantsMigrator } from "./TenancyMigrator/tenants/TenantsMigrator";

export class TenancyMigrator extends AbstractMigrator {
    readonly sourceRootGqlClient: GqlClient;
    readonly targetRootGqlClient: GqlClient;
    readonly sourceGqlClient: GqlClient;
    readonly targetGqlClient: GqlClient;

    constructor(
        sourceApiUrl: string,
        sourceRootTenantApiKey: string,
        sourceTenantApiKey: string,
        targetApiUrl: string,
        targetApiKey: string,
        tenantId: string
    ) {
        super(
            sourceApiUrl,
            sourceRootTenantApiKey,
            sourceTenantApiKey,
            targetApiUrl,
            targetApiKey,
            tenantId
        );

        this.sourceRootGqlClient = new GqlClient(
            this.sourceApiUrl + "/graphql",
            this.sourceRootTenantApiKey,
            "root"
        );

        this.targetRootGqlClient = new GqlClient(
            this.targetApiUrl + "/graphql",
            this.targetApiKey,
            "root"
        );

        this.sourceGqlClient = new GqlClient(
            this.sourceApiUrl + "/graphql",
            this.sourceTenantApiKey,
            this.tenantId
        );

        this.targetGqlClient = new GqlClient(
            this.targetApiUrl + "/graphql",
            this.targetApiKey,
            this.tenantId
        );
    }

    async run() {
        const start = Date.now();
        console.log("🌀 Starting Tenants migration...");
        console.log();

        const migrators = [TenantsMigrator];

        for (const MigratorClass of migrators) {
            const migrator = new MigratorClass(this);
            await migrator.run();
            console.log();
        }

        console.log("🟢 Tenants migration completed in", Date.now() - start, "ms");
    }
}

import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { SecurityApiKeysMigrator } from "./SecurityMigrator/apiKeys/SecurityApiKeysMigrator";
import { SecurityRolesMigrator } from "./SecurityMigrator/roles/SecurityRolesMigrator";

export class SecurityMigrator extends AbstractMigrator {
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

        this.sourceGqlClient = new GqlClient(
            this.sourceApiUrl + "/graphql",
            this.sourceTenantApiKey,
            tenantId
        );
        this.targetGqlClient = new GqlClient(
            this.targetApiUrl + "/graphql",
            this.targetApiKey,
            tenantId
        );
    }

    async run() {
        const start = Date.now();
        console.log("🌀 Starting Security migration...");
        console.log();

        const migrators = [SecurityRolesMigrator, SecurityApiKeysMigrator];

        for (const MigratorClass of migrators) {
            const migrator = new MigratorClass(this);
            await migrator.run();
            console.log();
        }

        console.log("🟢 Security migration completed in", Date.now() - start, "ms.");
    }
}

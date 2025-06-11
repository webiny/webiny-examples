import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { PbMenusMigrator } from "./PbMigrator/menus/PbMenusMigrator";
import { PbPagesMigrator } from "./PbMigrator/pages/PbPagesMigrator";
import { PbSettingsMigrator } from "./PbMigrator/settings/PbSettingsMigrator";
import { PbCategoriesMigrator } from "./PbMigrator/categories/PbCategoriesMigrator";
import { SecurityRolesMigrator } from "./SecurityMigrator/roles/SecurityRolesMigrator";
import { SecurityApiKeysMigrator } from "./SecurityMigrator/apiKeys/SecurityApiKeysMigrator";

export class PbMigrator extends AbstractMigrator {
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
        console.log("🌀 Starting Page Builder migration...");
        console.log();

        const migrators = [
            PbMenusMigrator,
            PbCategoriesMigrator,
            PbPagesMigrator,
            PbSettingsMigrator
        ];

        for (const MigratorClass of migrators) {
            const migrator = new MigratorClass(this);
            await migrator.run();
            console.log();
        }

        console.log("🟢 Page Builder migration completed in", Date.now() - start, "ms");
        console.log();
    }
}

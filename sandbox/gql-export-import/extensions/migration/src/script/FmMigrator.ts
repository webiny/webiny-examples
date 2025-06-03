import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { FmFilesMigrator } from "./FmMigrator/files/FmFilesMigrator";
import { FmSettingsMigrator } from "./FmMigrator/settings/FmSettingsMigrator";

export class FmMigrator extends AbstractMigrator {
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
        super(sourceApiUrl, sourceRootTenantApiKey, sourceTenantApiKey, targetApiUrl, targetApiKey, tenantId);

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
        console.log("🌀 Starting File Manager migration...");
        console.log();

        const migrators = [FmSettingsMigrator, FmFilesMigrator];

        for (const MigratorClass of migrators) {
            const migrator = new MigratorClass(this);
            await migrator.run();
            console.log();
        }

        console.log("🟢 File Manager migration completed in", Date.now() - start, "ms");
        console.log();
    }
}

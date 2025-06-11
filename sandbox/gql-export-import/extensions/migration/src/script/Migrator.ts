import { AbstractMigrator } from "./AbstractMigrator";
import { FmMigrator } from "./FmMigrator";
import { PbMigrator } from "./PbMigrator";
import { TenancyMigrator } from "./TenancyMigrator";
import { CmsMigrator } from "./CmsMigrator";
import { SecurityMigrator } from "./SecurityMigrator";

export class Migrator extends AbstractMigrator {
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
    }

    async run() {
        const start = Date.now();
        console.log("Starting migration...");
        console.log();

        const migrators = [TenancyMigrator, SecurityMigrator, FmMigrator, PbMigrator, CmsMigrator];

        for (const MigratorClass of migrators) {
            const migrator = new MigratorClass(
                this.sourceApiUrl,
                this.sourceRootTenantApiKey,
                this.sourceTenantApiKey,
                this.targetApiUrl,
                this.targetApiKey,
                this.tenantId
            );
            await migrator.run();
            console.log();
        }

        console.log("Migration completed in", Date.now() - start, "ms");
    }
}

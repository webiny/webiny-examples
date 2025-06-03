import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { CmsGroupsMigrator } from "./CmsMigrator/groups/CmsGroupsMigrator";
import { CmsModelsMigrator } from "./CmsMigrator/models/CmsModelsMigrator";
import { CmsEntriesMigrator } from "./CmsMigrator/entries/CmsEntriesMigrator";

export class CmsMigrator extends AbstractMigrator {
    readonly sourceGqlManageClient: GqlClient;
    readonly targetGqlManageClient: GqlClient;

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

        // The `en-US` locale is hardcoded here, but it can be changed to any other locale.
        // We could probably make this more dynamic in the future. For now, it's fine.
        this.sourceGqlManageClient = new GqlClient(
            this.sourceApiUrl + "/cms/manage/en-US",
            this.sourceTenantApiKey,
            this.tenantId
        );
        this.targetGqlManageClient = new GqlClient(
            this.targetApiUrl + "/cms/manage/en-US",
            this.targetApiKey,
            this.tenantId
        );
    }

    async run() {
        const start = Date.now();
        console.log("🌀 Starting CMS migration...");
        console.log();

        const migrators = [CmsGroupsMigrator, CmsModelsMigrator, CmsEntriesMigrator];

        for (const MigratorClass of migrators) {
            const migrator = new MigratorClass(this);
            await migrator.run();
            console.log();
        }

        console.log("🟢 Headless CMS migration completed in", Date.now() - start, "ms");
        console.log();
    }
}

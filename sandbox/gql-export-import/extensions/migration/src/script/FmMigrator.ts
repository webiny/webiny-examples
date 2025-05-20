import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { FmFilesMigrator } from "./FmMigrator/files/FmFilesMigrator";
import { FmSettingsMigrator } from "./FmMigrator/settings/FmSettingsMigrator";

export class FmMigrator extends AbstractMigrator {
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
        const fmFilesMigrator = new FmFilesMigrator(this);
        const fmSettingsMigrator = new FmSettingsMigrator(this);

        console.log("Migrating files...");
        await fmFilesMigrator.run();

        console.log("Migrating File Manager settings...");
        await fmSettingsMigrator.run();

        console.log("🟢 File Manager migration completed in", Date.now() - start, "ms");
        console.log();
    }
}

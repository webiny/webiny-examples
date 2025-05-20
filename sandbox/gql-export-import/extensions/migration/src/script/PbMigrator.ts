import { AbstractMigrator } from "./AbstractMigrator";
import { GqlClient } from "./utils";
import { PbMenusMigrator } from "./PbMigrator/menus/PbMenusMigrator";
import { PbPagesMigrator } from "./PbMigrator/pages/PbPagesMigrator";
import { PbSettingsMigrator } from "./PbMigrator/settings/PbSettingsMigrator";
import { PbCategoriesMigrator } from "./PbMigrator/categories/PbCategoriesMigrator";

export class PbMigrator extends AbstractMigrator {
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

        this.sourceGqlClient = new GqlClient(this.sourceApiUrl + "/graphql", this.sourceApiKey, this.tenantId);
        this.targetGqlClient = new GqlClient(this.targetApiUrl + "/graphql", this.targetApiKey, this.tenantId);
    }

    async run() {
        const start = Date.now();
        console.log("🌀 Starting Page Builder migration...");

        const pbMenusMigrator = new PbMenusMigrator(this);
        const pbCategoriesMigrator = new PbCategoriesMigrator(this);
        const pbPagesMigrator = new PbPagesMigrator(this);
        const pbSettingsMigrator = new PbSettingsMigrator(this);

        console.log("Migrating menus...");
        await pbMenusMigrator.run();

        console.log("Migrating categories...");
        await pbCategoriesMigrator.run();

        console.log("Migrating pages...");
        await pbPagesMigrator.run();

        console.log("Migrating settings...");
        await pbSettingsMigrator.run();

        console.log("🟢 Page Builder migration completed in", Date.now() - start, "ms");
        console.log();
    }
}

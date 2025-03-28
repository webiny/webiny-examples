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
        targetApiKey: string
    ) {
        super(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey);

        this.sourceGqlClient = new GqlClient(this.sourceApiUrl + "/graphql", this.sourceApiKey);
        this.targetGqlClient = new GqlClient(this.targetApiUrl + "/graphql", this.targetApiKey);
    }

    async run() {
        const pbMenusMigrator = new PbMenusMigrator(this);
        const pbCategoriesMigrator = new PbCategoriesMigrator(this);
        const pbPagesMigrator = new PbPagesMigrator(this);
        const pbSettingsMigrator = new PbSettingsMigrator(this);

        await pbMenusMigrator.run();
        await pbCategoriesMigrator.run();
        await pbPagesMigrator.run();
        await pbSettingsMigrator.run();
    }
}

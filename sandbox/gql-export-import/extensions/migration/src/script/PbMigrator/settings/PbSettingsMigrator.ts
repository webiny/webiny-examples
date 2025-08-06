import { GET_SETTINGS, UPDATE_SETTINGS } from "./graphql";
import { PbMigrator } from "../../PbMigrator";

export class PbSettingsMigrator {
    private readonly pbMigrator: PbMigrator;

    constructor(pbMigrator: PbMigrator) {
        this.pbMigrator = pbMigrator;
    }

    async run() {
        console.log("Migrating settings...");

        const { sourceGqlClient, targetGqlClient } = this.pbMigrator;

        const sourceSettings = await sourceGqlClient.run(GET_SETTINGS).then(res => {
            return res.pageBuilder.getSettings;
        });

        const res = await targetGqlClient.run(UPDATE_SETTINGS, {
            data: sourceSettings.data
        });

        const { error } = res.pageBuilder.updateSettings;
        if (error) {
            console.log(`Failed to migrate settings data: ${error.message}`);
        }
    }
}

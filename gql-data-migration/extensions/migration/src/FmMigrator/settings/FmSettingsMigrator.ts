import { GET_SETTINGS, UPDATE_SETTINGS } from "./graphql";
import { FmMigrator } from "../../FmMigrator";

export class FmSettingsMigrator {
    private readonly fmMigrator: FmMigrator;

    constructor(fmMigrator: FmMigrator) {
        this.fmMigrator = fmMigrator;
    }

    async run() {
        const { sourceGqlClient, targetGqlClient } = this.fmMigrator;

        const sourceSettings = await sourceGqlClient.run(GET_SETTINGS).then(res => {
            return res.fileManager.getSettings;
        });

        const res = await targetGqlClient.run(UPDATE_SETTINGS, {
            data: sourceSettings.data
        });

        const { error } = res.fileManager.updateSettings;
        if (error) {
            console.log(`Failed to migrate settings data: ${error.message}`);
        }
    }
}

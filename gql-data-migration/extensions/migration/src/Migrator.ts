import { AbstractMigrator } from "./AbstractMigrator";
import { FmMigrator } from "./FmMigrator";
import { PbMigrator } from "./PbMigrator";

export class Migrator extends AbstractMigrator {
    constructor(
        sourceApiUrl: string,
        sourceApiKey: string,
        targetApiUrl: string,
        targetApiKey: string
    ) {
        super(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey);
    }

    async run() {
        const start = Date.now();
        console.log("Starting migration...");
        console.log();

        const fmMigrator = new FmMigrator(
            this.sourceApiUrl,
            this.sourceApiKey,
            this.targetApiUrl,
            this.targetApiKey
        );
        const pbMigrator = new PbMigrator(
            this.sourceApiUrl,
            this.sourceApiKey,
            this.targetApiUrl,
            this.targetApiKey
        );

        await fmMigrator.run();
        await pbMigrator.run();

        console.log("Migration completed in", Date.now() - start, "ms");
    }
}

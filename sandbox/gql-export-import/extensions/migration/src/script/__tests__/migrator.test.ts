import dotenv from "dotenv";
import { Migrator } from "../../src/Migrator";

jest.setTimeout(500_000);

dotenv.config();

describe("Migrator Tests2", () => {
    it("should work2", async () => {
        const sourceApiUrl = process.env.SOURCE_API_URL;
        const sourceApiKey = process.env.SOURCE_API_KEY;
        const targetApiUrl = process.env.TARGET_API_URL;
        const targetApiKey = process.env.TARGET_API_KEY;
        const tenantId = process.env.TENANT_ID;

        if (!sourceApiUrl || !sourceApiKey || !targetApiUrl || !targetApiKey || !tenantId) {
            throw new Error("Missing environment variables.");
        }

        const migrator = new Migrator(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey, tenantId);
        await migrator.run();
    });
});

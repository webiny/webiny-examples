import dotenv from "dotenv";
import { Migrator } from "../Migrator";

jest.setTimeout(500_000);

dotenv.config();

describe("Migrator Tests", () => {
    it("should work", async () => {
        const sourceApiUrl = process.env.WEBINY_MIGRATION_SOURCE_API_URL;
        const sourceTenantApiKey = process.env.WEBINY_MIGRATION_SOURCE_TENANT_API_KEY;
        const sourceRootTenantApiKey = process.env.WEBINY_MIGRATION_SOURCE_ROOT_TENANT_API_KEY;
        const targetApiUrl = process.env.WEBINY_MIGRATION_TARGET_API_URL;
        const targetApiKey = process.env.WEBINY_MIGRATION_TARGET_API_KEY;
        const tenantId = process.env.WEBINY_MIGRATION_TENANT_ID;

        if (
            !sourceApiUrl ||
            !sourceRootTenantApiKey ||
            !sourceTenantApiKey ||
            !targetApiUrl ||
            !targetApiKey ||
            !tenantId
        ) {
            throw new Error("Missing environment variables.");
        }

        const migrator = new Migrator(
            sourceApiUrl,
            sourceRootTenantApiKey,
            sourceTenantApiKey,
            targetApiUrl,
            targetApiKey,
            tenantId
        );
        await migrator.run();
    });
});

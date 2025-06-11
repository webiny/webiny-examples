import dotenv from "dotenv";
import { Migrator } from "./Migrator";

dotenv.config();

const sourceApiUrl = process.env.WEBINY_MIGRATION_SOURCE_API_URL;
const sourceRootTenantApiKey = process.env.WEBINY_MIGRATION_SOURCE_ROOT_TENANT_API_KEY;
const sourceTenantApiKey = process.env.WEBINY_MIGRATION_SOURCE_TENANT_API_KEY;
const targetApiUrl = process.env.WEBINY_MIGRATION_TARGET_API_URL;
const targetApiKey = process.env.WEBINY_MIGRATION_TARGET_API_KEY;
const tenantId = process.env.WEBINY_MIGRATION_TENANT_ID;

if (!sourceApiUrl || !sourceRootTenantApiKey || !sourceTenantApiKey || !targetApiUrl || !targetApiKey || !tenantId) {
    throw new Error(
        "Missing environment variables. The following variables are required: WEBINY_MIGRATION_SOURCE_API_URL, WEBINY_MIGRATION_SOURCE_TENANT_API_KEY, WEBINY_MIGRATION_TARGET_API_URL, WEBINY_MIGRATION_TARGET_API_KEY, WEBINY_MIGRATION_TENANT_ID"
    );
}

const migrator = new Migrator(
    sourceApiUrl,
    sourceRootTenantApiKey,
    sourceTenantApiKey,
    targetApiUrl,
    targetApiKey,
    tenantId
);
migrator.run();

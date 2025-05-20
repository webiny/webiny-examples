import dotenv from "dotenv";
import { Migrator } from "./Migrator";

dotenv.config();

const sourceApiUrl = process.env.SOURCE_API_URL;
const sourceApiKey = process.env.SOURCE_API_KEY;
const targetApiUrl = process.env.TARGET_API_URL;
const targetApiKey = process.env.TARGET_API_KEY;
const tenantId = process.env.TENANT_ID;

if (!sourceApiUrl || !sourceApiKey || !targetApiUrl || !targetApiKey || !tenantId) {
    throw new Error(
        "Missing environment variables. The following variables are required: SOURCE_API_URL, SOURCE_API_KEY, TARGET_API_URL, TARGET_API_KEY, TENANT_ID"
    );
}

const migrator = new Migrator(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey, tenantId);
migrator.run();

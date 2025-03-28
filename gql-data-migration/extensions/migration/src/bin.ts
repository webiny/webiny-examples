import dotenv from "dotenv";
import { Migrator } from "./Migrator";

dotenv.config();

const sourceApiUrl = process.env.SOURCE_API_URL;
const sourceApiKey = process.env.SOURCE_API_KEY;
const targetApiUrl = process.env.TARGET_API_URL;
const targetApiKey = process.env.TARGET_API_KEY;

if (!sourceApiUrl || !sourceApiKey || !targetApiUrl || !targetApiKey) {
    throw new Error("Missing environment variables.");
}

const migrator = new Migrator(sourceApiUrl, sourceApiKey, targetApiUrl, targetApiKey);
migrator.run();

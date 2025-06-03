import { CREATE_API_KEY, LIST_API_KEYS } from "./graphql";
import { SecurityMigrator } from "../../SecurityMigrator";

export class SecurityApiKeysMigrator {
    private readonly securityMigrator: SecurityMigrator;

    constructor(securityMigrator: SecurityMigrator) {
        this.securityMigrator = securityMigrator;
    }

    async run() {
        console.log("Migrating Security API keys...");

        const { sourceGqlClient, targetGqlClient } = this.securityMigrator;
        const sourceListApiKeys = await sourceGqlClient.run(LIST_API_KEYS).then(res => {
            return res.security.listApiKeys;
        });
        const targetListApiKeys = await targetGqlClient.run(LIST_API_KEYS).then(res => {
            return res.security.listApiKeys;
        });

        if (sourceListApiKeys.data.length === 0) {
            console.log("No API keys to migrate.");
            return;
        }

        for (const apiKey of sourceListApiKeys.data) {
            const currentlyUsedSourceTenantApiKey =
                apiKey.token === this.securityMigrator.sourceTenantApiKey;
            if (currentlyUsedSourceTenantApiKey) {
                continue;
            }

            const alreadyExists = targetListApiKeys.data.some(
                (m: Record<string, any>) => m.id === apiKey.id
            );

            if (alreadyExists) {
                console.log(`API key "${apiKey.name}" already exists in the target environment.`);
                continue;
            }

            console.log(`Migrating API key "${apiKey.name}"...`);

            // Migrate apiKey items.
            const res = await targetGqlClient.run(CREATE_API_KEY, {
                data: {
                    id: apiKey.id,
                    token: apiKey.token,
                    name: apiKey.name,
                    description: apiKey.description,
                    permissions: apiKey.permissions
                }
            });

            const { error } = res.security.createApiKey;
            if (error) {
                console.log(`Failed to migrate API key "${apiKey.title}". Error:`, JSON.stringify(error));
            }
        }
    }
}

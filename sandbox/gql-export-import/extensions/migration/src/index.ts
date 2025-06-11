import {
    createContextPlugin,
    createGraphQLSchemaPlugin,
    InstallTenant
} from "@webiny/api-serverless-cms";

export const createExtension = () => {
    return [
        createGraphQLSchemaPlugin({
            typeDefs: /* GraphQL */ `
                extend type TenancyMutation {
                    installTenant(tenantId: ID!): TenantResponse
                }
            `,
            resolvers: {
                TenancyMutation: {
                    installTenant: async (_, args, context) => {
                        const tenant = await context.tenancy.getTenantById(args.tenantId);
                        if (!tenant) {
                            throw new Error(`Tenant "${args.tenantId}" not found.`);
                        }

                        const installTenant = new InstallTenant(context);
                        await installTenant.execute(tenant, {
                            i18n: { defaultLocaleCode: "en-US" }
                        });
                        return tenant;
                    }
                }
            }
        }),
        // This plugin adds an API key authenticator that allows us to authenticate
        // using a specific API key for migration purposes. We needed this basically
        // to be able to run migrations against multiple tenants without having to
        // create a separate API key for each tenant.
        // This plugin can be removed once the migration is complete❗
        createContextPlugin(ctx => {
            ctx.security.addAuthenticator(async token => {
                if (token !== process.env.WEBINY_MIGRATION_TARGET_API_KEY) {
                    return null;
                }

                return {
                    id: 'migration-global-api-key',
                    displayName: "Migration API Key (Global)",
                    type: "api-key",
                    permissions: [{ name: "*" }]
                };
            });
        })
    ];
};

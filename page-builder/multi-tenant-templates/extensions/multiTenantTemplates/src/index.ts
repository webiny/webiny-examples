import { createContextPlugin } from "@webiny/api-serverless-cms";

export const createExtension = () => {
    return [
        createContextPlugin(async context => {
            const { pageBuilder, security, tenancy } = context;

            const copyPageTemplates = async () => {
                // Copy page templates that are used for page generation.
                const templates = await tenancy.withRootTenant(() => {
                    return pageBuilder.listPageTemplates();
                });

                for (const template of templates) {
                    await pageBuilder.createPageTemplate({
                        id: template.id,
                        title: template.title,
                        slug: template.slug,
                        description: template.description,
                        pageCategory: "static",
                        tags: template.tags,
                        layout: template.layout,
                        content: template.content
                    });
                }
            };

            // Hook into Headless CMS installation event; this is the last application that gets installed
            // during tenant setup, and at this point we can start copying/inserting new data into the system.
            pageBuilder.onSystemAfterInstall.subscribe(async () => {
                const currentTenant = tenancy.getCurrentTenant();
                if (currentTenant.id === "root") {
                    // We don't do anything on root tenant install.
                    return;
                }

                await security.withoutAuthorization(async () => {
                    await copyPageTemplates();
                });
            });

            pageBuilder.onPageTemplateAfterCreate.subscribe(async event => {
                // We don't want to trigger this logic for tenants that are not the root tenant.
                const currentTenant = tenancy.getCurrentTenant();
                if (currentTenant.id !== "root") {
                    return;
                }

                const tenantsList = await tenancy.listTenants();
                const nonRootTenantsList = tenantsList.filter(t => t.id !== "root");

                const template = event.pageTemplate;

                await tenancy.withEachTenant(nonRootTenantsList, async tenant => {
                    await tenancy.withTenant(tenant, async () => {
                        await pageBuilder.createPageTemplate({
                            id: template.id,
                            title: template.title,
                            slug: template.slug,
                            description: template.description,
                            tags: template.tags,
                            layout: template.layout,
                            pageCategory: template.pageCategory,
                            content: template.content
                        });
                    });
                });
            });
        })
    ];
};

import { ContextPlugin } from "@webiny/api";
import { ContentModule, WebsiteContext } from "../types";

export const onTenantAfterInstall = (modules: ContentModule[]) => {
    return new ContextPlugin<WebsiteContext>(async ({ cms, pageBuilder, security, tenancy }) => {
        const withoutAuthorization = async (cb: () => Promise<void>) => {
            security.disableAuthorization();
            await cb();
            security.enableAuthorization();
        };

        const withRootTenant = async <T>(cb: () => T): Promise<T> => {
            const initialTenant = tenancy.getCurrentTenant();
            const rootTenant = await tenancy.getRootTenant();
            tenancy.setCurrentTenant(rootTenant);
            try {
                return await cb();
            } finally {
                // Make sure that, whatever happens in the callback, the tenant is set back to the initial one.
                tenancy.setCurrentTenant(initialTenant);
            }
        };

        const copyPageTemplates = async () => {
            // Copy page templates that are used for page generation.
            const templates = await withRootTenant(() => pageBuilder.listPageTemplates());
            const moduleTemplates = templates.filter(template => {
                return modules.some(module => module.pageTemplateSlug === template.slug);
            });

            for (const template of moduleTemplates) {
                await pageBuilder.createPageTemplate({
                    id: template.id,
                    title: template.title,
                    slug: template.slug,
                    description: template.description,
                    tags: template.tags,
                    layout: template.layout,
                    content: template.content
                });
            }
        };

        // POINT OF INTEREST:
        // This function copies default pages to the new tenant.
        // Modify this to fit your business logic.
        const copyDefaultPages = async () => {
            const defaultModulePages = modules
                .map(module => module.defaultPages || [])
                .flat()
                .filter(Boolean) as Array<`/${string}`>;

            const defaultPagePaths: Array<`/${string}`> = [
                "/login",
                "/create-an-account",
                ...defaultModulePages
            ];

            for (const path of defaultPagePaths) {
                try {
                    const rootPage = await withRootTenant(() =>
                        pageBuilder.getPublishedPageByPath({ path })
                    );

                    if (!rootPage) {
                        console.log(`Root page "${path}" was not found!`);
                        continue;
                    }

                    // Create new empty page.
                    const newPage = await pageBuilder.createPage(rootPage.category);

                    // Update page with the content from the root tenant page.
                    await pageBuilder.updatePage(newPage.id, {
                        title: rootPage.title,
                        content: rootPage.content,
                        settings: rootPage.settings,
                        path: rootPage.path
                    });

                    // Optionally, publish the new pages, or let the tenant admin configure and publish the
                    // pages when they're ready.
                    await pageBuilder.publishPage(newPage.id);
                } catch (err) {
                    console.log(`Couldn't copy page "${path}"!`, err.message);
                    continue;
                }
            }
        };

        const copyContentModulePages = async (modules: ContentModule[]) => {
            for (const module of modules) {
                const [pages /*meta*/] = await withRootTenant(() => {
                    // TODO: add pagination!
                    // List method returns a limited dataset, so make sure you add "pagination" using the "after" cursor.
                    // Webiny uses cursor-based pagination, and we only support the "after" cursor, which is also
                    // a technical limitation of the Elasticsearch.
                    return pageBuilder.listPublishedPages({
                        limit: 100,
                        where: { tags: { query: module.pageTags, rule: "all" } }
                    });
                });

                for (const page of pages) {
                    try {
                        // Create new empty page.
                        const newPage = await pageBuilder.createPage(page.category);

                        // Update page with the content from the root tenant page.
                        await pageBuilder.updatePage(newPage.id, {
                            title: page.title,
                            content: page.content,
                            settings: page.settings,
                            path: page.path
                        });

                        await pageBuilder.publishPage(newPage.id);
                    } catch (err) {
                        console.log(`Couldn't copy page "${page.path}"!`, err.message);
                        continue;
                    }
                }
            }
        };

        // Hook into Headless CMS installation event; this is the last application that gets installed
        // during tenant setup, and at this point we can start copying/inserting new data into the system.
        cms.onSystemAfterInstall.subscribe(async () => {
            const currentTenant = tenancy.getCurrentTenant();
            if (currentTenant.id === "root") {
                // We don't do anything on root tenant install.
                return;
            }

            await withoutAuthorization(async () => {
                await copyPageTemplates();

                // OUTSIDE THE SCOPE OF POC:
                // This same approach can be used to set up every tenant, and insert initial data:
                // - login / signup pages
                // - existing articles / news
                // - ...anything else...

                // To get you started, we created an example of copying of default pages (login, signup, module list pages)..
                await copyDefaultPages();
                // ... as well as content module pages
                await copyContentModulePages(modules);
            });
        });
    });
};

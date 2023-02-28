import { ContextPlugin } from "@webiny/api";
import { Tenant } from "@webiny/api-tenancy/types";
import { PageContentWithTemplate, PageTemplateVariable } from "@webiny/api-page-builder/types";
import { NotFoundError } from "@webiny/handler-graphql";
import { ContentModule, WebsiteContext } from "../types";

function setVariableValueByLabel(
    content: PageContentWithTemplate,
    label: string,
    value: any
): void {
    const blocks: PageTemplateVariable[] = content.data.template.variables || [];

    for (const block of blocks) {
        const variable = (block.variables || []).find(tplVar => tplVar.label === label);

        if (variable) {
            variable.value = value;
        }
    }
}

export const onEntryAfterPublish = (modules: ContentModule[] = []) => {
    return new ContextPlugin<WebsiteContext>(({ cms, pageBuilder, security, tenancy }) => {
        const withoutAuthorization = async (cb: () => Promise<void>) => {
            security.disableAuthorization();
            await cb();
            security.enableAuthorization();
        };

        // POINT OF INTEREST:
        // This helper function will execute your callback and take care of context switching between tenants.
        const withEachTenant = async (tenants: Tenant[], cb: (tenant: Tenant) => Promise<void>) => {
            const initialTenant = tenancy.getCurrentTenant();
            for (const tenant of tenants) {
                tenancy.setCurrentTenant(tenant);
                await cb(tenant);
                tenancy.setCurrentTenant(initialTenant);
            }
        };

        const createPageRevision = async (path: string) => {
            try {
                const existingPage = await pageBuilder.getPublishedPageByPath({ path });

                return pageBuilder.createPageFrom(existingPage.id);
            } catch (err) {
                if (err instanceof NotFoundError) {
                    // This means the page doesn't exist yet; create a new page.
                    return pageBuilder.createPage("static");
                } else {
                    console.log(`Unable to create a new page for "${path}"`, err.message);
                    return;
                }
            }
        };

        const getTemplateBySlug = async (slug: string) => {
            try {
                return await pageBuilder.getPageTemplate({ where: { slug } });
            } catch (err) {
                console.log(`getTemplateBySlug: ${err.message}`);
                return null;
            }
        };

        cms.onEntryAfterPublish.subscribe(async ({ model, entry }) => {
            if (tenancy.getCurrentTenant().id !== "root") {
                // We only want to run the content propagation if it's executed by the "root" tenant.
                return;
            }

            // To be sure that we don't run into issues with user's permissions, since this is a background process,
            // we can safely disable authorization for the duration of this callback.
            await withoutAuthorization(async () => {
                const module = modules.find(module => module.contentModelId === model.modelId);

                if (!module) {
                    console.log(
                        `Model "${model.modelId}" doesn't have a corresponding content module defined!`
                    );
                    return;
                }

                const tenants = await tenancy.listTenants();

                await withEachTenant(tenants, async tenant => {
                    const template = await getTemplateBySlug(module.pageTemplateSlug);

                    if (!template) {
                        console.log(
                            `Page template with slug "${module.pageTemplateSlug}" was not found on tenant "${tenant.name}!"`
                        );
                        return;
                    }

                    // Generate page path, which will be used to determine if the page already exists.
                    const path = module.articlePath(entry);
                    const newPage = await createPageRevision(path);

                    if (!newPage) {
                        return;
                    }

                    // Copy relevant data from current template to the new page revision.
                    pageBuilder.copyTemplateDataToPage(template, newPage);

                    // POINT OF INTEREST:
                    // The following code does the actual mapping of Headless CMS data to a static page created from the
                    // template defined on the content entry.
                    const content = newPage.content as PageContentWithTemplate;
                    const settings = newPage.settings;

                    setVariableValueByLabel(content, "entry.title", entry.values["title"]);
                    setVariableValueByLabel(content, "entry.content", entry.values["content"]);

                    newPage.path = path;

                    if (settings.general) {
                        settings.general.snippet = entry.values["snippet"] || "";
                        settings.general.tags = [
                            ...(entry.values["tags"] || []),
                            ...module.pageTags
                        ];

                        if (entry.values["coverImage"]) {
                            settings.general.image = {
                                id: "unknown",
                                src: entry.values["coverImage"]
                            };
                        }
                    }

                    if (settings.seo) {
                        settings.seo.title = entry.values["title"];
                        settings.seo.description = entry.values["snippet"] || "";
                    }

                    // Save changes
                    await pageBuilder.updatePage(newPage.id, {
                        title: entry.values["title"],
                        content,
                        settings,
                        path
                    });

                    // Publish revision (this also triggers page prerendering).
                    await pageBuilder.publishPage(newPage.id);

                    // Re-render the module homepage.
                    if (module.homepage) {
                        await pageBuilder.prerendering.render({
                            paths: [{ path: module.homepage }]
                        });
                    }
                });
            });
        });
    });
};

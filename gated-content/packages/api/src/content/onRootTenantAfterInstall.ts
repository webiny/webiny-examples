import { ContextPlugin } from "@webiny/api";
import { createPageTemplateData } from "./initialData/createPageTemplate";
import { contentModels } from "./initialData/contentModels";
import { pages } from "./initialData/defaultPages";
import { WebsiteContext } from "../types";

export const onRootTenantAfterInstall = () => {
    return new ContextPlugin<WebsiteContext>(async ({ cms, pageBuilder, tenancy }) => {
        // Setup initial Page Builder data.
        pageBuilder.onSystemAfterInstall.subscribe(async () => {
            if (tenancy.getCurrentTenant().id !== "root") {
                return;
            }

            const templates = [
                createPageTemplateData({
                    title: "Static Page",
                    slug: "static-page",
                    description: "Template for static pages"
                }),
                createPageTemplateData({
                    title: "Article Page",
                    slug: "article",
                    description: "Template for articles"
                }),
                createPageTemplateData({
                    title: "News Page",
                    slug: "news",
                    description: "Template for news"
                })
            ];

            // Create default page templates
            for (const template of templates) {
                await pageBuilder.createPageTemplate(template);
            }

            // Create default pages
            for (const page of pages) {
                const newPage = await pageBuilder.createPage("static");
                await pageBuilder.updatePage(newPage.id, page);
                await pageBuilder.publishPage(newPage.id);
            }
        });

        // Setup initial Headless CMS data.
        cms.onSystemAfterInstall.subscribe(async () => {
            if (tenancy.getCurrentTenant().id !== "root") {
                return;
            }

            // Create default content models
            const [group] = await cms.listGroups();
            for (const model of contentModels) {
                await cms.createModel({ ...model, group: group.id });
            }
        });
    });
};

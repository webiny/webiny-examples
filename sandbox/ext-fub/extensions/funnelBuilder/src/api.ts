import { createContextPlugin } from "@webiny/api-serverless-cms";
import { createInitialPageContent } from "./backend/api/createInitialPageContent";
import { createModelGroup } from "./backend/api/contentModelGroup";
import { createThemeSettingsModel } from "./backend/api/createThemeSettingsModel";
import { getThemeSettings } from "./backend/api/getThemeSettings";

export const createExtension = () => {
    return [
        createModelGroup(),
        createThemeSettingsModel(),
        getThemeSettings(),
        createContextPlugin(ctx => {
            ctx.pageBuilder.onPageBeforeCreate.subscribe(async ({ page }) => {
                // Ensure funnel builder is immediately added to the page content.
                page.content = createInitialPageContent();
            });
        })
    ];
};

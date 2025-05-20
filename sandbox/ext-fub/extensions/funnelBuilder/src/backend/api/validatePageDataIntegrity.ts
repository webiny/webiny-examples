import { createContextPlugin } from "@webiny/api-serverless-cms";
import { WebinyError } from "@webiny/error";
import { PageDataIntegrityValidator } from "../../shared/PageDataIntegrityValidator";
import { PbPage } from "../../shared/types";

export const validatePageDataIntegrity = () => {
    return createContextPlugin(ctx => {
        ctx.pageBuilder.onPageBeforeUpdate.subscribe(async ({ page }) => {
            // If the PB app is not yet installed, we don't need to validate the page data.
            const isInstalled = !!(await ctx.pageBuilder.getSystemVersion());
            if (!isInstalled) {
                return;
            }

            // @ts-ignore Incompatible types. Safe to ignore.
            const result = PageDataIntegrityValidator.validate(page as PbPage);
            if (!result.isValid) {
                throw new WebinyError(
                    result.errorMessage,
                    PageDataIntegrityValidator.PAGE_DATA_INTEGRITY_VALIDATION_ERROR,
                    result.data
                );
            }
        });
    });
};

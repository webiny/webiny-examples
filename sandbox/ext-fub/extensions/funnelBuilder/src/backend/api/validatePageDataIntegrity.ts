import { createContextPlugin } from "@webiny/api-serverless-cms";
import { WebinyError } from "@webiny/error";
import { PageDataIntegrityValidator } from "../../shared/PageDataIntegrityValidator";
import { PbPage } from "../../shared/types";

export const validatePageDataIntegrity = () => {
    return createContextPlugin(ctx => {
        ctx.pageBuilder.onPageBeforeUpdate.subscribe(async ({ page }) => {
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

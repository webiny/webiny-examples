import { createContextPlugin, Context } from "@webiny/api-serverless-cms";
import { WebinyError } from "@webiny/error";
import { PageDataIntegrityValidator } from "../../shared/PageDataIntegrityValidator";
import { PbPage } from "../../shared/types";

const validatePageDataIntegrityPlugin = async (ctx: Context, page: PbPage) => {
  // If the PB app is not yet installed, we don't need to validate the page data.
  const isInstalled = !!(await ctx.pageBuilder.getSystemVersion());
  if (!isInstalled) {
    return;
  }

  const result = PageDataIntegrityValidator.validate(page);
  if (!result.isValid) {
    throw new WebinyError(
      result.errorMessage,
      PageDataIntegrityValidator.PAGE_DATA_INTEGRITY_VALIDATION_ERROR,
      result.data
    );
  }
};

export const validatePageDataIntegrity = () => {
  return createContextPlugin(ctx => {
    ctx.pageBuilder.onPageBeforeUpdate.subscribe(async ({ page }) => {
      // @ts-ignore Incompatible types. Safe to ignore.
      await validatePageDataIntegrityPlugin(ctx, page as PbPage);
    });

    ctx.pageBuilder.onPageBeforePublish.subscribe(async ({ page }) => {
      // @ts-ignore Incompatible types. Safe to ignore.
      await validatePageDataIntegrityPlugin(ctx, page as PbPage);
    });
  });
};

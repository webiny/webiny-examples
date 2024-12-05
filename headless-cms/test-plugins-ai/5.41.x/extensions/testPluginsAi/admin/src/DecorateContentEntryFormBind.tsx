import { useBind } from "@webiny/form";
import { useModel, useModelField, useParentField } from "@webiny/app-headless-cms";
import { useFieldTracker } from "./FieldTracker";
import { useEffect } from "react";

/**
 * Decorator `useBind` hook that integrates field tracking for models.
 * In this example below we track rich-text fields and SEO-specific fields
 * ("seoTitle", "seoDescription", "seoMetaTags") of article model.
 * to trigger dynamic updates and interaction with external services.
 *
 * You can customise this decorator to track fields of other models or field types.
 */
export const DecorateContentEntryFormBind = useBind.createDecorator(baseHook => {
    const seoFields = ["seoTitle", "seoDescription", "seoMetaTags"];

    return params => {
        try {
            const { trackField } = useFieldTracker();

            const { field } = useModelField();
            const parent = useParentField();

            const { model } = useModel();

            // Skip tracking for non-article models
            if (model.modelId !== "article") {
                return baseHook(params);
            }

            const bind = baseHook(params);

            useEffect(() => {
                // Track rich-text fields and SEO fields
                if (field.type === "rich-text") {
                    trackField(field.label, field.type, params.name, bind.value, bind.onChange);
                }

                if (seoFields.includes(field.fieldId) && !parent) {
                    trackField(field.label, field.fieldId, params.name, bind.value, bind.onChange);
                }
            }, [bind.value]);

            return bind;
        } catch {
            return baseHook(params);
        }
    };
});

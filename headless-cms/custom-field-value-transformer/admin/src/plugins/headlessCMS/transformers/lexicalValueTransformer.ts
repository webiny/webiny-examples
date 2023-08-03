import {CmsFieldValueTransformer} from "@webiny/app-headless-cms-common/types";

export const lexicalValueTransformer = (): CmsFieldValueTransformer => ({
    type: "cms-field-value-transformer",
    name: "cms-field-lexical-value-transformer",
    fieldType: "rich-text",
    transform: (value: any) => {
        const newValue = { ...value, myOptimizedValue: { p: "text" } };
        return newValue;
    }
});

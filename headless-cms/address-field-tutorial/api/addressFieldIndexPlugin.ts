import {CmsModelFieldToElasticsearchPlugin} from "@webiny/api-headless-cms/types";


export default (): CmsModelFieldToElasticsearchPlugin => ({
    type: "cms-model-field-to-elastic-search",
    name: "cms-model-field-to-elastic-search-address",
    fieldType: "address",
    toIndex({field, toIndexEntry}) {
        const values = toIndexEntry.values;
        const value = values[field.fieldId];
        delete values[field.fieldId];
        return {
            values,
            rawValues: {
                ...(toIndexEntry.rawValues || {}),
                [field.fieldId]: value
            }
        };
    },
    fromIndex({ field, entry }) {
        const rawValues = entry.rawValues || {};
        const value = rawValues[field.fieldId];
        delete rawValues[field.fieldId];
        return {
            values: {
                ...(entry.values || {}),
                [field.fieldId]: value
            },
            rawValues
        };
    }
});
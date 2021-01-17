import {CmsModelFieldToStoragePlugin} from "@webiny/api-headless-cms/types";

const encrypt = value => value;
const decrypt = value => value;

export default (): CmsModelFieldToStoragePlugin => ({
    type: "cms-model-field-to-storage",
    name: "cms-model-field-to-storage-address",
    fieldType: "address",
    async fromStorage({ field, value }) {
        if (!value) {
            return value;
        } else if (typeof value !== "object") {
            throw new Error("It seems that value received is not an object.");
        } else if (!value.encryption) {
            throw new Error("Missing type of the encryption in the value object.");
        } else if (value.encryption !== "webiny") {
            throw new Error(`This plugin cannot transform something not encrypted with "webiny".`);
        }
        return decrypt(value.value);
    },
    async toStorage({ value }) {
        return {
            encryption: "webiny",
            value: encrypt(value)
        };
    }
});
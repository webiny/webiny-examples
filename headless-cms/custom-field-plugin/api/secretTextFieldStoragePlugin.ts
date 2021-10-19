import { CmsModelFieldToStoragePlugin } from "@webiny/api-headless-cms/types";
import cryptr from "cryptr";

export default (): CmsModelFieldToStoragePlugin<String> => ({
  type: "cms-model-field-to-storage",
  name: "cms-model-field-to-storage-address",
  fieldType: "secret-text",
  async toStorage({ value }) {
    const encryptText = new cryptr("myTotallySecretKey").encrypt(value);
    return {
      value: encryptText
    };
  },
  async fromStorage({ value }) {
    return new cryptr('myTotallySecretKey').decrypt(value.value)
  }
});
import { StorageTransformPlugin } from "@webiny/api-headless-cms/content/plugins/storage/StorageTransformPlugin";
import cryptr from "cryptr";

const plugin = new StorageTransformPlugin({
  fieldType: "secret-text",
  toStorage: async ({ value, field }) => {
    const encryptText = new cryptr("myTotallySecretKey").encrypt(value);
    return {
      value: encryptText
    };
  },
  fromStorage: async ({ value, field }) => {
    return new cryptr('myTotallySecretKey').decrypt(value.value)
  }
});

export default () => {
  return plugin;
};
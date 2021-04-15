import addressFieldPlugin from "./addressFieldPlugin";
import addressFieldStoragePlugin from "./addressFieldStoragePlugin";
import addressFieldIndexPlugin from "./addressFieldIndexPlugin";

export default () => [
    addressFieldPlugin(),
    addressFieldStoragePlugin(),
    addressFieldIndexPlugin(),
];
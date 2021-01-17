import addressFieldPlugin from "./addressFieldPlugin";
import addressFieldRendererPlugin from "./addressFieldRendererPlugin";

export default () => [
    addressFieldPlugin(),
    addressFieldRendererPlugin()
];
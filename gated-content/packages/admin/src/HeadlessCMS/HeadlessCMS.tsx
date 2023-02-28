import { plugins } from "@webiny/plugins";
import { tagsFieldRenderer } from "./tagsFieldRenderer";
import { pageTemplateFieldRenderer } from "./pageTemplateFieldRenderer";

export const HeadlessCMS = () => {
    plugins.register([pageTemplateFieldRenderer, tagsFieldRenderer]);
    return null;
};

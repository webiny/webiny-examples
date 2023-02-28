import set from "lodash/set";
import { useElementVariables } from "@webiny/api-page-builder/graphql";
import { ContextPlugin } from "@webiny/handler";
import { WebsiteContext } from "../types";

// POINT OF INTEREST:
// Element processors are used  when page data is returned from the API. This way, page content is ready to be rendered
// without extra processing on the client side. Elements that are connected to variables get their values injected using
// these element processors.
export const cmsRichTextProcessor = () => {
    return new ContextPlugin<WebsiteContext>(context => {
        context.pageBuilder.addPageElementProcessor(({ block, element }) => {
            if (element.type !== "cmsRichText") {
                return;
            }

            const variables = useElementVariables(block, element);
            const value = variables?.length > 0 ? variables[0].value : null;

            if (value !== null) {
                set(element, "data.cmsRichText", value);
            }
        });
    });
};

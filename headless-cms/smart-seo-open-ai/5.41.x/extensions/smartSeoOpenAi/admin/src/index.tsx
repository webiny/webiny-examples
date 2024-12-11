import React from "react";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { DecorateContentEntryForm } from "./DecorateContentEntryForm";
import { DecorateContentEntryFormBind} from "./DecorateContentEntryFormBind";
import { SmartSeo } from "./SmartSeo";

export const Extension = () => {
    return <>{/* Your code here. */}
        <DecorateContentEntryForm />
        <ContentEntryEditorConfig>
            <SmartSeo />
            <DecorateContentEntryFormBind />
        </ContentEntryEditorConfig>
    </>;
};

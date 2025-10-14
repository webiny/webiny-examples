import React from "react";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { CompareRevisionsMenuItem } from "./CompareRevisionsMenuItem";

// You can destructure child components to make the code more readable and easier to work with.
const { Actions } = ContentEntryEditorConfig;

export const Extension = () => {
    return (
        <>
            <ContentEntryEditorConfig>
                <Actions.MenuItemAction
                    name={"compare-entry-revisions"}
                    element={<CompareRevisionsMenuItem />}
                />
            </ContentEntryEditorConfig>
        </>
    );
};

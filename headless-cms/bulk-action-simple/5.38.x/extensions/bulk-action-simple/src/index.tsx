import React from "react";
import { useSnackbar } from "@webiny/app-admin";
import { ContentEntryListConfig } from "@webiny/app-headless-cms";
import { ReactComponent as CopyIcon } from "@material-design-icons/svg/outlined/content_copy.svg";

const { BulkAction } = ContentEntryListConfig.Browser;
const { useWorker, useButtons, useDialog } = BulkAction;

const ActionCopyJson = () => {
    // useButtons() exposes the button components also used internally: use these to keep the UI consistent.
    const { IconButton } = useButtons();
    // useWorker() exposes the currently selected items within the context.
    const { items } = useWorker();
    // showSnackbar allows to provide a feedback to users.
    const { showSnackbar } = useSnackbar();

    const copyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(items, null, 2));
        showSnackbar("JSON data copied to clipboard.");
    };

    return (
        <IconButton
            icon={<CopyIcon />}
            onAction={copyJson}
            label={`Copy as JSON`}
            tooltipPlacement={"bottom"}
        />
    );
};

export const Extension = () => {
    return (
        <>
            <ContentEntryListConfig>
                <BulkAction
                    name={"copy-json"}
                    element={<ActionCopyJson />}
                />
            </ContentEntryListConfig>
        </>
    );
};

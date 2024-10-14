import React from "react";
import { useSnackbar } from "@webiny/app-admin";
import { ContentEntryListConfig } from "@webiny/app-headless-cms";
import { ReactComponent as CopyIcon } from "@material-design-icons/svg/outlined/content_copy.svg";

const { BulkAction } = ContentEntryListConfig.Browser;
const { useWorker, useButtons, useDialog } = BulkAction;

const ActionCopyJson = () => {
    const { IconButton } = useButtons();
    const { showSnackbar } = useSnackbar();
    const worker = useWorker();

    const copyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(worker.items, null, 2));
        showSnackbar("JSON data copied to clipboard.");
    };

    return (
        <IconButton
            icon={<CopyIcon />}
            onAction={copyJson}
            label={`Copy as JSON`}
            tooltipPlacement={"bottom"}
            disabled={worker.isSelectedAll}
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

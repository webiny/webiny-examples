import React from "react";
import { ContentEntryListConfig } from "@webiny/app-headless-cms";
import { ReactComponent as SyncIcon } from "@material-design-icons/svg/outlined/sync.svg

const { BulkAction } = ContentEntryListConfig.Browser;
const { useWorker, useButtons, useDialog } = BulkAction;

const ActionSync = () => {
    const { IconButton } = useButtons();
    const worker = useWorker();
    const { showConfirmationDialog, showResultsDialog } = useDialog();

    const openSyncDialog = () =>
        showConfirmationDialog({
            title: "Sync",
            message: `You are about to sync the selected entries. Are you sure you want to continue?`,
            loadingLabel: `Processing`,
            execute: async () => {
                await worker.processInSeries(async ({ item, report }) => {
                    try {
                        const response = await fetch(
                            "https://any.url.com",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(item.id)
                            }
                        );

                        report.success({
                            title: item.meta.title,
                            message: `Entry successfully synced, response status: ${response.status}`
                        });
                    } catch (e) {
                        report.error({
                            title: item.meta.title,
                            message: e.message
                        });
                    }
                }, 5);

                worker.resetItems();

                showResultsDialog({
                    results: worker.results,
                    title: "Sync",
                    message: "Operation completed, here below you find the complete report:"
                });
            }
        });

    return (
        <IconButton
            icon={<SyncIcon />}
            onAction={openSyncDialog}
            label={"Sync"}
            tooltipPlacement={"bottom"}
        />
    );
};

export const Extension = () => {
    return (
        <>
            <ContentEntryListConfig>
                <BulkAction
                    name={"sync"}
                    element={<ActionSync />}
                />
            </ContentEntryListConfig>
        </>
    );
};

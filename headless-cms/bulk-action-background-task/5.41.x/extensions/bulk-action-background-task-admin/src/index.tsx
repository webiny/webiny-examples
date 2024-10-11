import React, { useCallback } from "react";
import { useRecords } from "@webiny/app-aco";
import { useSnackbar } from "@webiny/app-admin";
import { ContentEntryListConfig, useCms, useModel } from "@webiny/app-headless-cms";
import { getUpdatedTag } from "@demo/bulk-action-background-task-shared"
import { ReactComponent as CalendarIcon } from "@material-design-icons/svg/outlined/calendar_month.svg";

const { BulkAction } = ContentEntryListConfig.Browser;
const { useWorker, useButtons, useDialog } = BulkAction;

const ActionUpdateYear = () => {
    const { IconButton } = useButtons();
    const worker = useWorker();
    const { showConfirmationDialog, showResultsDialog } = useDialog();
    const { model } = useModel();
    const { createEntryRevisionFrom } = useCms();
    const { updateRecordInCache } = useRecords();
    const { showSnackbar } = useSnackbar();

    const openUpdateYearDialog = () =>
        showConfirmationDialog({
            title: "Update year",
            message: "You are about to update the year for the selected entries. Are you sure you want to continue?",
            loadingLabel: "Processing",
            execute: async () => {
                if (worker.isSelectedAll) {
                    await worker.processInBulk({ action: "UpdateYear" });
                    worker.resetItems();

                    showSnackbar(
                        "All entries will be updated. This process will be carried out in the background and may take some time.",
                        { dismissIcon: true, timeout: -1 }
                    );
                    return;
                }

                await worker.processInSeries(async ({ item, report }) => {
                    try {
                        const response = await createEntryRevisionFrom({
                            model,
                            id: item.id,
                            input: { title: getUpdatedTag() + item.title }
                        });

                        const { error } = response;
                        if (error) throw new Error(error.message || "Unknown error while publishing the entry");

                        updateRecordInCache(response.entry);

                        report.success({
                            title: item.meta.title,
                            message: "Entry successfully sent"
                        });
                    } catch (e) {
                        report.error({
                            title: item.meta.title,
                            message: e.message
                        });
                    }
                });

                worker.resetItems();

                showResultsDialog({
                    results: worker.results,
                    title: "Update year",
                    message: "Operation completed, here below you find the complete report:"
                });
            }
        });

    return (
        <IconButton
            icon={<CalendarIcon />}
            onAction={openUpdateYearDialog}
            label="Update year"
            tooltipPlacement="bottom"
        />
    );
};

export const Extension = () => {
    return (
        <>
            <ContentEntryListConfig>
                <BulkAction
                    name={"update-year"}
                    element={<ActionUpdateYear />}
                />
            </ContentEntryListConfig>
        </>
    );
};


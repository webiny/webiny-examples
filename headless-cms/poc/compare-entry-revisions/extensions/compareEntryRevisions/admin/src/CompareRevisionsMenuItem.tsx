import React from "react";
import { ReactComponent as CompareIcon } from "@material-design-icons/svg/filled/compare_arrows.svg";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { RevisionSelectionModal } from "./RevisionSelectionModal";
import { ComparisonModal } from "./ComparisonModal";
import { useRevisionComparison } from "./useRevisionComparison";

const { Actions } = ContentEntryEditorConfig;
const { useOptionsMenuItem } = Actions.MenuItemAction;

export const CompareRevisionsMenuItem = () => {
    // useOptionsMenuItem() exposes the menu item component, also used internally: use this to keep the UI consistent.
    const { OptionsMenuItem } = useOptionsMenuItem();

    // Get revisions from ContentEntryEditorConfig
    const { revisions } = ContentEntryEditorConfig.ContentEntry.useContentEntry();

    // Use our custom hook for all the comparison logic
    const {
        loading,
        modalOpen,
        selectedRevisions,
        comparisonModalOpen,
        comparisonData,
        openRevisionsModal,
        closeModal,
        closeComparisonModal,
        handleRevisionSelection,
        compareRevisions,

    } = useRevisionComparison();

    return (
        <>
            <OptionsMenuItem
                onAction={openRevisionsModal}
                label="Compare Entry Revisions"
                icon={<CompareIcon />}
                disabled={loading}
            />
            
            <RevisionSelectionModal
                open={modalOpen}
                onClose={closeModal}
                revisions={revisions}
                selectedRevisions={selectedRevisions}
                onRevisionSelection={handleRevisionSelection}
                onCompareRevisions={() => compareRevisions(revisions)}
                loading={loading}
            />

            <ComparisonModal
                open={comparisonModalOpen}
                onClose={closeComparisonModal}
                comparisonData={comparisonData}

            />
        </>
    );
};

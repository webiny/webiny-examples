import { useState } from "react";
import { useApolloClient } from "@webiny/app-headless-cms";
import { useSnackbar } from "@webiny/app-admin";
import { COMPARE_ENTRY_REVISIONS_QUERY } from "./queries";
import { Revision, ComparisonData } from "./types";

export const useRevisionComparison = () => {
    const client = useApolloClient();
    const { showSnackbar } = useSnackbar();
    
    // State management
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRevisions, setSelectedRevisions] = useState<string[]>([]);
    const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
    const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);

    // Modal control functions
    const openRevisionsModal = () => {
        setModalOpen(true);
        setSelectedRevisions([]);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedRevisions([]);
    };

    const closeComparisonModal = () => {
        setComparisonModalOpen(false);
        setComparisonData(null);
    };

    // Revision selection logic
    const handleRevisionSelection = (revisionId: string) => {
        setSelectedRevisions(prev => {
            if (prev.includes(revisionId)) {
                // Remove if already selected
                return prev.filter(id => id !== revisionId);
            } else if (prev.length < 2) {
                // Add if less than 2 selected
                return [...prev, revisionId];
            } else {
                // Replace the first selection if 2 are already selected
                return [prev[1], revisionId];
            }
        });
    };

    // Main comparison function using revision IDs
    const compareRevisions = async (revisions: Revision[], modelId: string = "blogPost") => {
        if (selectedRevisions.length !== 2) {
            showSnackbar("Please select exactly 2 revisions to compare.");
            return;
        }

        setLoading(true);
        try {
            const [revisionId1, revisionId2] = selectedRevisions;

            const { data } = await client.query({
                query: COMPARE_ENTRY_REVISIONS_QUERY,
                variables: {
                    input: {
                        revisionId1,
                        revisionId2,
                        modelId
                    }
                }
            });

            const comparisonResult = data?.compareEntryRevisions;
            if (!comparisonResult) {
                console.error("Invalid response received from compareEntryRevisions.");
                showSnackbar("No valid comparison data received.");
                return;
            }

            setComparisonData(comparisonResult);
            setComparisonModalOpen(true);
            closeModal();

        } catch (err) {
            console.error("Error comparing revisions:", err);
            showSnackbar("Failed to compare revisions. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    return {
        // State
        loading,
        modalOpen,
        selectedRevisions,
        comparisonModalOpen,
        comparisonData,

        // Functions
        openRevisionsModal,
        closeModal,
        closeComparisonModal,
        handleRevisionSelection,
        compareRevisions
    };
};

// Import Webiny's actual revision type
import { CmsContentEntryRevision } from "@webiny/app-headless-cms/types";

// Extend Webiny's type to include properties we need that might not be in the base type
export interface Revision extends CmsContentEntryRevision {
    // Add properties that we use but might not be in the base type
    status?: string;
    createdOn?: string;
    // Note: savedOn already exists in CmsContentEntryRevision, so we don't redefine it
    // Add any other custom fields here if needed
}

// Helper function to get the creation date from revision
export const getRevisionDate = (revision: Revision): string => {
    // Try createdOn first (if it exists), then savedOn (which should exist), then fallback
    return revision.createdOn || revision.savedOn || new Date().toISOString();
};



export interface ComparisonData {
    html: string;
    summary: string;
}

export interface CompareRevisionsInput {
    revisionId1: string;
    revisionId2: string;
    modelId: string;
}

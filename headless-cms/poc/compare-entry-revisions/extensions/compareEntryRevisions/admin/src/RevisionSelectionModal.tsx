import React from "react";
import { Dialog } from "@webiny/ui/Dialog";
import { ButtonDefault, ButtonPrimary } from "@webiny/ui/Button";
import { Typography } from "@webiny/ui/Typography";
import { Date } from "@webiny/ui/DateTime";
import {
    TableContainer,
    Table,
    TableHeader,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
    CompareButtonContainer,
    SelectionInfo
} from "./styles";
import { Revision, getRevisionDate } from "./types";

interface RevisionSelectionModalProps {
    open: boolean;
    onClose: () => void;
    revisions: Revision[];
    selectedRevisions: string[];
    onRevisionSelection: (revisionId: string) => void;
    onCompareRevisions: () => void;
    loading: boolean;
}

const statuses = {
    draft: "Draft",
    published: "Published",
    unpublished: "Unpublished"
};


export const RevisionSelectionModal: React.FC<RevisionSelectionModalProps> = ({
    open,
    onClose,
    revisions,
    selectedRevisions,
    onRevisionSelection,
    onCompareRevisions,
    loading
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <div style={{ padding: "24px" }}>
                <Typography use="headline6" style={{ marginBottom: "16px" }}>
                    Select Revisions to Compare
                </Typography>
                <Typography use="body1" style={{ marginBottom: "16px" }}>
                    Select exactly 2 revisions to compare:
                </Typography>

            {revisions && revisions.length > 0 ? (
                <>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderCell></TableHeaderCell>
                                    <TableHeaderCell>Title</TableHeaderCell>
                                    <TableHeaderCell>Status</TableHeaderCell>
                                    <TableHeaderCell>Last modified</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {revisions.map((revision: Revision, index: number) => (
                                    <TableRow 
                                        key={revision.id || index}
                                        selected={selectedRevisions.includes(revision.id)}
                                    >
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                checked={selectedRevisions.includes(revision.id)}
                                                onChange={() => onRevisionSelection(revision.id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {revision.meta.title}
                                        </TableCell>
                                        <TableCell>
                                            {statuses[revision.meta.status]}
                                        </TableCell>
                                        <TableCell>
                                            <Date date={revision.revisionSavedOn} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <CompareButtonContainer>
                        <SelectionInfo>
                            {selectedRevisions.length} of 2 revisions selected
                        </SelectionInfo>

                    </CompareButtonContainer>
                </>
            ) : (
                <Typography use="body1">
                    No revisions found for this entry.
                </Typography>
            )}

            <div style={{ padding: "16px 24px", borderTop: "1px solid #e0e0e0", display: "flex", justifyContent: "flex-end" }}>
                <ButtonPrimary
                    onClick={onCompareRevisions}
                    disabled={loading || selectedRevisions.length !== 2}
                >
                    {loading ? "Comparing..." : "Compare Revisions"}
                </ButtonPrimary>
            </div>
            </div>
        </Dialog>
    );
};

import React from "react";
import { Dialog } from "@webiny/ui/Dialog";
import { ButtonDefault } from "@webiny/ui/Button";
import { Typography } from "@webiny/ui/Typography";
import { ComparisonData } from "./types";
import styled from "@emotion/styled";

const HtmlContainer = styled.div`
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 16px;
    max-height: 60vh;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    /* Comparison report styling */
    .comparison-report {
        h2, h3 {
            color: #333;
            margin: 0 0 16px 0;
            font-size: 1.25rem;
            font-weight: 600;
        }
    }

    /* Table styling */
    .comparison-table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        font-size: 14px;

        th {
            background-color: #f8f9fa;
            color: #495057;
            font-weight: 600;
            padding: 12px 8px;
            text-align: left;
            border: 1px solid #dee2e6;
        }

        td {
            padding: 12px 8px;
            border: 1px solid #dee2e6;
            vertical-align: top;

            strong {
                color: #495057;
                font-weight: 600;
            }
        }

        tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }

        tbody tr:hover {
            background-color: #e9ecef;
        }
    }

    /* No changes styling */
    .no-changes {
        text-align: center;
        padding: 32px;
        color: #6c757d;

        h3 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 500;
        }
    }

    /* Code and JSON styling */
    code {
        background-color: #f1f3f4;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 13px;
    }
`;

interface ComparisonModalProps {
    open: boolean;
    onClose: () => void;
    comparisonData: ComparisonData | null;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
    open,
    onClose,
    comparisonData
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <div style={{ padding: "24px", maxHeight: "80vh", overflowY: "auto" }}>
                <Typography use="headline6" style={{ marginBottom: "16px" }}>
                    Revision Comparison Results
                </Typography>
                
                {comparisonData && (
                    <HtmlContainer
                        dangerouslySetInnerHTML={{ __html: comparisonData.html }}
                    />
                )}
            </div>
            
            <div style={{ padding: "16px 24px", borderTop: "1px solid #e0e0e0", display: "flex", justifyContent: "flex-end" }}>
                <ButtonDefault onClick={onClose}>
                    Close
                </ButtonDefault>
            </div>
        </Dialog>
    );
};

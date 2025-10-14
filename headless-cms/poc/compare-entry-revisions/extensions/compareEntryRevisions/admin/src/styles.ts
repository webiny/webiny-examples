import styled from "@emotion/styled";

// Styled components for the revision data table
export const TableContainer = styled.div`
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: white;
`;

export const TableHeader = styled.thead`
    background-color: #f5f5f5;
    position: sticky;
    top: 0;
    z-index: 1;
`;

export const TableHeaderCell = styled.th`
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid #e0e0e0;
    font-weight: 600;
    font-size: 14px;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ selected?: boolean }>`
    background-color: ${props => props.selected ? '#e3f2fd' : 'white'};
    &:hover {
        background-color: ${props => props.selected ? '#e3f2fd' : '#f9f9f9'};
    }
    border-bottom: 1px solid #e0e0e0;
`;

export const TableCell = styled.td`
    padding: 12px;
    font-size: 14px;
    vertical-align: middle;
`;

export const CompareButtonContainer = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SelectionInfo = styled.div`
    font-size: 14px;
    color: #666;
`;

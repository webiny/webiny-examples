import styled from "@emotion/styled";

export const Table = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

export const Heading = styled.div`
    display: flex;
`;

export const Row = styled.div`
    display: flex;
    :last-of-type {
        border-bottom: 1px solid rgba(212, 212, 212, 0.5);
    }
`;

export const Cell = styled.div<{ color?: string }>`
    flex: 1;
    border: 1px solid rgba(212, 212, 212, 0.5);
    border-collapse: collapse;
    padding: 10px;
    border-bottom: none;
    :nth-of-type(1) {
        border-right: none;
    }
    :nth-of-type(2) {
        border-left: 10px solid ${props => props.color ?? "none"};
        border-right: 1px solid rgba(212, 212, 212, 0.5);
    }
`;

export const HeadingCell = styled(Cell)`
    align-content: center;
`;

export const ScrollList = styled.div`
    overflow: auto;
    height: calc(100vh - 125px);
`;

import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@webiny/ui/Typography";

const StyledPreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;

export interface ToolbarPreviewProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
}

export const ElementToolbarPreview = ({ icon, title, description }: ToolbarPreviewProps) => (
    <StyledPreview>
        {icon}
        <Typography use={"headline6"}>{title}</Typography>
        <Typography use={"body2"}>{description}</Typography>
    </StyledPreview>
);

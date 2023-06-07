import React from "react";
import { createRenderer } from "@webiny/app-page-builder-elements";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
    h1 {
        ${props => props.theme.styles.typography.headings.stylesById("heading1")}
    }

    p {
        ${props => props.theme.styles.typography.paragraphs.stylesById("paragraph1")}
    }
`;

// The renderer React component.
export const DroppableElement2 = createRenderer(() => {
    return (
        <Wrapper>
            <h1>Droppable Element 2</h1>
            <p>This is droppable element 2.</p>
        </Wrapper>
    );
});

import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div<Pick<IconProps, "disabled" | "size">>`
    cursor: pointer;
    fill: var(--mdc-theme-text-secondary-on-background);
    ${({ disabled }) => {
        if (disabled) {
            return `
                cursor: not-allowed;
                pointer-events: none;
                opacity: 0.7;
            `;
        }
        return "";
    }}
    svg {
        height: ${({ size = 20 }) => size}px;
        width: ${({ size = 20 }) => size}px;
    }
`;

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
    element: React.ReactNode;
    size?: number;
    disabled?: boolean;
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(({ element, ...props }, ref) => {
    return (
        <Wrapper {...props} ref={ref}>
            {element}
        </Wrapper>
    );
});

Icon.displayName = "Icon";

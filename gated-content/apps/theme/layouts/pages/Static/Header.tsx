import React from "react";
import { HeaderDesktop } from "./HeaderDesktop";
import styled from "@emotion/styled";

import { colors, typography } from "theme/theme";

export const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <HeaderDesktop />
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.header`
    background-color: #fff;
    box-shadow: 0 0 1px 1px rgb(34 45 57 / 15%);
    height: 40px;
    padding: 10px 0 5px;
    width: 100%;
    z-index: 100;

    position: sticky;
    top: 0;

    a {
        ${typography.paragraph1}
        color: ${colors.color1};
        text-decoration: none;
    }
`;

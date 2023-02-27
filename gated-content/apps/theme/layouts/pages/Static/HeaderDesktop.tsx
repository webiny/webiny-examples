import React from "react";
import styled from "@emotion/styled";
import { usePage } from "@webiny/app-page-builder-elements";
import { Link } from "@webiny/react-router";
import { Menu } from "@webiny/app-website";
import { fonts, breakpoints } from "theme/theme";
import { Navigation } from "./Navigation";
import { ModuleNavigation, UserInfo } from "@demo/website";

export const HeaderDesktop: React.FC = () => {
    const { layoutProps } = usePage();
    const { settings } = layoutProps;
    const { name, logo } = settings;

    return (
        <HeaderDesktopWrapper data-testid={"pb-desktop-header"}>
            <ModuleNavigation />
            <div>
                <Link to="/">
                    {logo && logo.src && <img src={logo.src} alt={name} />}{" "}
                    {(!logo || !logo.src) && <span>{name}</span>}
                </Link>
            </div>
            <nav>
                <Menu slug={"main-menu"} component={Navigation} />
            </nav>
            <UserInfo />
        </HeaderDesktopWrapper>
    );
};

const HeaderDesktopWrapper = styled.div`
    align-items: center;
    display: flex;
    height: 35px;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1200px;

    ${breakpoints.tablet} {
        display: none;
    }

    > div {
        img {
            max-height: 30px;
        }
    }

    > nav {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        flex: 1;
        font-family: ${fonts.font1};
    }
`;

import React from "react";
import { Link, useLocation } from "@webiny/react-router";
import styled from "@emotion/styled";
import { useListLanguages, useTranslatedPathname } from "@demo/translations-website";
import { usePage } from "@webiny/app-page-builder-elements";
import { Menu } from "@webiny/app-website";
import { Navigation } from "./Navigation";

const LanguageSelector = styled.div`
    margin-left: 50px;
`

const LangLink = styled.span`
    padding: 5px;
    border-right: 1px solid gray;
    :last-of-type {
        border-right: none;
    }
`;

export const HeaderDesktop = () => {
    const { layoutProps } = usePage();
    const { languages } = useListLanguages();
    const { createPathname } = useTranslatedPathname();
    const location = useLocation();

    const { settings } = layoutProps;
    const { name, logo } = settings;

    return (
        <HeaderDesktopWrapper data-testid={"pb-desktop-header"}>
            <div>
                <Link to="/">
                    {logo && logo.src && <img src={logo.src} alt={name} />}{" "}
                    {(!logo || !logo.src) && <span>{name}</span>}
                </Link>
            </div>
            <LanguageSelector>
                {languages.map(lang => (
                    <LangLink key={lang.code}>
                        <Link to={createPathname(location.pathname, lang) + location.search}>
                            {lang.name}
                        </Link>
                    </LangLink>
                ))}
            </LanguageSelector>
            <nav>
                <Menu slug={"main-menu"} component={Navigation} />
            </nav>
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

    ${props => props.theme.breakpoints["tablet"]} {
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
    }
`;

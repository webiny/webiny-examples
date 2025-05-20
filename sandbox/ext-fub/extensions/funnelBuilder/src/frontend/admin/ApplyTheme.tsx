import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { AddLogo } from "@webiny/app-admin";
import { useThemeSettings } from "./ThemeSettingsProvider";

const Logo = styled.img`
    width: 100%;
    height: auto;
    max-width: 120px;
`;

export const ApplyTheme = () => {
    const { themeSettings } = useThemeSettings();

    useEffect(() => {
        if (!themeSettings?.theme) {
            return;
        }

        const headTag = document.getElementsByTagName("head")[0];
        const styleTag = document.createElement("style");

        styleTag.innerHTML = `
            body {
                --mdc-theme-primary: ${themeSettings.theme.primaryColor};
                --mdc-theme-secondary: ${themeSettings.theme.secondaryColor};
            }
            .mdc-top-app-bar.primary {
                background-color: ${themeSettings.theme.primaryColor};
            }
            
            .mdc-dialog .mdc-dialog__surface .mdc-dialog__title {
                background-color: ${themeSettings.theme.secondaryColor};
            }
        `;
        headTag.appendChild(styleTag);
    }, [themeSettings]);

    if (themeSettings?.theme?.logo) {
        return <AddLogo logo={<Logo src={themeSettings.theme.logo} />} />;
    }

    return null;
};

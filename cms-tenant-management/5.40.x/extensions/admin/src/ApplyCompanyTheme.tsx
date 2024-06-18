import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { AddLogo } from "@webiny/app-admin";
import { useCurrentCompany } from "./CurrentCompanyProvider";

const Logo = styled.img`
    width: 100%;
    height: auto;
    max-width: 120px;
`;

export const ApplyCompanyTheme = () => {
    const { company } = useCurrentCompany();

    useEffect(() => {
        const headTag = document.getElementsByTagName("head")[0];
        const styleTag = document.createElement("style");

        styleTag.innerHTML = `
            body {
                --mdc-theme-primary: ${company.theme.primaryColor};
                --mdc-theme-secondary: ${company.theme.secondaryColor};
            }
            .mdc-top-app-bar.primary {
                background-color: ${company.theme.primaryColor};
            }
            
            .mdc-dialog .mdc-dialog__surface .mdc-dialog__title {
                background-color: ${company.theme.secondaryColor};
            }
        `;
        headTag.appendChild(styleTag);
    }, [company]);

    if (company.theme.logo) {
        return <AddLogo logo={<Logo src={company.theme.logo} />} />;
    }

    return null;
};

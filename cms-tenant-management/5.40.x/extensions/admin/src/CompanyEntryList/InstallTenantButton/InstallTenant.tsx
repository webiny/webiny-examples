import React from "react";
import { ButtonPrimary } from "@webiny/ui/Button";
import { CompanyEntry } from "../../types";
import { useInstallTenant } from "./useInstallTenant";

interface InstallTenantProps {
    company: CompanyEntry;
}

export const InstallTenant = ({ company }: InstallTenantProps) => {
    const { installTenant, loading } = useInstallTenant(company);

    return (
        <ButtonPrimary onClick={installTenant} disabled={loading}>
            {loading ? "Installing..." : "Install"}
        </ButtonPrimary>
    );
};

import React, { useCallback } from "react";
import { useTenancy } from "@webiny/app-tenancy";
import { ButtonSecondary } from "@webiny/ui/Button";
import type { CompanyEntry } from "../types";

interface ManageTenantProps {
    company: CompanyEntry;
}

export const ManageTenant = ({ company }: ManageTenantProps) => {
    const { setTenant } = useTenancy();
    const switchToTenant = useCallback(() => {
        setTenant(company.entryId);
    }, [company]);

    return <ButtonSecondary onClick={switchToTenant}>Manage</ButtonSecondary>;
};

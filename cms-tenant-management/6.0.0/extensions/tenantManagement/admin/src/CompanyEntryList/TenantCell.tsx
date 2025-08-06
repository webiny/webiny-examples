import React from "react";
import { ContentEntryListConfig } from "@webiny/app-headless-cms";
import { CompanyEntry } from "../types";
import { InstallTenant } from "./InstallTenantButton/InstallTenant";
import { ManageTenant } from "./ManageTenant";

const { Browser } = ContentEntryListConfig;
const { useTableRow, isFolderRow } = Browser.Table.Column;

export const TenantCell = () => {
    // useTableRow() allows you to access the entire data of the current row.
    const { row } = useTableRow<CompanyEntry>();

    // isFolderRow() allows for custom rendering when the current row is a folder.
    if (isFolderRow(row)) {
        return <>{"-"}</>;
    }

    if (!row.isInstalled) {
        return <InstallTenant company={row} />;
    }

    return <ManageTenant company={row} />;
};

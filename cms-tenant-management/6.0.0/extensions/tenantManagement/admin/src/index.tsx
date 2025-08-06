import React from "react";
import { CompanyEntryList } from "./CompanyEntryList";
import { CurrentCompanyProvider } from "./CurrentCompanyProvider";
import { PagesList } from "./PagesList";
import { SimplifyNavigation } from "./SimplifyNavigation";
import { LayoutAndLogo } from "./LayoutAndLogo";

export const Extension = () => {
    return (
        <>
            <CurrentCompanyProvider />
            <CompanyEntryList />
            <PagesList />
            <SimplifyNavigation />
            <LayoutAndLogo />
        </>
    );
};

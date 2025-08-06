import React from "react";
import { CompanyEntryList } from "./CompanyEntryList";
import { CurrentCompanyProvider } from "./CurrentCompanyProvider";

export const Extension = () => {
  return (
    <>
      <CurrentCompanyProvider />
      <CompanyEntryList />
    </>
  );
};

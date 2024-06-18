import React from "react";
import { createProviderPlugin } from "@webiny/app-admin";
import { CircularProgress } from "@webiny/ui/Progress";
import { Company } from "@demo/shared";
import { useCurrentCompanyQuery } from "./useCurrentCompanyQuery";
import { ApplyCompanyTheme } from "./ApplyCompanyTheme";

export interface CurrentCompany {
    company: Company;
}

const CurrentCompanyContext = React.createContext<CurrentCompany | undefined>(undefined);

interface CurrentCompanyProps {
    children: React.ReactNode;
}

const CurrentCompany = ({ children }: CurrentCompanyProps) => {
    const { loading, company, error } = useCurrentCompanyQuery();

    if (loading) {
        return <CircularProgress label={"Loading company..."} />;
    }

    if (error) {
        return <CircularProgress label={error.message} />;
    }

    if (!company) {
        return <CircularProgress label={"Unable to load company!"} />;
    }

    return (
        <CurrentCompanyContext.Provider value={{ company }}>
            {children}
        </CurrentCompanyContext.Provider>
    );
};

export const CurrentCompanyProvider = createProviderPlugin(Component => {
    return function CurrentCompanyProvider({ children }) {
        return (
            <CurrentCompany>
                <Component>
                    <ApplyCompanyTheme />
                    {children}
                </Component>
            </CurrentCompany>
        );
    };
});

export function useCurrentCompany() {
    const context = React.useContext(CurrentCompanyContext);

    if (!context) {
        throw Error(`Missing CurrentCompanyProvider in the component hierarchy!`);
    }

    return context;
}

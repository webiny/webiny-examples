import React from "react";
import { createProviderPlugin } from "@webiny/app-admin";
import { CircularProgress } from "@webiny/ui/Progress";
import { useThemeSettingsQuery } from "./useThemeSettingsQuery";
import { ApplyTheme } from "./ApplyTheme";
import { ThemeSettings } from "../../shared/types";

export interface ThemeSettingsContextValue {
    themeSettings: ThemeSettings;
}

const ThemeSettingsContext = React.createContext<ThemeSettingsContextValue | undefined>(undefined);

interface ThemeSettingsProps {
    children: React.ReactNode;
}

const ThemeSettingsLoader = ({ children }: ThemeSettingsProps) => {
    const { loading, themeSettings, error } = useThemeSettingsQuery();

    if (loading) {
        return <CircularProgress label={"Loading theme settings..."} />;
    }

    if (error) {
        return <CircularProgress label={error.message} />;
    }

    if (!themeSettings) {
        return <CircularProgress label={"Unable to load theme settings!"} />;
    }

    return (
        <ThemeSettingsContext.Provider value={{ themeSettings }}>
            {children}
        </ThemeSettingsContext.Provider>
    );
};

export const ThemeSettingsProvider = createProviderPlugin(Component => {
    return function ThemeSettingsProvider({ children }) {
        return (
            <ThemeSettingsLoader>
                <Component>
                    <ApplyTheme />
                    {children}
                </Component>
            </ThemeSettingsLoader>
        );
    };
});

export function useThemeSettings() {
    const context = React.useContext(ThemeSettingsContext);

    if (!context) {
        throw Error(`Missing ThemeSettingsProvider in the component hierarchy!`);
    }

    return context;
}

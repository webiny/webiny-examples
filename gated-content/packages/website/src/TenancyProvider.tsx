import React, { useState, useContext } from "react";
import { plugins } from "@webiny/plugins";
import { TenantHeaderLinkPlugin } from "@webiny/app/plugins/TenantHeaderLinkPlugin";
import { createProvider } from "@webiny/app-website";
import { useRouter } from "@webiny/react-router";

declare global {
    interface Window {
        __PS_RENDER_TENANT__: string;
    }
}

const TenancyContext = React.createContext({ tenant: "" });

const getTenant = (search: string) => {
    if ("__PS_RENDER_TENANT__" in window) {
        return window.__PS_RENDER_TENANT__;
    }

    // For development purposes, fall back to "root"
    const url = new URLSearchParams(search);
    return url.has("__tenant") ? url.get("__tenant") : "root";
};

const TenancyProvider: React.FC = ({ children }) => {
    const { location } = useRouter();

    const [tenant] = useState(getTenant(location.search));

    if (!tenant) {
        return <h2>Unable to determine tenant id!</h2>;
    }

    // Attach x-tenant header with every request to the API.
    plugins.register(new TenantHeaderLinkPlugin(tenant));

    return <TenancyContext.Provider value={{ tenant }}>{children}</TenancyContext.Provider>;
};

export const WebsiteTenancy = createProvider(Original => {
    return function WebsiteTenancy({ children }) {
        return (
            <TenancyProvider>
                <Original>{children}</Original>
            </TenancyProvider>
        );
    };
});

export function useWebsiteTenant() {
    return useContext(TenancyContext);
}

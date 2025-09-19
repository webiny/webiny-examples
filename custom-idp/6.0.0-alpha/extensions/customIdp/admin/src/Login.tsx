import React, { useEffect } from "react";
import { OverlayLoader } from "@webiny/admin-ui";
import { useSecurity } from "@webiny/app-security";
import type { IdentityData } from "./types";

export interface LoginProps {
    login: () => Promise<IdentityData>;
    onIdentity: (data: IdentityData) => void;
}

export const Login = ({ login, onIdentity }: LoginProps) => {
    const { identity } = useSecurity();

    useEffect(() => {
        login().then(identity => {
            onIdentity(identity);
        }).catch(() => {
            // Ignore this error as we're handling networkErrors elsewhere.
        });
    }, []);

    return <>{identity ? null : <OverlayLoader title={"Logging in..."} />}</>;
};

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Compose, LoginScreenRenderer, useTags, useTenancy } from "@webiny/app-serverless-cms";
import { createAuthentication } from "./admin/createAuthentication";

interface AppClientIdLoaderProps {
    children: React.ReactNode;
    onError?: any;
}

const AppClientIdLoader = ({ onError, children }: AppClientIdLoaderProps) => {
    const [loaded, setState] = useState<boolean>(false);
    const authRef = useRef<React.ComponentType | null>(null);
    const { tenant, setTenant } = useTenancy();

    useEffect(() => {
        // Check if `tenantId` query parameter is set.
        const searchParams = new URLSearchParams(location.search);
        const tenantId = searchParams.get("tenantId") || tenant || "root";

        if (tenantId && tenantId !== tenant) {
            setTenant(tenantId);
        }

        authRef.current = createAuthentication({ onError });
        setState(true);
    }, []);

    return loaded
        ? React.createElement(authRef.current as React.ComponentType, {}, children)
        : null;
};

interface LoginScreenProps {
    children: React.ReactNode;
}

const createLoginScreen = () => {
    return function OktaLoginScreenHOC() {
        return function OktaLoginScreen({ children }: LoginScreenProps) {
            const { installer } = useTags();
            const [error, setError] = useState<string | null>(null);

            const onError = useCallback((error: Error) => {
                setError(error.message);
            }, []);

            if (error && !installer) {
                return <>NotAuthorizedError Compo</>;
            }

            return <AppClientIdLoader onError={onError}>{children}</AppClientIdLoader>;
        };
    };
};

export const MyIdp = () => {
    return (
        <>
            <Compose component={LoginScreenRenderer} with={createLoginScreen()} />
            {/*<UserMenuModule />*/}
        </>
    );
};

import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useMemo } from "react";
import { LoginScreenRenderer } from "@webiny/app-admin";
import { useSecurity } from "@webiny/app-security";
import { OverlayLoader } from "@webiny/admin-ui";
import { type Tokens, type GetFreshTokens, type GoToLogin, type OnLogout } from "./types";
import { Login } from "./Login";
import { useLogin } from "./useLogin";
import type { ApiError, IdentityData } from "./types";
import { AttachAuthorizationHeader } from "./AttachAuthorizationHeader";
import { Authenticator } from "./Authenticator";

interface CustomIdpProps {
    goToLogin: () => GoToLogin;
    getFreshTokens: () => GetFreshTokens;
    onLogout: () => OnLogout;
    onError?: () => (error: ApiError) => void;
    refreshInterval: number;
    graphQLIdentityType: string;
}

/**
 * Intercept the LoginScreenRenderer and run the custom IdP logic.
 */
export const CustomIdp = (props: CustomIdpProps) => {
    const LoginScreenDecorator = useMemo(() => {
        return LoginScreenRenderer.createDecorator(() => {
            return function LoginScreenRenderer({ children }) {
                return <LoginScreen {...props}>{children}</LoginScreen>;
            };
        });
    }, []);

    return <LoginScreenDecorator />;
};

type Children = {
    children: React.ReactNode;
};

/**
 * This components is responsible for running the Authenticator, and rendering the appropriate UI.
 */
const LoginScreen = observer(({ children, ...props }: CustomIdpProps & Children) => {
    const { setIdTokenProvider, identity, setIdentity } = useSecurity();
    const goToLogin = props.goToLogin();
    const getFreshTokens = props.getFreshTokens();
    const onLogout = props.onLogout();
    const onError = props.onError ? props.onError() : () => void 0;
    const login = useLogin(props.graphQLIdentityType);

    const authenticator = useMemo(() => {
        return new Authenticator(goToLogin, getFreshTokens, onLogout, props.refreshInterval);
    }, []);

    useEffect(() => {
        // Parse tokens from URL and initialize Authenticator.
        const tokens = getTokensFromUrl();
        authenticator.init(tokens);

        // Set idToken provider into the security module.
        setIdTokenProvider(() => authenticator.getIdToken());

        return () => {
            authenticator.destroy();
        };
    }, [authenticator]);

    const onIdentity = useCallback((data: IdentityData) => {
        setIdentity({
            ...data,
            logout: () => {
                authenticator.logout("userAction");
            }
        });
    }, []);

    const { isAuthenticated, isRefreshing } = authenticator.vm;

    return (
        <>
            <AttachAuthorizationHeader onError={onError} />
            {isAuthenticated && !identity ? <Login login={login} onIdentity={onIdentity} /> : null}
            {isAuthenticated && identity ? children : null}
            {!isAuthenticated && isRefreshing ? (
                <OverlayLoader title={"Verifying identity..."} />
            ) : null}
            {!isAuthenticated && !isRefreshing ? <OverlayLoader /> : null}
        </>
    );
});

export function getTokensFromUrl(): Tokens | undefined {
    const data = new URLSearchParams(window.location.search);
    const idToken = data.get("idToken") ?? undefined;
    const refreshToken = data.get("refreshToken") ?? undefined;

    const url = new URL(window.location.href);
    url.searchParams.delete("idToken");
    url.searchParams.delete("refreshToken");

    window.history.replaceState({}, document.title, url.toString());

    if (!idToken || !refreshToken) {
        return undefined;
    }

    return { idToken, refreshToken };
}

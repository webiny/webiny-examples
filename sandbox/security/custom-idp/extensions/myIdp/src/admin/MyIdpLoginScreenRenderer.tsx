import React, { useCallback, useEffect, useState } from "react";
import { LoginScreenRenderer, useSecurity, useTenancy } from "@webiny/app-serverless-cms";
import { getTenantId } from "@webiny/app-admin";
import { plugins } from "@webiny/plugins";
import { CircularProgress } from "@webiny/ui/Progress";
import { ApolloLinkPlugin } from "@webiny/app/plugins/ApolloLinkPlugin";
import { setContext } from "apollo-link-context";
import { MyIdpClient } from "./MyIdpClient";
import { useFetchIdentityData } from "./MyIdpLoginScreenRenderer/useFetchIdentityData";
import { useInactivityTimer } from "./MyIdpLoginScreenRenderer/useInactivityTimer";

const myIdpClient = new MyIdpClient();

export const MyIdpLoginScreenRenderer = LoginScreenRenderer.createDecorator(() => {
    return function MyIdpLoginScreenRenderer(props) {
        const { identity, setIdentity, setIdTokenProvider } = useSecurity();
        const [authenticating, setAuthenticating] = useState(true);
        const [error, setError] = useState(false);
        const { tenant, setTenant, isMultiTenant } = useTenancy();
        const inactivityTimer = useInactivityTimer();
        const fetchIdentityData = useFetchIdentityData();

        const logout = useCallback(() => {
            inactivityTimer.clear();
            myIdpClient.logout();
            setIdentity(null);
        }, []);

        useEffect(() => {
            // 1. Check if `tenantId` query parameter is set and if it's different from the current tenant.
            const tenantId = getTenantId() || "root";
            if (tenantId && tenantId !== tenant) {
                setTenant(tenantId);
            }

            // 2. We need to give the security layer a way to fetch the `idToken`, so other network clients can use
            // it when sending requests to external services (APIs, websockets,...).
            setIdTokenProvider(myIdpClient.getIdToken);

            // 3. Ensure that the inactivity timer is restarted on every request. This is important
            // because the inactivity timer is used to reload the browser after a certain period of
            // inactivity. Also, make sure the ID token is included in every request, via headers.
            plugins.register(
                new ApolloLinkPlugin(() => {
                    return setContext(async (_, payload) => {
                        inactivityTimer.restart();
                        return payload;
                    });
                }),
                new ApolloLinkPlugin(() => {
                    return setContext(async (_, { headers }) => {
                        // If "Authorization" header is already set, don't overwrite it.
                        if (headers && headers.Authorization) {
                            return { headers };
                        }

                        const isAuthenticated = myIdpClient.isAuthenticated;
                        if (!isAuthenticated) {
                            return { headers };
                        }

                        const idToken = myIdpClient.getIdToken();

                        if (!idToken) {
                            return { headers };
                        }

                        return {
                            headers: {
                                ...headers,
                                Authorization: `Bearer ${idToken}`
                            }
                        };
                    });
                })
            );

            // 4. Finally, authenticate the user and fetch identity data.
            myIdpClient.authenticate().then(async () => {
                fetchIdentityData()
                    .then(data => {
                        const { id, displayName, type, permissions, ...rest } = data;
                        setIdentity({
                            id,
                            displayName,
                            type,
                            permissions,
                            ...rest,
                            logout
                        });
                    })
                    .catch(error => {
                        console.log("Error fetching identity data", error);
                        setError(true);
                    })
                    .finally(() => {
                        setAuthenticating(false);
                    });
            });
        }, []);

        if (identity) {
            return <>{props.children}</>;
        }

        if (authenticating) {
            return <CircularProgress label={"Logging in..."} />;
        }

        if (error) {
            return (
                <div style={{ margin: "0 auto", padding: 100 }}>
                    Something went wrong... {error}
                </div>
            );
        }

        return (
            <div style={{ margin: "0 auto", padding: 100 }}>
                You've been signed out successfully.
            </div>
        );
    };
});

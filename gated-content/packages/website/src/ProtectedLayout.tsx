import React, { useEffect } from "react";
import { createComponentPlugin, isPrerendering, Layout } from "@webiny/app-website";
import { useWebsiteSecurity, WebsiteContentModule } from "./WebsiteSecurity";
import { useRouter } from "@webiny/react-router";

export const createProtectedLayout = (modules: WebsiteContentModule[]) => {
    if (isPrerendering()) {
        // POINT OF INTEREST:
        // During prerendering, we don't need security.
        return () => null;
    }

    return createComponentPlugin(Layout, Original => {
        return function ProtectedLayout({ children, ...props }) {
            const { location, history } = useRouter();
            const { identity, getPermission } = useWebsiteSecurity();
            const isLoginPage = location.pathname === "/login";

            const module = modules.find(module => location.pathname.startsWith(module.baseRoute));

            // URL requires the visitor to be logged in.
            const urlIsProtected = module && module.permission;
            const shouldLogin = !identity && urlIsProtected;
            const hasPermission =
                urlIsProtected && module.permission
                    ? Boolean(getPermission(module.permission))
                    : true;

            useEffect(() => {
                if (!isLoginPage && shouldLogin) {
                    history.push(`/login?redirect=${location.pathname}`);
                }
            }, [isLoginPage, shouldLogin]);

            // This `useEffect` controls what happens when a user is logged in, but doesn't have the permission
            // to access current page. Modify logic to suit your requirements.
            useEffect(() => {
                if (isLoginPage) {
                    return;
                }

                // POINT OF INTEREST:
                // User is logged in, but not authorized to view this app.
                // Tweak this part according to your business needs.
                if (!shouldLogin && !hasPermission) {
                    history.push(`/`);
                }
            }, [isLoginPage, shouldLogin, hasPermission]);

            if (!module) {
                return <Original {...props}>{children}</Original>;
            }

            if (!module.permission || isLoginPage) {
                return <Original {...props}>{children}</Original>;
            }

            if (shouldLogin || (urlIsProtected && !hasPermission)) {
                return null;
            }

            return <Original {...props}>{children}</Original>;
        };
    });
};

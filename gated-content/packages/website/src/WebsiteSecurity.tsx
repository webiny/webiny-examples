import React, { useEffect, useCallback, Fragment } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { ConsoleLinkPlugin } from "@webiny/app/plugins/ConsoleLinkPlugin";
import { HigherOrderComponent } from "@webiny/app-website";
import { useRouter } from "@webiny/react-router";
import { SecurityProvider } from "@webiny/app-security/contexts/Security";
import { useSecurity } from "@webiny/app-security";
import { plugins } from "@webiny/plugins";
import { LOGIN_MUTATION } from "./login.gql";
import { createApolloLinkPlugin } from "./createApolloLinkPlugin";
import { createProtectedLayout } from "./ProtectedLayout";
import { createMenuItem } from "./ModuleNavigation";

Amplify.configure({
    Auth: {
        region: process.env.REACT_APP_WEBSITE_USER_POOL_REGION,
        userPoolId: process.env.REACT_APP_WEBSITE_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_WEBSITE_USER_POOL_CLIENT
    }
});

const LoginIdentity: React.FC = ({ children }) => {
    const { history, location } = useRouter();

    const { authStatus, user, signOut } = useAuthenticator(context => [
        context.user,
        context.authStatus
    ]);
    const { identity, setIdentity } = useWebsiteSecurity();
    const client = useApolloClient();

    const loadIdentity = useCallback(async () => {
        const { data } = await client.mutate({ mutation: LOGIN_MUTATION });

        setIdentity({
            ...data.security.login.data,
            logout() {
                signOut();
                setIdentity(null);
            }
        });
    }, []);

    // Handle changes of identity
    useEffect(() => {
        if (location.pathname !== "/login") {
            return;
        }

        if (!identity) {
            return;
        }

        if (location.search) {
            const search = new URLSearchParams(location.search);
            const redirect = search.get("redirect");
            if (redirect) {
                history.push(redirect);
                return;
            }
        }

        history.push("/");
    }, [identity, location]);

    // Handle changes of `authState`
    useEffect(() => {
        if (authStatus === "authenticated" && user) {
            loadIdentity();
        } else {
            setIdentity(null);
        }
    }, [authStatus]);

    return <>{children}</>;
};

export function useWebsiteSecurity() {
    return useSecurity();
}

export interface WebsiteContentModule {
    baseRoute: string;
    label: string;
    permission?: string;
}

export interface WebsiteSecurityConfig {
    modules: WebsiteContentModule[];
}

export const configureWebsiteSecurity = (config: WebsiteSecurityConfig): HigherOrderComponent => {
    return Original => {
        return function WebsiteSecurity({ children }) {
            plugins.register(new ConsoleLinkPlugin(), createApolloLinkPlugin());
            const ProtectedLayout = createProtectedLayout(config.modules);

            const menuItems = config.modules.map(module => {
                const MenuItem = createMenuItem({
                    label: module.label,
                    path: module.baseRoute,
                    permission: module.permission
                });

                return (
                    <Fragment key={module.baseRoute}>
                        <MenuItem />
                    </Fragment>
                );
            });

            return (
                <>
                    <ProtectedLayout />
                    {menuItems}
                    <SecurityProvider>
                        <Authenticator.Provider>
                            <LoginIdentity>
                                <Original>{children}</Original>
                            </LoginIdentity>
                        </Authenticator.Provider>
                    </SecurityProvider>
                </>
            );
        };
    };
};

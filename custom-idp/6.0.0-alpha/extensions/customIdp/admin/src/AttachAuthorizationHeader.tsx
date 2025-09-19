import { useEffect } from "react";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLinkPlugin } from "@webiny/app";
import { useSecurity } from "@webiny/app-security";
import { plugins } from "@webiny/plugins";
import type { ApiError } from "./types";

interface Props {
    onError: (error: ApiError) => void;
}

export const AttachAuthorizationHeader = (props: Props) => {
    const { getIdToken } = useSecurity();

    useEffect(() => {
        // Attach Authorization header
        const authPlugin = new ApolloLinkPlugin(() => {
            return setContext(async (_, { headers }) => {
                // If "Authorization" header is already set, don't overwrite it.
                if (headers && headers.Authorization) {
                    return { headers };
                }

                // Get `idToken` from Security context.
                const idToken = await getIdToken();

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
        });

        authPlugin.name = "customIdpAuthorizationHeader";

        plugins.register(authPlugin);

        return () => {
            plugins.unregister("customIdpAuthorizationHeader");
        };
    }, [getIdToken]);

    useEffect(() => {
        // Catch network errors
        plugins.register(
            new ApolloLinkPlugin(() => {
                return onError(({ networkError }) => {
                    if (networkError) {
                        // @ts-expect-error
                        props.onError(networkError.result);
                    }
                });
            })
        );
    }, []);

    return null;
};

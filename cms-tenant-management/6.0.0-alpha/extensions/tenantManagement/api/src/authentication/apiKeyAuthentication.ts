import { createContextPlugin } from "@webiny/api";
import { Context } from "../types";

export const createGoldenKeyAuthentication = () => {
    return createContextPlugin<Context>(context => {
        context.security.addAuthenticator(async token => {
            if (typeof token !== "string") {
                return null;
            }

            if (token !== String(process.env["WEBINY_API_GOLDEN_API_KEY"])) {
                return null;
            }

            return {
                id: "golden-api-key",
                displayName: "",
                type: "api-key",
                // Add permissions directly to the identity so we don't have to load them
                // again when authorization kicks in.
                permissions: [
                    {
                        name: "*"
                    }
                ]
            };
        });
    });
};

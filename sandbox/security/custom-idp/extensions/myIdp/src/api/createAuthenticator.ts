import { createContextPlugin } from "@webiny/api-serverless-cms";
import WebinyError from "@webiny/error";
import { IDENTITY_TYPE, IDP_NAME_UC } from "../constants";

// All JWTs are split into 3 parts by two periods
const isJwt = (token: unknown) => {
    return typeof token === "string" && token.split(".").length === 3;
};

const processIdToken = async (idToken?: string) => {
    // TODO: uncomment this check to ensure the token is a valid JWT.
    // if (!isJwt(idToken)) {
    //     return null;
    // }

    try {
        // Decoding of JWT token should happen here. See how we do it with Okta/A0 implementations:
        // https://github.com/webiny/webiny-js/blob/next/packages/api-security-okta/src/createAuthenticator.ts#L44-L75
        // https://github.com/webiny/webiny-js/blob/next/packages/api-security-auth0/src/createAuthenticator.ts#L40-L61

        // For now, we just return a mock token object that simulates a decoded JWT.
        return {
            id: "mock-id",
            firstName: "mock-first-name",
            lastName: "mock-last-name",
            someCustomJwtProp: "this-is-a-mock-jwt",
            maybeCustomClaims: {
                isMySuperUser: true
            }
        };
    } catch (err) {
        throw new WebinyError(err.message, `SECURITY_${IDP_NAME_UC}_INVALID_TOKEN`);
    }
};

export const createAuthenticator = () => {
    return createContextPlugin(({ security }) => {
        security.addAuthenticator(async (idToken?: string) => {
            const token = await processIdToken(idToken);

            if (!token) {
                return null;
            }

            // Return an identity object based on the token.
            return {
                id: token.id,
                type: IDENTITY_TYPE,
                displayName: `${token.firstName} ${token.lastName}`,

                // Via the built-in full-access role, this provides full access to the Admin Area.
                // TODO: remove this and assign roles based on the token.
                groups: ["full-access"],

                // TODO: custom properties can be added like this.
                customClaims: {
                    isMySuperUser: token.maybeCustomClaims?.isMySuperUser
                }
            };
        });
    });
};

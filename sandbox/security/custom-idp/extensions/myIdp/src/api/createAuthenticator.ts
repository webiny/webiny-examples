import { SecurityIdentity } from "@webiny/api-security/types";
import { createContextPlugin } from "@webiny/api-serverless-cms";
import WebinyError from "@webiny/error";

// All JWTs are split into 3 parts by two periods
const isJwt = (token: string) => token.split(".").length === 3;

export interface AuthenticatorConfig {
    // MyIdp domain endpoint
    domain: string;

    // Create an identity object using the verified idToken
    getIdentity(params: { token: { [key: string]: any } }): SecurityIdentity;
}

export const createAuthenticator = (config: AuthenticatorConfig) => {
    const myIdpAuthenticator = async (idToken?: string) => {
        if (typeof idToken === "string" && isJwt(idToken)) {
            try {
                // Decoding of JWT token should happen here. See how we do it with Okta/A0 implementations:
                // https://github.com/webiny/webiny-js/blob/next/packages/api-security-okta/src/createAuthenticator.ts#L44-L75
                // https://github.com/webiny/webiny-js/blob/next/packages/api-security-auth0/src/createAuthenticator.ts#L40-L61

                // For now, we just return a mock token object.
                return {
                    id: 'mock-id',
                    type: 'mock-type',
                    displayName: 'mock-display-name',
                    customClaims: {
                        isMySuperUser: true
                    }
                }
            } catch (err) {
                throw new WebinyError(err.message, "SECURITY_MYIDP_INVALID_TOKEN");
            }
        }
        return null;
    };

    return createContextPlugin(({ security }) => {
        security.addAuthenticator(async (idToken?: string) => {
            const token = await myIdpAuthenticator(idToken);

            if (!token) {
                return null;
            }

            return config.getIdentity({ token });
        });
    });
};

import jwt from "jsonwebtoken";
import type { SecurityContext, SecurityIdentity } from "@webiny/api-security/types";
import WebinyError from "@webiny/error";
import { ContextPlugin } from "@webiny/api";

const JWT_SECRET = String(process.env["WEBINY_API_IDP_SHARED_SECRET"]);

// All JWTs are split into 3 parts by two periods
const isJwt = (token: string) => token.split(".").length === 3;

type Context = SecurityContext;

export interface AuthenticatorConfig {
    // Create an identity object using the verified idToken
    getIdentity(params: { token: { [key: string]: any } }): SecurityIdentity;
}

export const createAuthenticator = (config: AuthenticatorConfig) => {
    const authenticator = async (idToken?: string) => {
        if (typeof idToken === "string" && isJwt(idToken)) {
            try {
                const decoded = jwt.decode(idToken, { complete: true });
                if (!decoded) {
                    return null;
                }

                const token = jwt.verify(idToken, JWT_SECRET) as jwt.JwtPayload;

                // Optionally, validate token claims like `iss`, `aud`, etc.

                return token;
            } catch (err) {
                throw new WebinyError(err.message, err.name);
            }
        }
        return null;
    };

    return new ContextPlugin<Context>(({ security }) => {
        security.addAuthenticator(async (idToken?: string) => {
            const token = await authenticator(idToken);

            if (!token) {
                return null;
            }

            return config.getIdentity({ token });
        });
    });
};

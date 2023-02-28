import { NotAuthorizedError } from "@webiny/api-security";
import { SecurityIdentity } from "@webiny/api-security/types";
import { createCognito, CognitoTokenData } from "@webiny/api-security-cognito";
import { WebsiteContext, WebsiteSecurityConfig } from "./types";
import { IDENTITY_TYPE } from "./constants";

interface WebsiteTokenData extends CognitoTokenData {
    "custom:wby_tenant": string;
    "custom:wby_website_group": string;
}

interface WebsiteIdentity extends SecurityIdentity {
    email: string;
    firstName: string;
    lastName: string;
    group: string;
}

export const createWebsiteSecurity = ({ region, userPoolId }: WebsiteSecurityConfig) => {
    return createCognito<WebsiteContext, WebsiteTokenData, WebsiteIdentity>({
        identityType: IDENTITY_TYPE,
        region,
        userPoolId,
        getIdentity({ context, token }) {
            // Check tenant access: we must be sure that the identity signed up for this tenant.
            if (context.tenancy.getCurrentTenant().id !== token["custom:wby_tenant"]) {
                throw new NotAuthorizedError({
                    message: `You're not authorized to access this system.`,
                    code: "TENANT_MISMATCH"
                });
            }

            return {
                id: token.sub,
                type: IDENTITY_TYPE,
                displayName: `${token.given_name} ${token.family_name}`,
                email: token.email,
                firstName: token.given_name,
                lastName: token.family_name,
                // NOTE: we only need this property for the first login!
                group: token["custom:wby_website_group"]
            };
        },
        async getPermissions({ context }) {
            const identity = context.security.getIdentity();

            if (identity.type !== IDENTITY_TYPE) {
                return null;
            }

            const tenant = context.tenancy.getCurrentTenant();

            // We are using the `repository` to bypass permission checks, since that would
            // result in an infinite-loop at this point (we're in the authorization process already).
            const websiteGroup = await context.websiteGroups
                .getRepository()
                .getGroup({ where: { slug: identity.group, tenant: tenant.id } });

            if (websiteGroup) {
                return websiteGroup.permissions;
            }

            return null;
        }
    });
};

import { createIdp } from "./createIdp";

export const createExtension = () => {
    return createIdp({
        identityType: "admin",
        /**
         * This value must also match your admin app config!
         */
        graphQLIdentityType: "MyIdpIdentity",
        /**
         * Create a Webiny identity object using the decoded JWT.
         */
        getIdentity({ token }) {
            return {
                id: token["sub"],
                type: "admin",
                displayName: token["email"],
                groups: token["roles"],
                // Map any custom claim here
                tenantId: token["tenantId"]
            };
        },
        /**
         * Check whether identity has access to the current tenant.
         */
        canAccessTenant(context) {
            const identity = context.security.getIdentity();
            const currentTenant = context.tenancy.getCurrentTenant();

            // Use the custom claim to perform tenant access check.
            return identity["tenantId"] === currentTenant.id;
        }
    });
};

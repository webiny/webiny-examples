import { createSecurityGraphQL as baseCreateSecurityGraphQL } from "@webiny/api-security";

export const createSecurityGraphQL = () => {
    return baseCreateSecurityGraphQL({
        /**
         * We must provide custom logic to determine the "default" tenant for current identity.
         */
        async getDefaultTenant(context) {
            const { security } = context;
            return security.getIdentity().defaultTenant;
        }
    });
};
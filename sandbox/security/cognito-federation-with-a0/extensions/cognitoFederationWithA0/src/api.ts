import { createSecurityGraphQL as baseCreateSecurityGraphQL } from "@webiny/api-security";
import baseCognitoAuthentication from "@webiny/api-security-cognito";
import { type Context } from "@webiny/api-serverless-cms";

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

export const cognitoAuthentication = () => {
    return baseCognitoAuthentication<Context>({
        region: String(process.env.COGNITO_REGION),
        userPoolId: String(process.env.COGNITO_USER_POOL_ID),
        identityType: "admin",
        getIdentity({ identity, token, context }) {
            const isFederatedIdentity = Boolean(token["identities"]);
            if (!isFederatedIdentity) {
                // If we're not dealing with a federated identity, we can return the identity as is.
                // The base `cognitoAuthentication` plugin will take care of the rest (it will load
                // roles that were assigned via the Webiny Admin Area).
                return identity;
            }

            const groups = [];

            const identityTenantId = token["custom:tenant"];
            const currentTenantId = context.tenancy.getCurrentTenant().id;

            const canAccessTenant =
                currentTenantId === identityTenantId || identityTenantId === "root";
            if (canAccessTenant) {
                // Assign teams/roles in any way needed. For example, maybe if `identityTenantId` is "root",
                // assign a "full-access" group. On the other hand, if it's a regular tenant, assign a group
                // that's stored in the token, for example `token["custom:groups"]`. Note that in case of the
                // latter, the custom attribute must be added to the Cognito User Pool, the same way we did it
                // for the `custom:tenant` attribute.
                groups.push("full-access");
            }

            const defaultTenant =
                identityTenantId === "root"
                    ? context.tenancy.getRootTenant()
                    : context.tenancy.getTenantById(identityTenantId);

            return {
                ...identity,
                tenant: identityTenantId,
                defaultTenant,

                // Assign this via token as well (make sure to do the same amends we did for tenant).
                groups

                // Teams can also be assigned in the same way as groups.
                // teams: []
            };
        }
    });
};

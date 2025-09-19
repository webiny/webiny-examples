import type { GroupsTeamsAuthorizerConfig } from "@webiny/api-security";
import { createGroupsTeamsAuthorizer } from "@webiny/api-security";
import { createExternalIdpAdminUserHooksPlugin } from "@webiny/api-admin-users/createExternalIdpAdminUserHooks";
import type { AuthenticatorConfig } from "./createAuthenticator";
import { createAuthenticator } from "./createAuthenticator";
import { createIdentityType } from "./createIdentityType";
import type { Context } from "./types";

export interface CreateIdpConfig<TContext extends Context = Context>
    extends AuthenticatorConfig,
        GroupsTeamsAuthorizerConfig<TContext> {
    graphQLIdentityType?: string;
}

export const createIdp = <TContext extends Context = Context>(
    config: CreateIdpConfig<TContext>
) => {
    const identityType = config.identityType || "admin";
    const graphQLIdentityType = config.graphQLIdentityType || "CustomIdentity";

    return [
        /**
         * Authenticator is responsible for verifying the JWT following your IDP rules.
         * If JWS is valid, authenticator needs to return a Webiny identity object.
         */
        createAuthenticator({
            getIdentity: config.getIdentity
        }),
        /**
         * A groups/teams authorizer (permissions manager) for this particular identity type.
         */
        createGroupsTeamsAuthorizer<TContext>({
            identityType,
            canAccessTenant: config.canAccessTenant
        }),
        /**
         * Every identity type needs a dedicated GraphQL type.
         */
        createIdentityType({
            identityType,
            name: graphQLIdentityType
        }),
        /**
         * This manages an internal Webiny user record associated with the identity.
         */
        createExternalIdpAdminUserHooksPlugin()
    ];
};

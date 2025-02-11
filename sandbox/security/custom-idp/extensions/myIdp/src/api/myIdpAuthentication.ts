import { type Context } from "@webiny/api-serverless-cms";
import { createGroupsTeamsAuthorizer, GroupsTeamsAuthorizerConfig } from "@webiny/api-security";
import { createExternalIdpAdminUserHooks } from "@webiny/api-admin-users/createExternalIdpAdminUserHooks";
import { createAuthenticator, AuthenticatorConfig } from "./createAuthenticator";
import { createIdentityType } from "./createIdentityType";

export interface MyIdpAuthenticationConfig<TContext extends Context = Context>
    extends AuthenticatorConfig,
        GroupsTeamsAuthorizerConfig<TContext> {
    graphQLIdentityType?: string;
}

export const myIdpAuthentication = <TContext extends Context = Context>(
    config: MyIdpAuthenticationConfig<TContext>
) => {
    const identityType = config.identityType || "admin";
    const graphQLIdentityType = config.graphQLIdentityType || "MyIdpIdentity";

    return [
        createAuthenticator({
            domain: config.domain,
            getIdentity: config.getIdentity
        }),
        createGroupsTeamsAuthorizer<TContext>({
            identityType,
            getGroupSlug: config.getGroupSlug,
            inheritGroupsFromParentTenant: config.inheritGroupsFromParentTenant,
            canAccessTenant: config.canAccessTenant
        }),
        createIdentityType({
            identityType,
            name: graphQLIdentityType
        }),
        createExternalIdpAdminUserHooks()
    ];
};

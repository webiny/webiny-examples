import { createGroupsTeamsAuthorizer } from "@webiny/api-security";
import { createExternalIdpAdminUserHooks } from "@webiny/api-admin-users/createExternalIdpAdminUserHooks";
import { createAuthenticator } from "./createAuthenticator";
import { createIdentityType } from "./createIdentityType";
import { IDENTITY_TYPE, GRAPHQL_IDENTITY_TYPE } from "./constants";

export const myIdpAuthentication = () => {
    return [
        createAuthenticator(),
        createGroupsTeamsAuthorizer({
            identityType: IDENTITY_TYPE
        }),
        createIdentityType({
            identityType: IDENTITY_TYPE,
            name: GRAPHQL_IDENTITY_TYPE
        }),
        createExternalIdpAdminUserHooks()
    ];
};

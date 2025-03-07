import { createAuthenticator } from "./createAuthenticator";
import { createIdentityType } from "./createIdentityType";
import { createGroupsTeamsAuthorizer } from "@webiny/api-security";
import { createExternalIdpAdminUserHooksPlugin } from "@webiny/api-admin-users/createExternalIdpAdminUserHooks";
import { IDENTITY_TYPE } from "../constants";

export const myIdpAuthentication = () => {
    return [
        createAuthenticator(),
        createIdentityType(),
        createGroupsTeamsAuthorizer({ identityType: IDENTITY_TYPE }),
        createExternalIdpAdminUserHooksPlugin()
    ];
};

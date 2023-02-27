import { ContextPlugin } from "@webiny/api";
import { WebsiteContext } from "../types";
import { IDENTITY_TYPE } from "../constants";

export const onFirstLogin = () => {
    return new ContextPlugin<WebsiteContext>(context => {
        context.security.onLogin.subscribe(async ({ identity }) => {
            const tenant = context.tenancy.getCurrentTenant();

            if (identity.type !== IDENTITY_TYPE) {
                return;
            }

            // To perform the following operations, it's best we disable permission checks, because at this point,
            // the identity might not yet have a profile, and thus, will not have any permissions.
            context.security.disableAuthorization();

            // Check if current identity has a profile (user) associated with it.
            const profile = await context.websiteUsers.getUser({ where: { id: identity.id } });

            if (profile) {
                return;
            }

            // It's the first login, so we need to create a user profile.
            try {
                await context.websiteUsers.createUser({
                    id: identity.id,
                    // The following attributes are assigned to `identity` in the custom authenticator.
                    email: identity["email"],
                    firstName: identity["firstName"],
                    lastName: identity["lastName"],
                    group: identity["group"]
                });
            } catch (err) {
                console.log(`Failed to create a user profile!`, err.data);
                throw err;
            }

            // Link identity to current tenant
            try {
                await context.security.createTenantLinks([
                    {
                        identity: identity.id,
                        tenant: tenant.id,
                        type: identity.type,
                        data: { group: identity["group"] }
                    }
                ]);
            } catch (err) {
                console.log(`Failed to create tenant link!`);
                throw err;
            }

            context.security.enableAuthorization();
        });
    });
};

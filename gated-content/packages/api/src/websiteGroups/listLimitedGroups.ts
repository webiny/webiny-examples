import { NotAuthorizedError } from "@webiny/api-security";
import { WebsiteContext } from "../types";

export const listLimitedGroups = async (context: WebsiteContext) => {
    // We still want to check if the user is authenticated, because this query should not be publicly accessible.
    const identity = context.security.getIdentity();

    if (!identity) {
        throw new NotAuthorizedError();
    }

    // Temporarily disable authorization
    context.security.disableAuthorization();
    const groups = await context.websiteGroups.listGroups();
    context.security.enableAuthorization();

    return groups.map(group => ({
        name: group.name,
        slug: group.slug
    }));
};

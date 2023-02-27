import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ContextPlugin } from "@webiny/api";
import { createGroupsContext } from "./websiteGroups/groups.context";
import { createGroupsRepository } from "./websiteGroups/groups.repository";
import { createGroupsGraphQL } from "./websiteGroups/groups.graphql";
import { createUsersContext } from "./websiteUsers/users.context";
import { createUsersRepository } from "./websiteUsers/users.repository";
import { createUsersGraphQL } from "./websiteUsers/users.graphql";
import { onFirstLogin } from "./websiteUsers/onFirstLogin";
import { onUserUpdate } from "./websiteUsers/onUserUpdate";
import { WebsiteContext, WebsiteSecurityConfig, ContentModule } from "./types";
import { onUserDelete } from "./websiteUsers/onUserDelete";
import { onEntryAfterPublish } from "./content/onEntryAfterPublish";
import { cmsRichTextProcessor } from "./content/cmsRichTextProcessor";
import { onTenantAfterInstall } from "./content/onTenantAfterInstall";
import { onRootTenantAfterInstall } from "./content/onRootTenantAfterInstall";
export { createWebsiteSecurity } from "./createWebsiteSecurity";

interface SetupContentPlatform extends WebsiteSecurityConfig {
    documentClient: DocumentClient;
    modules: ContentModule[];
}

/**
 * Setup Content Platform GraphQL Schemas and SDKs.
 */
export const createContentPlatform = ({ documentClient, ...config }: SetupContentPlatform) => {
    return [
        new ContextPlugin<WebsiteContext>(context => {
            context.websiteGroups = createGroupsContext({
                getTenant() {
                    return context.tenancy.getCurrentTenant().id;
                },
                repository: createGroupsRepository({ documentClient }),
                getIdentity() {
                    return context.security.getIdentity();
                },
                getPermission(name) {
                    return context.security.getPermission(name);
                }
            });
        }),
        createGroupsGraphQL(),
        new ContextPlugin<WebsiteContext>(context => {
            context.websiteUsers = createUsersContext({
                getTenant() {
                    return context.tenancy.getCurrentTenant().id;
                },
                repository: createUsersRepository({ documentClient }),
                getPermission(name) {
                    return context.security.getPermission(name);
                }
            });
        }),
        createUsersGraphQL(),
        onFirstLogin(),
        onUserUpdate(config),
        onUserDelete(config),
        onEntryAfterPublish(config.modules),
        onTenantAfterInstall(config.modules),
        onRootTenantAfterInstall(),
        cmsRichTextProcessor()
    ];
};

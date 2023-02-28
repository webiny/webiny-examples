import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

import { ContextPlugin } from "@webiny/api";
import { WebsiteContext, WebsiteSecurityConfig } from "../types";

const WEBSITE_GROUP_ATTR = "custom:wby_website_group";

export const onUserUpdate = (config: WebsiteSecurityConfig) => {
    return [
        /**
         * When a user is updated, we want to make sure that we propagate the group to the tenant link.
         */
        new ContextPlugin<WebsiteContext>(context => {
            context.websiteUsers.onUserAfterUpdate.subscribe(async ({ user }) => {
                const link = await context.security.getTenantLinkByIdentity({
                    identity: user.id,
                    tenant: user.tenant
                });

                if (!link) {
                    return;
                }

                if (link.data.group !== user.group) {
                    link.data.group = user.group;
                    await context.security.updateTenantLinks([link]);
                }
            });
        }),
        /**
         * When a group is updated, we need to propagate it to Cognito User Pool.
         */
        new ContextPlugin<WebsiteContext>(context => {
            // `waitFor` allows you to run your logic only when the requested property appears on the context.
            context.websiteUsers.onUserAfterUpdate.subscribe(async ({ user }) => {
                const cognito = new CognitoIdentityServiceProvider({ region: config.region });

                // Construct a username for current tenant.
                const username = `${user.tenant}:${user.email}`;

                const { UserAttributes } = await cognito
                    .adminGetUser({
                        Username: username,
                        UserPoolId: config.userPoolId
                    })
                    .promise();

                if (!UserAttributes) {
                    // This condition is almost impossible, and is here to make TS happy.
                    return;
                }

                const cognitoGroup = UserAttributes.find(attr => attr.Name === WEBSITE_GROUP_ATTR);

                if (cognitoGroup && cognitoGroup.Value !== user.group) {
                    await cognito
                        .adminUpdateUserAttributes({
                            UserPoolId: config.userPoolId,
                            Username: username,
                            UserAttributes: [
                                {
                                    Name: WEBSITE_GROUP_ATTR,
                                    Value: user.group
                                }
                            ]
                        })
                        .promise();
                }
            });
        })
    ];
};

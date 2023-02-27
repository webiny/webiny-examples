import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

import { ContextPlugin } from "@webiny/api";
import { WebsiteContext, WebsiteSecurityConfig } from "../types";

export const onUserDelete = ({ region, userPoolId }: WebsiteSecurityConfig) => {
    return [
        /**
         * When a user is updated, we want to make sure that we propagate the group to the tenant link.
         */
        new ContextPlugin<WebsiteContext>(context => {
            context.websiteUsers.onUserAfterDelete.subscribe(async ({ user }) => {
                const cognito = new CognitoIdentityServiceProvider({ region });

                // Construct a username for current tenant.
                const username = `${user.tenant}:${user.email}`;

                await cognito
                    .adminDeleteUser({ UserPoolId: userPoolId, Username: username })
                    .promise();
            });
        })
    ];
};

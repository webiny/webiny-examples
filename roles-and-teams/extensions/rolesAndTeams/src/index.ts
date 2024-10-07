import {
    createSecurityRolePlugin,
    createSecurityTeamPlugin }
from "@webiny/api-serverless-cms";

export const createExtension = () => {
    return [
        createSecurityRolePlugin({
            id: "full-cms-access",
            name: "Full CMS Access",
            description: "Full access to the CMS application",
            permissions: [{ name: "cms.*" }],

            // Use the `tenant` property to ensure role is only available in a specific tenant.
            // tenant: "root"
        }),
        createSecurityRolePlugin({
            id: "full-pb-access",
            name: "Full Page Builder",
            description: "Full access to the Page Builder application",
            permissions: [{ name: "pb.*" }],

            // Use the `tenant` property to ensure role is only available in a specific tenant.
            // tenant: "root"
        }),

        // Team that consists of the "Full CMS Access" and "Full Page Builder" roles.
        createSecurityTeamPlugin({
            id: "content-team",
            name: "Content Team",
            description: "Team responsible for managing content",
            roles: ["full-pb-access", "full-cms-access"],

            // Use the `tenant` property to ensure team is only available in a specific tenant.
            // tenant: "root"
        })
    ];
};

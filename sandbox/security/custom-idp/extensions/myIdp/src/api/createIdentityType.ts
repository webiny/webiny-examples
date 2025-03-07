import { createContextPlugin, createGraphQLSchemaPlugin } from "@webiny/api-serverless-cms";
import { SecurityIdentity } from "@webiny/api-security/types";
import { GRAPHQL_IDENTITY_TYPE, IDENTITY_TYPE } from "../constants";

export const createIdentityType = () => {
    return [
        // Webiny supports different identity types, so we need to define a dedicated GraphQL type
        // for each identity type in the system. They all must implement the base `SecurityIdentity` interface.
        createGraphQLSchemaPlugin({
            typeDefs: `
            type ${GRAPHQL_IDENTITY_TYPE} implements SecurityIdentity {
                id: ID!
                type: String!
                displayName: String!
                permissions: [JSON!]!
            }
        `,
            resolvers: {
                [GRAPHQL_IDENTITY_TYPE]: {
                    __isTypeOf(obj: SecurityIdentity) {
                        return obj.type === IDENTITY_TYPE;
                    }
                }
            }
        }),
        // This plugin is only applied in multi-tenant environments.
        createContextPlugin(context => {
            if (context.tenancy.isMultiTenant()) {
                context.plugins.register(
                    createGraphQLSchemaPlugin({
                        typeDefs: `
                            extend type ${GRAPHQL_IDENTITY_TYPE} {
                                currentTenant: Tenant
                                defaultTenant: Tenant
                            }
                        `
                    })
                );
            }
        })
    ];
};

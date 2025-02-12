import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { createContextPlugin, createGraphQLSchemaPlugin } from "@webiny/api-serverless-cms";
import { SecurityIdentity } from "@webiny/api-security/types";

interface Config {
    name: string;
    identityType: string;
}

export const createIdentityType = (config: Config) => {
    return [
        // Webiny supports different identity types, so we need to define a dedicated GraphQL type
        // for each identity type in the system. They all must implement the base `SecurityIdentity` interface.
        createGraphQLSchemaPlugin({
            typeDefs: `
            type ${config.name} implements SecurityIdentity {
                id: ID!
                type: String!
                displayName: String!
                permissions: [JSON!]!
            }
        `,
            resolvers: {
                [config.name]: {
                    __isTypeOf(obj: SecurityIdentity) {
                        return obj.type === config.identityType;
                    }
                }
            }
        }),
        // This plugin is only applied in multi-tenant environments.
        createContextPlugin(context => {
            if (context.tenancy.isMultiTenant()) {
                context.plugins.register(
                    new GraphQLSchemaPlugin({
                        typeDefs: `
                            extend type ${config.name} {
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

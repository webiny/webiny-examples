import { createGraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { createContextPlugin } from "@webiny/api";
import type { TenancyContext } from "@webiny/api-tenancy/types";
import type { SecurityIdentity } from "@webiny/api-security/types";

interface Config {
    name: string;
    identityType: string;
}

export const createIdentityType = (config: Config) => {
    return [
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
        createContextPlugin<TenancyContext>(context => {
            if (context.tenancy.isMultiTenant()) {
                context.plugins.register(
                    createGraphQLSchemaPlugin({
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

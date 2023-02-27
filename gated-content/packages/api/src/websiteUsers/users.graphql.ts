import {
    GraphQLSchemaPlugin,
    ErrorResponse,
    ListErrorResponse,
    ListResponse,
    Response
} from "@webiny/handler-graphql";
import { SecurityIdentity } from "@webiny/api-security/types";
import { WebsiteContext } from "../types";
import { IDENTITY_TYPE } from "../constants";

export const createUsersGraphQL = () => {
    return new GraphQLSchemaPlugin<WebsiteContext>({
        typeDefs: /* GraphQL */ `
            type WebsiteUserIdentity implements SecurityIdentity {
                id: ID!
                type: String!
                displayName: String!
                permissions: [JSON!]!
                profile: WebsiteUser
                currentTenant: Tenant
                defaultTenant: Tenant
            }

            type WebsiteUser {
                id: ID!
                firstName: String!
                lastName: String!
                email: String!
                createdOn: DateTime!
                group: String!
            }

            input WebsiteUserUpdateInput {
                group: String!
            }

            type WebsiteUserResponse {
                data: WebsiteUser
                error: SecurityError
            }

            type WebsiteUserListResponse {
                data: [WebsiteUser]
                error: SecurityError
            }

            input GetWebsiteUserWhereInput {
                id: ID!
            }

            input ListWebsiteUsersWhere {
                # Performs a simple DynamoDB "beginsWith" query.
                email: String
            }

            extend type SecurityQuery {
                getWebsiteUser(where: GetWebsiteUserWhereInput!): WebsiteUserResponse
                listWebsiteUsers(where: ListWebsiteUsersWhere): WebsiteUserListResponse
            }

            extend type SecurityMutation {
                updateWebsiteUser(id: ID!, data: WebsiteUserUpdateInput!): WebsiteUserResponse
                deleteWebsiteUser(id: ID!): SecurityBooleanResponse
            }
        `,
        resolvers: {
            WebsiteUserIdentity: {
                async profile(identity, _, context) {
                    return await context.websiteUsers.getUser({
                        where: {
                            id: identity.id
                        }
                    });
                },
                __isTypeOf(obj: SecurityIdentity) {
                    return obj.type === IDENTITY_TYPE;
                }
            },
            SecurityQuery: {
                getWebsiteUser: async (_, { where }, context) => {
                    try {
                        const group = await context.websiteUsers.getUser({ where });
                        return new Response(group);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                },
                listWebsiteUsers: async (_, { where }, context) => {
                    try {
                        const groupList = await context.websiteUsers.listUsers(where);

                        return new ListResponse(groupList);
                    } catch (e) {
                        return new ListErrorResponse(e);
                    }
                }
            },
            SecurityMutation: {
                updateWebsiteUser: async (_, { id, data }, context) => {
                    try {
                        const group = await context.websiteUsers.updateUser(id, data);
                        return new Response(group);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                },
                deleteWebsiteUser: async (_, { id }, context) => {
                    try {
                        await context.websiteUsers.deleteUser(id);

                        return new Response(true);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                }
            }
        }
    });
};

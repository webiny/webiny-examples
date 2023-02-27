import {
    GraphQLSchemaPlugin,
    ErrorResponse,
    ListErrorResponse,
    ListResponse,
    Response
} from "@webiny/handler-graphql";
import { WebsiteContext } from "../types";
import { listLimitedGroups } from "./listLimitedGroups";

export const createGroupsGraphQL = () => {
    return new GraphQLSchemaPlugin<WebsiteContext>({
        typeDefs: /* GraphQL */ `
            type WebsiteGroup {
                id: ID!
                name: String!
                slug: String!
                createdOn: DateTime!
                description: String!
                permissions: [JSON!]!
            }

            type WebsiteLimitedGroup {
                name: String!
                slug: String!
            }

            input WebsiteGroupCreateInput {
                name: String!
                slug: String!
                description: String
                permissions: [JSON!]!
            }

            input WebsiteGroupUpdateInput {
                name: String
                description: String
                permissions: [JSON!]
            }

            type WebsiteGroupResponse {
                data: WebsiteGroup
                error: SecurityError
            }

            type WebsiteGroupListResponse {
                data: [WebsiteGroup!]
                error: SecurityError
            }

            type WebsiteLimitedGroupListResponse {
                data: [WebsiteLimitedGroup!]
                error: SecurityError
            }

            input GetWebsiteGroupWhereInput {
                id: ID
                slug: String
            }

            extend type SecurityQuery {
                getWebsiteGroup(where: GetWebsiteGroupWhereInput!): WebsiteGroupResponse
                listWebsiteGroups: WebsiteGroupListResponse
                listLimitedWebsiteGroups: WebsiteLimitedGroupListResponse
            }

            extend type SecurityMutation {
                createWebsiteGroup(data: WebsiteGroupCreateInput!): WebsiteGroupResponse
                updateWebsiteGroup(id: ID!, data: WebsiteGroupUpdateInput!): WebsiteGroupResponse
                deleteWebsiteGroup(id: ID!): SecurityBooleanResponse
            }
        `,
        resolvers: {
            SecurityQuery: {
                getWebsiteGroup: async (_, { where }, context) => {
                    try {
                        const group = await context.websiteGroups.getGroup({ where });
                        return new Response(group);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                },
                listWebsiteGroups: async (_, __, context) => {
                    try {
                        const groupList = await context.websiteGroups.listGroups();

                        return new ListResponse(groupList);
                    } catch (e) {
                        return new ListErrorResponse(e);
                    }
                },
                listLimitedWebsiteGroups: async (_, __, context) => {
                    try {
                        const groups = await listLimitedGroups(context);
                        return new ListResponse(groups);
                    } catch (e) {
                        return new ListErrorResponse(e);
                    }
                }
            },
            SecurityMutation: {
                createWebsiteGroup: async (_, { data }, context) => {
                    try {
                        const group = await context.websiteGroups.createGroup(data);

                        return new Response(group);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                },
                updateWebsiteGroup: async (_, { id, data }, context) => {
                    try {
                        const group = await context.websiteGroups.updateGroup(id, data);
                        return new Response(group);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                },
                deleteWebsiteGroup: async (_, { id }, context) => {
                    try {
                        await context.websiteGroups.deleteGroup(id);

                        return new Response(true);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                }
            }
        }
    });
};

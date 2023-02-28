import WebinyError from "@webiny/error";
import { createTable } from "../ddb/table.ddb";
import { queryAll, queryOne } from "@webiny/db-dynamodb/utils/query";
import { createEntity, DataContainer } from "../ddb/entity.ddb";
import { Group, GroupsRepository, GroupRepositoryParams } from "./types";

export const createGroupsRepository = ({ documentClient }: GroupRepositoryParams): GroupsRepository => {
    const groupEntity = createEntity("WebsiteGroup", createTable({ documentClient }));

    const createGroupKeys = (group: Pick<Group, "tenant" | "id">) => ({
        PK: `T#${group.tenant}#WEBSITE_GROUP#${group.id}`,
        SK: `A`
    });

    const createGroupGsiKeys = (group: Pick<Group, "tenant" | "slug">) => ({
        GSI1_PK: `T#${group.tenant}#WEBSITE_GROUPS`,
        GSI1_SK: group.slug
    });

    return {
        async createGroup({ group }): Promise<void> {
            const keys = {
                ...createGroupKeys(group),
                ...createGroupGsiKeys(group)
            };

            try {
                await groupEntity.put({
                    ...keys,
                    TYPE: "website.group",
                    data: group
                });
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not create group.",
                    code: "CREATE_GROUP_ERROR",
                    data: { keys }
                });
            }
        },
        async updateGroup({ group }): Promise<void> {
            const keys = {
                ...createGroupKeys(group),
                ...createGroupGsiKeys(group)
            };

            try {
                await groupEntity.put({
                    ...keys,
                    TYPE: "website.group",
                    data: group
                });
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not update group.",
                    code: "UPDATE_GROUP_ERROR",
                    data: { keys, group }
                });
            }
        },
        async deleteGroup({ group }) {
            const keys = createGroupKeys(group);

            try {
                await groupEntity.delete(keys);
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not delete group.",
                    code: "CREATE_DELETE_ERROR",
                    data: { keys, group }
                });
            }
        },
        async getGroup({ where: { tenant, id, slug } }): Promise<Group> {
            try {
                let result;
                if (id) {
                    const response = await groupEntity.get(createGroupKeys({ tenant, id }));
                    if (response.Item) {
                        result = response.Item;
                    }
                } else if (slug) {
                    result = await queryOne({
                        entity: groupEntity,
                        partitionKey: `T#${tenant}#WEBSITE_GROUPS`,
                        options: {
                            index: "GSI1",
                            eq: slug
                        }
                    });
                }

                return result?.data;
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not load group.",
                    code: "GET_GROUP_ERROR",
                    data: { id, slug }
                });
            }
        },

        async listGroups({ where: { tenant } }): Promise<Group[]> {
            let items: DataContainer<Group>[];
            try {
                items = await queryAll({
                    entity: groupEntity,
                    partitionKey: `T#${tenant}#WEBSITE_GROUPS`,
                    options: {
                        index: "GSI1",
                        beginsWith: ""
                    }
                });
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not list groups.",
                    code: "LIST_GROUP_ERROR"
                });
            }

            return items.map(item => item.data);
        }
    };
};

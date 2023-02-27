// @ts-ignore `mdbid` package doesn't have types
import mdbid from "mdbid";
import WebinyError from "@webiny/error";
import { createZodError } from "@webiny/utils";
import { NotAuthorizedError } from "@webiny/api-security";
import { SecurityIdentity, SecurityPermission } from "@webiny/api-security/types";
import { Group, GroupsContext, GroupsRepository } from "./types";
import { GroupCreateSchema, GroupUpdateSchema } from "./group.zod";

interface CreateGroupsContext {
    getIdentity: () => SecurityIdentity;
    getPermission: (name: string) => Promise<SecurityPermission | null>;
    repository: GroupsRepository;
    getTenant: () => string;
}

function createGroupNotFoundError(id: string) {
    return new WebinyError({
        code: "GROUP_NOT_FOUND",
        message: `Group with id "${id}" doesn't exist!`,
        data: { id }
    });
}

export const createGroupsContext = ({
    getIdentity,
    getPermission,
    repository,
    getTenant
}: CreateGroupsContext): GroupsContext => {
    /**
     * Since we only have "full access" and "no access", we only need to check
     * if the permission is assigned to the user. If so, it means "full access".
     */
    async function checkPermission(): Promise<void> {
        const permission = await getPermission("cp.websiteGroups");

        if (!permission) {
            throw new NotAuthorizedError();
        }
    }

    return {
        getRepository: () => repository,
        async createGroup(input) {
            await checkPermission();

            const identity = getIdentity();
            const tenant = getTenant();

            const existingGroup = await repository.getGroup({
                where: { slug: input.slug, tenant }
            });

            if (existingGroup) {
                throw new WebinyError({
                    code: "SLUG_EXISTS",
                    message: `Group with slug "${input.slug}" already exists.`,
                    data: {
                        slug: input.slug
                    }
                });
            }

            const result = await GroupCreateSchema.safeParseAsync(input);
            if (!result.success) {
                throw createZodError(result.error);
            }

            const group: Group = {
                id: mdbid(),
                tenant,
                ...input,
                createdOn: new Date().toISOString(),
                createdBy: identity
                    ? {
                          id: identity.id,
                          displayName: identity.displayName,
                          type: identity.type
                      }
                    : null
            };

            try {
                await repository.createGroup({ group });

                return group;
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not create group.",
                    ex.code || "CREATE_GROUP_ERROR",
                    {
                        group
                    }
                );
            }
        },
        async deleteGroup(id): Promise<void> {
            await checkPermission();

            const group = await repository.getGroup({
                where: { id, tenant: getTenant() }
            });

            if (!group) {
                throw createGroupNotFoundError(id);
            }

            await repository.deleteGroup({ group });
        },
        async updateGroup(id, input) {
            await checkPermission();

            const identity = getIdentity();
            const tenant = getTenant();

            const existingGroup = await repository.getGroup({
                where: { id, tenant }
            });

            if (!existingGroup) {
                throw createGroupNotFoundError(id);
            }

            const result = await GroupUpdateSchema.safeParseAsync(input);
            if (!result.success) {
                throw createZodError(result.error);
            }

            const group: Group = {
                ...existingGroup,
                ...input
            };

            try {
                await repository.updateGroup({ group });

                return group;
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not update group.",
                    ex.code || "UPDATE_GROUP_ERROR",
                    {
                        group
                    }
                );
            }
        },
        async getGroup({ where }) {
            await checkPermission();

            let group: Group | null = null;
            try {
                group = await repository.getGroup({
                    where: { ...where, tenant: getTenant() }
                });
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not get group.",
                    ex.code || "GET_GROUP_ERROR",
                    where
                );
            }

            return group;
        },
        async listGroups() {
            await checkPermission();
            try {
                return repository.listGroups({
                    where: {
                        tenant: getTenant()
                    }
                });
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not list website groups.",
                    ex.code || "LIST_WEBSITE_GROUPS_ERROR"
                );
            }
        }
    };
};

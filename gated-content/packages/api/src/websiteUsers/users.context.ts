import { createTopic } from "@webiny/pubsub";
import WebinyError from "@webiny/error";
import { createZodError } from "@webiny/utils";
import { NotAuthorizedError } from "@webiny/api-security";
import { SecurityPermission } from "@webiny/api-security/types";
import { UsersContext, UsersRepository, User } from "./types";
import { UserCreateSchema, UserUpdateSchema } from "./user.zod";

interface CreateUsersContext {
    getPermission: (name: string) => Promise<SecurityPermission | null>;
    repository: UsersRepository;
    getTenant: () => string;
}

function createUserNotFoundError(id: string) {
    return new WebinyError({
        code: "USER_NOT_FOUND",
        message: `User with id "${id}" doesn't exist!`,
        data: { id }
    });
}

export const createUsersContext = ({
    getPermission,
    repository,
    getTenant
}: CreateUsersContext): UsersContext => {
    /**
     * Since we only have "full access" and "no access", we only need to check
     * if the permission is assigned to the user. If so, it means "full access".
     */
    async function checkPermission(): Promise<void> {
        const permission = await getPermission("cp.websiteUsers");

        if (!permission) {
            throw new NotAuthorizedError();
        }
    }

    return {
        getRepository: () => repository,
        onUserAfterUpdate: createTopic("websiteUser.update"),
        onUserAfterDelete: createTopic("websiteUser.delete"),
        async createUser(input) {
            await checkPermission();

            const tenant = getTenant();

            const result = await UserCreateSchema.safeParseAsync(input);
            if (!result.success) {
                throw createZodError(result.error);
            }

            const user: User = {
                tenant,
                ...input,
                createdOn: new Date().toISOString()
            };

            try {
                await repository.createUser({ user });

                return user;
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not create user.",
                    ex.code || "CREATE_USER_ERROR",
                    {
                        user
                    }
                );
            }
        },
        async deleteUser(id): Promise<void> {
            await checkPermission();

            const user = await repository.getUser({
                where: { id, tenant: getTenant() }
            });

            if (!user) {
                throw createUserNotFoundError(id);
            }

            await repository.deleteUser({ user });

            await this.onUserAfterDelete.publish({ user });
        },
        async updateUser(id, input) {
            await checkPermission();

            const tenant = getTenant();

            const existingUser = await repository.getUser({
                where: { id, tenant }
            });

            if (!existingUser) {
                throw createUserNotFoundError(id);
            }

            const result = await UserUpdateSchema.safeParseAsync(input);
            if (!result.success) {
                throw createZodError(result.error);
            }

            const user: User = {
                ...existingUser,
                ...input
            };

            try {
                await repository.updateUser({ user });

                await this.onUserAfterUpdate.publish({ user });

                return user;
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not update user.",
                    ex.code || "UPDATE_USER_ERROR",
                    {
                        user
                    }
                );
            }
        },
        async getUser({ where }) {
            await checkPermission();

            let user: User | null = null;
            try {
                user = await repository.getUser({
                    where: { ...where, tenant: getTenant() }
                });
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not get user.",
                    ex.code || "GET_USER_ERROR",
                    where
                );
            }

            return user;
        },
        async listUsers(where = {}) {
            await checkPermission();
            try {
                return repository.listUsers({
                    where: {
                        email: where.email,
                        tenant: getTenant()
                    }
                });
            } catch (ex) {
                throw new WebinyError(
                    ex.message || "Could not list website users.",
                    ex.code || "LIST_WEBSITE_USERS_ERROR"
                );
            }
        }
    };
};

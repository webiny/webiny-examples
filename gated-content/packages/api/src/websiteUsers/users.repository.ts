import WebinyError from "@webiny/error";
import { createTable } from "../ddb/table.ddb";
import { queryAll, queryOne } from "@webiny/db-dynamodb/utils/query";
import { createEntity, DataContainer } from "../ddb/entity.ddb";
import { User, UsersRepository, UserRepositoryParams } from "./types";

export const createUsersRepository = ({
    documentClient
}: UserRepositoryParams): UsersRepository => {
    const userEntity = createEntity("WebsiteUser", createTable({ documentClient }));

    const createUserKeys = (user: Pick<User, "tenant" | "id">) => ({
        PK: `T#${user.tenant}#WEBSITE_USER#${user.id}`,
        SK: `A`
    });

    const createUserGsiKeys = (user: Pick<User, "tenant" | "email">) => ({
        GSI1_PK: `T#${user.tenant}#WEBSITE_USERS`,
        GSI1_SK: user.email
    });

    return {
        async createUser({ user }): Promise<void> {
            const keys = {
                ...createUserKeys(user),
                ...createUserGsiKeys(user)
            };

            try {
                await userEntity.put({
                    ...keys,
                    TYPE: "website.user",
                    data: user
                });
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not create user.",
                    code: "CREATE_USER_ERROR",
                    data: { keys }
                });
            }
        },
        async updateUser({ user }): Promise<void> {
            const keys = {
                ...createUserKeys(user),
                ...createUserGsiKeys(user)
            };

            try {
                await userEntity.put({
                    ...keys,
                    TYPE: "website.user",
                    data: user
                });
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not update user.",
                    code: "UPDATE_USER_ERROR",
                    data: { keys, user }
                });
            }
        },
        async deleteUser({ user }) {
            const keys = createUserKeys(user);

            try {
                await userEntity.delete(keys);
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not delete user.",
                    code: "CREATE_DELETE_ERROR",
                    data: { keys, user }
                });
            }
        },
        async getUser({ where: { tenant, id } }): Promise<User | null> {
            try {
                const { PK, SK } = createUserKeys({ tenant, id });

                const user = await queryOne<{ data: User }>({
                    entity: userEntity,
                    partitionKey: PK,
                    options: {
                        eq: SK
                    }
                });

                return user?.data || null;
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not load user.",
                    code: "GET_USER_ERROR",
                    data: { id }
                });
            }
        },

        async listUsers({ where: { email, tenant } }): Promise<User[]> {
            let items: DataContainer<User>[];
            try {
                items = await queryAll({
                    entity: userEntity,
                    partitionKey: `T#${tenant}#WEBSITE_USERS`,
                    options: {
                        index: "GSI1",
                        beginsWith: email || ""
                    }
                });
            } catch (err) {
                throw WebinyError.from(err, {
                    message: "Could not list users.",
                    code: "LIST_USER_ERROR"
                });
            }

            return items.map(item => item.data);
        }
    };
};

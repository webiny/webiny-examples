import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Topic } from "@webiny/pubsub/types";

export type CreateUserInput = Pick<User, "id" | "firstName" | "lastName" | "email" | "group">;
export type UpdateUserInput = Pick<User, "group">;

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    group: string;
    tenant: string;
    createdOn: string;
}

export interface GetUserWhere {
    id: string;
}

export interface GetUserParams {
    where: GetUserWhere;
}

interface ListUsersWhereParams {
    email?: string;
}

export interface UsersContext {
    onUserAfterUpdate: Topic<{ user: User }>;
    onUserAfterDelete: Topic<{ user: User }>;
    getRepository(): UsersRepository;
    getUser(params: GetUserParams): Promise<User | null>;
    listUsers(where: ListUsersWhereParams): Promise<User[]>;
    createUser(user: CreateUserInput): Promise<User>;
    updateUser(id: string, data: UpdateUserInput): Promise<User>;
    deleteUser(id: string): Promise<void>;
}

/**
 * REPOSITORY TYPES
 */

export interface RepositoryGetUserParams extends GetUserParams {
    where: GetUserParams["where"] & {
        tenant: string;
    };
}

export interface RepositoryListUsersParams {
    where: {
        email?: string;
        tenant: string;
    };
}

export interface RepositoryCreateUserParams {
    user: User;
}

export interface RepositoryUpdateUserParams {
    user: User;
}

export interface RepositoryDeleteUserParams {
    user: User;
}

export interface UserRepositoryParams {
    documentClient: DocumentClient;
}

export interface UsersRepository {
    getUser(params: RepositoryGetUserParams): Promise<User | null>;
    listUsers(params: RepositoryListUsersParams): Promise<User[]>;
    createUser(params: RepositoryCreateUserParams): Promise<void>;
    updateUser(params: RepositoryUpdateUserParams): Promise<void>;
    deleteUser(params: RepositoryDeleteUserParams): Promise<void>;
}

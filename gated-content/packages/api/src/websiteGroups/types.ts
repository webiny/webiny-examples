import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { SecurityPermission } from "@webiny/api-security/types";

interface CreatedBy {
    id: string;
    displayName: string | null;
    type: string;
}

export type CreateGroupInput = Pick<Group, "name" | "slug" | "description" | "permissions">;
export type UpdateGroupInput = Pick<Group, "name" | "description" | "permissions">;

export interface Group {
    id: string;
    name: string;
    slug: string;
    description: string;
    permissions: SecurityPermission[];
    tenant: string;
    createdOn: string;
    createdBy: CreatedBy | null;
}

export interface GetGroupWhere {
    id?: string;
    slug?: string;
}

export interface GetGroupParams {
    where: GetGroupWhere;
}

export interface GroupsContext {
    getRepository(): GroupsRepository;
    getGroup(params: GetGroupParams): Promise<Group | null>;
    listGroups(): Promise<Group[]>;
    createGroup(group: CreateGroupInput): Promise<Group>;
    updateGroup(id: string, data: UpdateGroupInput): Promise<Group>;
    deleteGroup(id: string): Promise<void>;
}

/**
 * REPOSITORY TYPES
 */

export interface RepositoryGetGroupParams extends GetGroupParams {
    where: GetGroupParams["where"] & {
        tenant: string;
    };
}

export interface RepositoryListGroupsParams {
    where: {
        tenant: string;
    };
}

export interface RepositoryCreateGroupParams {
    group: Group;
}

export interface RepositoryUpdateGroupParams {
    group: Group;
}

export interface RepositoryDeleteGroupParams {
    group: Group;
}

export interface GroupRepositoryParams {
    documentClient: DocumentClient;
}

export interface GroupsRepository {
    getGroup(params: RepositoryGetGroupParams): Promise<Group | null>;
    listGroups(params: RepositoryListGroupsParams): Promise<Group[]>;
    createGroup(params: RepositoryCreateGroupParams): Promise<void>;
    updateGroup(params: RepositoryUpdateGroupParams): Promise<void>;
    deleteGroup(params: RepositoryDeleteGroupParams): Promise<void>;
}

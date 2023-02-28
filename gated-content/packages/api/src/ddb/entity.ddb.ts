import { Entity, Table } from "dynamodb-toolbox";

export interface DataContainer<T> {
    PK: string;
    SK: string;
    TYPE: string;
    GSI1_PK?: string;
    GSI1_SK?: string;
    data: T;
}

export const createEntity = (entityName: string, table: Table) => {
    return new Entity({
        table,
        name: entityName,
        attributes: {
            PK: {
                partitionKey: true
            },
            SK: {
                sortKey: true
            },
            GSI1_PK: {
                type: "string"
            },
            GSI1_SK: {
                type: "string"
            },
            TYPE: {
                type: "string"
            },
            data: {
                type: "map"
            }
        }
    });
};

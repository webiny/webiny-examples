import { ERROR_FIELDS } from "../utils";

const DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on CmsContentModelGroup {
        id
        name
        slug
        description
        icon
        createdOn
        plugin
        createdBy {
            id
            displayName
            type
        }
        contentModels {
            modelId
            name
        }
    }
`;

export const CREATE_GROUP = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    mutation CmsCreateContentModelGroup($data: CmsContentModelGroupInput!) {
        contentModelGroup: createContentModelGroup(data: $data) {
            data {
                ...DataFields
            }
            error {
                ...ErrorFields
            }
        }
    }
`;

export const DELETE_GROUP = /* GraphQL */ `
    ${ERROR_FIELDS}
    mutation CmsDeleteContentModelGroup($id: ID!) {
        deleteContentModelGroup(id: $id) {
            data
            error {
                ...ErrorFields
            }
        }
    }
`;

export const LIST_GROUPS = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query CmsListContentModelGroups {
        listContentModelGroups {
            data {
                ...DataFields
            }
            error {
                ...ErrorFields
            }
        }
    }
`;

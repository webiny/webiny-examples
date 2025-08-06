import { ERROR_FIELDS } from "../utils";

const DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on SecurityGroup {
        id
        name
        slug
        description
        permissions
        system
        createdOn
    }
`;

export const CREATE_ROLE = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    mutation CreateGroup($data: SecurityGroupCreateInput!) {
        security {
            createGroup(data: $data) {
                data {
                    ...DataFields
                }
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

export const LIST_ROLES = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query ListGroups {
        security {
            listGroups {
                data {
                    ...DataFields
                }
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

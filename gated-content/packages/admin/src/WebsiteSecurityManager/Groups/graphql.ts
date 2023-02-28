import gql from "graphql-tag";

const fields = `
    id
    name
    slug
    description
    permissions
    createdOn
`;

export const LIST_LIMITED_GROUPS = gql`
    query ListWebsiteGroupsForPB {
        security {
            listLimitedWebsiteGroups {
                data {
                    name
                    slug
                }
                error {
                    code
                    message
                }
            }
        }
    }
`;

export const LIST_GROUPS = gql`
    query listGroups {
        security {
            groups: listWebsiteGroups {
                data {
                    ${fields}
                }
            }
        }
    }
`;

export const READ_GROUP = gql`
    query getGroup($id: ID!) {
        security {
            group: getWebsiteGroup(where: { id: $id }){
                data {
                    ${fields}
                }
                error {
                    code
                    message
                }
            }
        }
    }
`;

export const CREATE_GROUP = gql`
    mutation createGroup($data: WebsiteGroupCreateInput!){
        security {
            createWebsiteGroup(data: $data) {
                data {
                    ${fields}
                }
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;

export const UPDATE_GROUP = gql`
    mutation updateGroup($id: ID!, $data: WebsiteGroupUpdateInput!){
        security {
            updateWebsiteGroup(id: $id, data: $data) {
                data {
                    ${fields}
                }
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;

export const DELETE_GROUP = gql`
    mutation deleteGroup($id: ID!) {
        security {
            deleteWebsiteGroup(id: $id) {
                data
                error {
                    code
                    message
                }
            }
        }
    }
`;

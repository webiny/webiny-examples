import gql from "graphql-tag";

const fields = `
    id
    email
    firstName
    lastName
    group
    createdOn
`;

export const LIST_USERS = gql`
    query ListWebsiteUsers($email: String) {
        security {
            listWebsiteUsers(where: { email: $email }) {
                data {
                    ${fields}
                }
            }
        }
    }
`;

export const READ_USER = gql`
    query GetWebsiteUser($id: ID!) {
        security {
            getWebsiteUser(where: { id: $id }){
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

export const UPDATE_USER = gql`
    mutation UpdateWebsiteUser($id: ID!, $data: WebsiteUserUpdateInput!){
        security {
            updateWebsiteUser(id: $id, data: $data) {
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

export const DELETE_USER = gql`
    mutation DeleteWebsiteUser($id: ID!) {
        security {
            deleteWebsiteUser(id: $id) {
                data
                error {
                    code
                    message
                }
            }
        }
    }
`;

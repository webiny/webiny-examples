import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
    mutation Login {
        security {
            login {
                data {
                    ... on WebsiteUserIdentity {
                        id
                        displayName
                        type
                        permissions
                        profile {
                            email
                            firstName
                            lastName
                        }
                    }
                }
                error {
                    code
                    message
                    data
                    stack
                }
            }
        }
    }
`;

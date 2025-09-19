import gql from "graphql-tag";

export const LOGIN_MT = (graphQLIdentityType: string) => {
    return gql`
        mutation Login {
            security {
                login {
                    data {
                        ... on ${graphQLIdentityType} {
                            id
                            displayName
                            type
                            currentTenant {
                                id
                                name
                                description
                                image
                                parent
                            }
                            defaultTenant {
                                id
                                name
                                description
                                image
                                parent
                            }
                            permissions
                        }
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
};

export const LOGIN_ST = (graphQLIdentityType: string) => {
    return gql`
        mutation Login {
            security {
                login {
                    data {
                        ... on ${graphQLIdentityType} {
                            id
                            displayName
                            type
                            permissions
                        }
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
};

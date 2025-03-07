import gql from "graphql-tag";
import { GRAPHQL_IDENTITY_TYPE } from "../../constants";
import { type SecurityPermission } from "@webiny/app-security/types";

export interface LoginError {
    code: string;
    message: string;
    data: string;
}

export interface LoginData {
    id: string;
    displayName: string;
    type: string;
    permissions: SecurityPermission[];
}

export interface LoginStResponse {
    security: {
        login: {
            data: LoginData;
            error: LoginError;
        };
    };
}

export interface LoginMtResponse {
    security: {
        login: {
            data: LoginData & {
                currentTenant: {
                    id: string;
                    name: string;
                    description: string;
                    parent: string;
                };
                defaultTenant: {
                    id: string;
                    name: string;
                    description: string;
                    parent: string;
                };
            };
            error: LoginError;
        };
    };
}

export const LOGIN_MT = gql`
    mutation Login {
        security {
            login {
                data {
                    ... on ${GRAPHQL_IDENTITY_TYPE} {
                        id
                        displayName
                        type
                        currentTenant {
                            id
                            name
                            description
                            parent
                        }
                        defaultTenant {
                            id
                            name
                            description
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

export const LOGIN_ST = gql`
    mutation Login {
        security {
            login {
                data {
                    ... on ${GRAPHQL_IDENTITY_TYPE} {
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

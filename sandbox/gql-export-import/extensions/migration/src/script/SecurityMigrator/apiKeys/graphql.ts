import { ERROR_FIELDS } from "../utils";

const DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on SecurityApiKey {
        id
        name
        description
        token
        permissions
        createdOn
    }
`;

export const CREATE_API_KEY = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    mutation CreateApiKey($data: SecurityApiKeyInput!) {
        security {
            createApiKey(data: $data) {
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

export const LIST_API_KEYS = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query ListApiKeys {
        security {
            listApiKeys {
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

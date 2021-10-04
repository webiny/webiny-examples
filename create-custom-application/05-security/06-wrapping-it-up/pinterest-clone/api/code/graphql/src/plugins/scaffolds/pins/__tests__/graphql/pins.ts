/**
 * Contains all of the GraphQL queries and mutations that we might need while writing our tests.
 * If needed, feel free to add more.
 */

export const GET_PIN = /* GraphQL */ `
    query GetPin($id: ID!) {
        pins {
            getPin(id: $id) {
                id
                title
                description
            }
        }
    }
`;

export const CREATE_PIN = /* GraphQL */ `
    mutation CreatePin($data: PinCreateInput!) {
        pins {
            createPin(data: $data) {
                id
                title
                description
            }
        }
    }
`;

export const UPDATE_PIN = /* GraphQL*/ `
    mutation UpdatePin($id: ID!, $data: PinUpdateInput!) {
        pins {
            updatePin(id: $id, data: $data) {
                id
                title
                description
            }
        }
    }
`;

export const DELETE_PIN = /* GraphQL */ `
    mutation DeletePin($id: ID!) {
        pins {
            deletePin(id: $id) {
                id
                title
                description
            }
        }
    }
`;

export const LIST_PINS = /* GraphQL */ `
    query ListPins($sort: PinsListSort, $limit: Int, $after: String) {
        pins {
            listPins(sort: $sort, limit: $limit, after: $after) {
                data {
                    id
                    title
                    description
                }
                meta {
                    limit
                    after
                    before
                }
            }
        }
    }
`;

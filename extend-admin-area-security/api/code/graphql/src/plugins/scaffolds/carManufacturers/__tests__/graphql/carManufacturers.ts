/**
 * Contains all of the GraphQL queries and mutations that we might need while writing our tests.
 * If needed, feel free to add more.
 */

export const GET_CAR_MANUFACTURER = /* GraphQL */ `
    query GetCarManufacturer($id: ID!) {
        carManufacturers {
            getCarManufacturer(id: $id) {
                id
                title
                description
            }
        }
    }
`;

export const CREATE_CAR_MANUFACTURER = /* GraphQL */ `
    mutation CreateCarManufacturer($data: CarManufacturerCreateInput!) {
        carManufacturers {
            createCarManufacturer(data: $data) {
                id
                title
                description
            }
        }
    }
`;

export const UPDATE_CAR_MANUFACTURER = /* GraphQL*/ `
    mutation UpdateCarManufacturer($id: ID!, $data: CarManufacturerUpdateInput!) {
        carManufacturers {
            updateCarManufacturer(id: $id, data: $data) {
                id
                title
                description
            }
        }
    }
`;

export const DELETE_CAR_MANUFACTURER = /* GraphQL */ `
    mutation DeleteCarManufacturer($id: ID!) {
        carManufacturers {
            deleteCarManufacturer(id: $id) {
                id
                title
                description
            }
        }
    }
`;

export const LIST_CAR_MANUFACTURERS = /* GraphQL */ `
    query ListCarManufacturers($sort: CarManufacturersListSort, $limit: Int, $after: String) {
        carManufacturers {
            listCarManufacturers(sort: $sort, limit: $limit, after: $after) {
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

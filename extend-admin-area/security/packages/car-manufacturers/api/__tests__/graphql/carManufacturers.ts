// We use these fields in every query / mutation below.
const ERROR_FIELDS = /* GraphQL */ `
    {
        code
        message
        data
    }
`;

export const GET_CAR_MANUFACTURER = /* GraphQL */ `
    query GetCarManufacturer(
        $id: ID!
    ) {
        carManufacturers {
            getCarManufacturer(id: $id) {
                data {
                    id
                    title
                    description
                    isNice
                }
                error ${ERROR_FIELDS}
            }
        }
    }
`;

// A basic create "CarManufacturer" mutation.
export const CREATE_CAR_MANUFACTURER = /* GraphQL */ `
    mutation CreateCarManufacturer($data: CarManufacturerCreateInput!) {
        carManufacturers {
            createCarManufacturer(data: $data) {
                data {
                    id
                    title
                    description
                    isNice
                }
                error ${ERROR_FIELDS}
            }
        }
    }
`;

export const UPDATE_CAR_MANUFACTURER = /* GraphQL*/ `
    mutation UpdateCarManufacturer($id: ID!, $data: CarManufacturerUpdateInput!) {
        carManufacturers {
            updateCarManufacturer(id: $id, data: $data) {
                data {
                    id
                    title
                    description
                    isNice
                }
                error ${ERROR_FIELDS}
            }
        }
    }
`;

// A basic delete "CarManufacturer" mutation.
export const DELETE_CAR_MANUFACTURER = /* GraphQL */ `
    mutation DeleteCarManufacturer($id: ID!) {
        carManufacturers {
            deleteCarManufacturer(id: $id) {
                data
                error {
                    message
                    code
                    data
                }
            }
        }
    }
`;

// A basic list "CarManufacturers" query.
export const LIST_CAR_MANUFACTURERS = /* GraphQL */ `
    query ListCarManufacturers(
        $where: CarManufacturerListWhereInput
        $sort: [CarManufacturerListSort!]
        $limit: Int
        $after: String
    ) {
        carManufacturers {
            listCarManufacturers(where: $where, sort: $sort, limit: $limit, after: $after) {
                data {
                    id
                    title
                    description
                    isNice
                }
                error ${ERROR_FIELDS}

            }
        }
    }
`;

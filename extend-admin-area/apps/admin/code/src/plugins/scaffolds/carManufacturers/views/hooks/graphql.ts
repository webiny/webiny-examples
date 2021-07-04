import gql from "graphql-tag";

export const CAR_MANUFACTURER_FIELDS = /* GraphQL */ `
    fragment CarManufacturerFields on CarManufacturer {
        id
        title
        description
        isPopular
        createdOn
        savedOn
        createdBy {
            id
            displayName
            type
        }
    }
`;

export const LIST_CAR_MANUFACTURERS = gql`
    ${CAR_MANUFACTURER_FIELDS}
    query ListCarManufacturers(
        $sort: CarManufacturersListSort
        $limit: Int
        $after: String
        $before: String
    ) {
        carManufacturers {
            listCarManufacturers(sort: $sort, limit: $limit, after: $after, before: $before) {
                data {
                    ...CarManufacturerFields
                }
                meta {
                    before
                    after
                    limit
                }
            }
        }
    }
`;

export const CREATE_CAR_MANUFACTURER = gql`
    ${CAR_MANUFACTURER_FIELDS}
    mutation CreateCarManufacturer($data: CarManufacturerCreateInput!) {
        carManufacturers {
            createCarManufacturer(data: $data) {
                ...CarManufacturerFields
            }
        }
    }
`;

export const GET_CAR_MANUFACTURER = gql`
    ${CAR_MANUFACTURER_FIELDS}
    query GetCarManufacturer($id: ID!) {
        carManufacturers {
            getCarManufacturer(id: $id) {
                ...CarManufacturerFields
            }
        }
    }
`;

export const DELETE_CAR_MANUFACTURER = gql`
    ${CAR_MANUFACTURER_FIELDS}
    mutation DeleteCarManufacturer($id: ID!) {
        carManufacturers {
            deleteCarManufacturer(id: $id) {
                ...CarManufacturerFields
            }
        }
    }
`;

export const UPDATE_CAR_MANUFACTURER = gql`
    ${CAR_MANUFACTURER_FIELDS}
    mutation UpdateCarManufacturer($id: ID!, $data: CarManufacturerUpdateInput!) {
        carManufacturers {
            updateCarManufacturer(id: $id, data: $data) {
                ...CarManufacturerFields
            }
        }
    }
`;

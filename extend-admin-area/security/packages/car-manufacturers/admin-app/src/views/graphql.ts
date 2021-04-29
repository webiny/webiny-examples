import gql from "graphql-tag";

export const LIST_CAR_MANUFACTURERS = gql`
    query ListCarManufacturers(
        $sort: [CarManufacturerListSort!]
        $where: CarManufacturerListWhereInput
        $limit: Int
        $after: String
    ) {
        carManufacturers {
            listCarManufacturers(sort: $sort, where: $where, limit: $limit, after: $after) {
                data {
                    id
                    title
                    description
                    isNice
                    createdOn
                    savedOn
                    createdBy {
                        id
                        displayName
                        type
                    }
                }
                error {
                    message
                    code
                    data
                }
            }
        }
    }
`;

export const CREATE_CAR_MANUFACTURER = gql`
    mutation CreateCarManufacturer($data: CarManufacturerCreateInput!) {
        carManufacturers {
            createCarManufacturer(data: $data) {
                data {
                    id
                    title
                    description
                    isNice
                    createdOn
                    savedOn
                    createdBy {
                        id
                        displayName
                        type
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

export const READ_CAR_MANUFACTURER = gql`
    query GetCarManufacturer($id: ID!) {
        carManufacturers {
            getCarManufacturer(id: $id) {
                data {
                    id
                    title
                    description
                    isNice
                    createdOn
                    savedOn
                    createdBy {
                        id
                        displayName
                        type
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

export const DELETE_CAR_MANUFACTURER = gql`
    mutation DeleteCarManufacturer($id: ID!) {
        carManufacturers {
            deleteCarManufacturer(id: $id) {
                data
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;

export const UPDATE_CAR_MANUFACTURER = gql`
    mutation UpdateCarManufacturer($id: ID!, $data: CarManufacturerUpdateInput!) {
        carManufacturers {
            updateCarManufacturer(id: $id, data: $data) {
                data {
                    id
                    title
                    description
                    isNice
                    createdOn
                    savedOn
                    createdBy {
                        id
                        displayName
                        type
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

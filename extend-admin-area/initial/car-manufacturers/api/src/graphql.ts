const graphql = /* GraphQL */ `
    # response for the delete mutation
    type CarManufacturerDeleteResponse {
        data: Boolean
        error: CarManufacturerError
    }
    # meta property containing:
    #   cursor - the last carManufacturer received in the list
    #   hasMoreItems - if there are more carManufacturers to load
    #   totalCount - total amount of carManufacturers that can be fetched with given query
    type CarManufacturerListMeta {
        cursor: String
        hasMoreItems: Boolean!
        totalCount: Int!
    }
    # response error definition
    type CarManufacturerError {
        code: String!
        message: String!
        data: JSON
    }
    # carManufacturer is created by whom?
    type CarManufacturerCreatedByResponse {
        id: String!
        displayName: String!
        type: String!
    }
    # carManufacturer definition
    type CarManufacturer {
        id: ID!
        createdOn: DateTime!
        savedOn: DateTime!
        createdBy: CarManufacturerCreatedByResponse!
        title: String!
        description: String
        isNice: Boolean!
    }
    # input definition when creating the carManufacturer
    input CarManufacturerCreateInput {
        title: String!
        description: String
        isNice: Boolean
    }
    # input definition when updating the carManufacturer
    input CarManufacturerUpdateInput {
        title: String
        description: String
        isNice: Boolean
    }
    # possible where filters when listing carManufacturers
    input CarManufacturerListWhereInput {
        # system fields
        id: String
        id_in: [String!]
        id_not: String
        id_not_in: [String!]
        savedOn_gt: DateTime
        savedOn_lt: DateTime
        createdOn_gt: DateTime
        createdOn_lt: DateTime

        # custom fields
        title_contains: String
        title_not_contains: String
        isNice: Boolean
    }
    # possible sort options when listing carManufacturers
    enum CarManufacturerListSort {
        title_ASC
        title_DESC
        createdOn_ASC
        createdOn_DESC
        savedOn_ASC
        savedOn_DESC
    }
    # Response type when querying targe
    type CarManufacturerResponse {
        data: CarManufacturer
        error: CarManufacturerError
    }
    # Response type when listing carManufacturers
    type CarManufacturerListResponse {
        data: [CarManufacturer]
        meta: CarManufacturerListMeta
        error: CarManufacturerError
    }
    # A type definition to add the Elasticsearch index
    type CarManufacturerInstallResponse {
        data: Boolean
        error: CarManufacturerError
    }
    # A type definition to remove the Elasticsearch index
    type CarManufacturerUninstallResponse {
        data: Boolean
        error: CarManufacturerError
    }

    type CarManufacturerQuery {
        getCarManufacturer(id: ID!): CarManufacturerResponse!

        listCarManufacturers(
            where: CarManufacturerListWhereInput
            sort: [CarManufacturerListSort!]
            limit: Int
            after: String
        ): CarManufacturerListResponse!

        isInstalled: CarManufacturerInstallResponse!
    }

    type CarManufacturerMutation {
        createCarManufacturer(data: CarManufacturerCreateInput!): CarManufacturerResponse!

        updateCarManufacturer(id: ID!, data: CarManufacturerUpdateInput!): CarManufacturerResponse!

        deleteCarManufacturer(id: ID!): CarManufacturerDeleteResponse!

        install: CarManufacturerInstallResponse!

        uninstall: CarManufacturerUninstallResponse!
    }
    # We need to extend the original Query with carManufacturers so we can write a query like { carManufacturers: { listCarManufacturers {...} } }
    extend type Query {
        carManufacturers: CarManufacturerQuery
    }
    # We need to extend the original Mutation with carManufacturers so we can write a mutation like { carManufacturers: { createCarManufacturer {...} } }
    extend type Mutation {
        carManufacturers: CarManufacturerMutation
    }
`;
export default graphql;

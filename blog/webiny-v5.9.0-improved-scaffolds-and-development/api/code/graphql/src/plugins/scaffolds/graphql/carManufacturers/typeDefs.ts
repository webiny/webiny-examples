export default /* GraphQL */ `
    type CarManufacturer {
        id: ID!
        title: String!
        description: String
        
        # Added a new GraphQL type field.
        isPopular: Boolean
        
        createdOn: DateTime!
        savedOn: DateTime!
        createdBy: CarManufacturerCreatedBy
    }

    type CarManufacturerCreatedBy {
        id: String!
        type: String!
        displayName: String!
    }
    
    input CarManufacturerCreateInput {
        title: String!
        description: String
        
        # Added a new GraphQL input field.
        isPopular: Boolean
    }

    input CarManufacturerUpdateInput {
        title: String
        description: String
        
        # Added a new GraphQL input field.
        isPopular: Boolean
    }

    type CarManufacturersListMeta {
        limit: Number
        before: String
        after: String
    }

    enum CarManufacturersListSort {
        createdOn_ASC
        createdOn_DESC
    }

    type CarManufacturersList {
        data: [CarManufacturer]
        meta: CarManufacturersListMeta
    }

    type CarManufacturerQuery {
        getCarManufacturer(id: ID!): CarManufacturer
        listCarManufacturers(
            limit: Int
            before: String
            after: String
            sort: CarManufacturersListSort
        ): CarManufacturersList!
    }

    type CarManufacturerMutation {
        # Creates and returns a new CarManufacturer entry.
        createCarManufacturer(data: CarManufacturerCreateInput!): CarManufacturer!

        # Updates and returns an existing CarManufacturer entry.
        updateCarManufacturer(id: ID!, data: CarManufacturerUpdateInput!): CarManufacturer!

        # Deletes and returns an existing CarManufacturer entry.
        deleteCarManufacturer(id: ID!): CarManufacturer!
    }

    extend type Query {
        carManufacturers: CarManufacturerQuery
    }

    extend type Mutation {
        carManufacturers: CarManufacturerMutation
    }
`;

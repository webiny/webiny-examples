export default /* GraphQL */ `
    type Pin {
        id: ID!
        title: String!
        description: String
        coverImage: String
        createdOn: DateTime!
        savedOn: DateTime!
        createdBy: PinCreatedBy
    }

    type PinCreatedBy {
        id: String!
        type: String!
        displayName: String!
    }

    input PinCreateInput {
        title: String!
        description: String
        coverImage: String
    }

    input PinUpdateInput {
        title: String
        description: String
        coverImage: String
    }

    type PinsListMeta {
        limit: Number
        before: String
        after: String
    }

    enum PinsListSort {
        createdOn_ASC
        createdOn_DESC
    }

    type PinsList {
        data: [Pin]
        meta: PinsListMeta
    }

    input PreSignedPostPayloadInput {
        name: String!
        type: String!
        size: Int!
    }

    type CreatePreSignedPostPayloadResponseFile {
        name: String
        type: String
        size: Int
        key: String
    }

    type CreatePreSignedPostPayloadResponse {
        # Contains data that is necessary for initiating a file upload.
        data: JSON
        file: CreatePreSignedPostPayloadResponseFile
    }

    type PinQuery {
        getPin(id: ID!): Pin
        listPins(limit: Int, before: String, after: String, sort: PinsListSort): PinsList!
    }

    type PinMutation {
        # Creates and returns a new Pin entry.
        createPin(data: PinCreateInput!): Pin!

        # Updates and returns an existing Pin entry.
        updatePin(id: ID!, data: PinUpdateInput!): Pin!

        # Deletes and returns an existing Pin entry.
        deletePin(id: ID!): Pin!
        
        # Returns Pre-signed Post Payload data which enables the client to upload files.
        createPreSignedPostPayload(data: PreSignedPostPayloadInput!): CreatePreSignedPostPayloadResponse
    }

    extend type Query {
        pins: PinQuery
    }

    extend type Mutation {
        pins: PinMutation
    }
`;

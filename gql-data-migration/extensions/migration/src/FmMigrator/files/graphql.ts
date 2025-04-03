export const SOURCE_ERROR_FIELDS = `
    fragment ErrorFields on FileError {
        code
        data
        message
    }
`;

export const TARGET_ERROR_FIELDS = `
    fragment ErrorFields on FmError {
        code
        data
        message
    }
`;

const SOURCE_DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on File {
        id
        key
        name
        size
        type
        tags
        aliases
        createdOn
        createdBy {
            id
            displayName
        }
        src
    }
`;

const TARGET_DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on FmFile {
        id
        key
        name
        size
        type
        tags
        aliases
        createdOn
        createdBy {
            id
            displayName
            type
        }
        meta {
            private
            width
            height
            originalKey
        }
        src
        location {
            folderId
        }
    }
`;

export const CREATE_FILE = `
    ${TARGET_DATA_FIELDS}
    ${TARGET_ERROR_FIELDS}
    mutation CreateFile($data: FmFileCreateInput!) {
        fileManager {
            createFile(data: $data) {
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

export const LIST_FILES = `
    ${SOURCE_DATA_FIELDS}
    ${SOURCE_ERROR_FIELDS}
    query ListFiles($search: String, $limit: Int, $after: String, $where: FileWhereInput) {
        fileManager {
            listFiles(search: $search, limit: $limit, after: $after, where: $where) {
                data {
                    ...DataFields
                }
                meta {
                    cursor
                    totalCount
                    hasMoreItems
                }
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

export const GET_PRESIGNED_POST_PAYLOAD = /* GraphQL */ `
    query getPreSignedPostPayload($data: PreSignedPostPayloadInput!) {
        fileManager {
            getPreSignedPostPayload(data: $data) {
                data {
                    data
                    file {
                        id
                        type
                        name
                        size
                        key
                    }
                }
                error {
                    message
                }
            }
        }
    }
`;

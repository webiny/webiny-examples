import { ERROR_FIELDS } from "../utils";

export const DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on PbPage {
        id
        pid
        editor
        category {
            slug
        }
        version
        title
        path
        url
        content
        savedOn
        status
        locked
        publishedOn
        revisions {
            id
            status
            locked
            version
        }
        settings {
            general {
                snippet
                tags
                layout
                image {
                    id
                    src
                }
            }
            social {
                meta {
                    property
                    content
                }
                title
                description
                image {
                    id
                    src
                }
            }
            seo {
                title
                description
                meta {
                    name
                    content
                }
            }
            brand {
                buttonColor
                buttonHoverColor
                pictogramStrokeColor
                pictogramCircleColor
                employerNickname
                employerFullName
                employerUuid
                isTaxGrossUp
            }
        }
        createdFrom
        createdOn
        createdBy {
            id
            displayName
            type
        }
    }
`;

export const CREATE_PAGE = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    mutation CreatePageV2($data: PbCreatePageV2Input!, $meta: JSON) {
        pageBuilder {
            createPageV2(data: $data, meta: $meta) {
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

export const LIST_PAGES_ACO_RECORDS = /* GraphQL */ `
    query ListRecords($where: SearchRecordListWhereInput, $limit: Int, $after: String) {
        search {
            listRecords(where: $where, limit: $limit, after: $after) {
                data {
                    id
                    location {
                        folderId
                    }
                    data
                }
                meta {
                    cursor
                    totalCount
                    hasMoreItems
                }
                error {
                    code
                    data
                    message
                }
            }
        }
    }
`;

export const GET_PAGE = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query GetPage($id: ID!) {
        pageBuilder {
            getPage(id: $id) {
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

export const GET_PUBLISHED_PAGE = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query GetPublishedPage($id: ID!) {
        pageBuilder {
            getPublishedPage(id: $id) {
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

export const GET_SETTINGS = /* GraphQL */ `
    ${ERROR_FIELDS}
    query GetSettings($id: ID!) {
        pageBuilder {
            getSettings(id: $id) {
                data {
                    pages
                }
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;
export const RENDER_PAGE = /* GraphQL */ `
    ${ERROR_FIELDS}
    mutation RenderPage($id: ID!) {
        pageBuilder {
            rerenderPage(id: $id) {
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

export const LIST_FOLDERS = /* GraphQL */ `
    query ListFolders($type: String!, $limit: Int) {
        aco {
            listFolders(where: { type: $type }, limit: $limit) {
                data {
                    id
                    title
                    slug
                    parentId
                    type
                    savedOn
                    createdOn
                    createdBy {
                        id
                        displayName
                    }
                }
                error {
                    code
                    data
                    message
                }
            }
        }
    }
`;

export const CREATE_FOLDER = /* GraphQL */ `
    mutation CreateFolder($data: FolderCreateInput!) {
        aco {
            createFolder(data: $data) {
                data {
                    id
                    title
                    slug
                    type
                    parentId
                }
                error {
                    code
                    data
                    message
                }
            }
        }
    }
`;

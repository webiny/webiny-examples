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
    mutation CreatePageV2($data: PbCreatePageV2Input!) {
        pageBuilder {
            createPageV2(data: $data) {
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

export const LIST_PAGES = /* GraphQL */ `
    ${ERROR_FIELDS}

    query ListPages(
        $where: PbListPagesWhereInput
        $limit: Int
        $after: String
        $sort: [PbListPagesSort!]
        $search: PbListPagesSearchInput
    ) {
        pageBuilder {
            listPages(where: $where, limit: $limit, after: $after, sort: $sort, search: $search) {
                data {
                    id
                }

                meta {
                    cursor
                    hasMoreItems
                    totalCount
                }
                error {
                    ...ErrorFields
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

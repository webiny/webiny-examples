import { ERROR_FIELDS } from "../utils";

const DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on PbCategory {
        createdOn
        createdBy {
            id
            displayName
            type
        }
        name
        slug
        url
        layout
    }
`;

export const CREATE_CATEGORY = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    mutation CreateCategory($data: PbCategoryInput!) {
        pageBuilder {
            createCategory(data: $data) {
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

export const LIST_CATEGORIES = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query ListCategories {
        pageBuilder {
            listCategories {
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

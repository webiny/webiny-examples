import { ERROR_FIELDS } from "../utils";

const DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on PbMenu {
        slug
        description
        title
        items
        createdOn
        createdBy {
            id
            displayName
            type
        }
    }
`;

export const CREATE_MENU = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    mutation CreateMenu($data: PbMenuInput!) {
        pageBuilder {
            createMenu(data: $data) {
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

export const LIST_MENUS = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query ListMenus {
        pageBuilder {
            listMenus {
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

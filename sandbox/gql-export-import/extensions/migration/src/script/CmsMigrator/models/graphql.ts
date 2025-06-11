import { ERROR_FIELDS } from "../utils";

const DATA_FIELDS = /* GraphQL */ `
    fragment DataFields on CmsContentModel {
        name
        singularApiName
        pluralApiName
        modelId
        description
        group {
            id
            slug
        }
        icon
        createdOn
        savedOn
        createdBy {
            id
            displayName
            type
        }
        fields {
            id
            label
            helpText
            placeholderText
            storageId
            fieldId
            type
            multipleValues
            predefinedValues {
                enabled
                values {
                    label
                    value
                }
            }
            renderer {
                name
            }
            validation {
                name
                message
                settings
            }
            listValidation {
                name
                message
                settings
            }
            settings
        }
        layout
        titleFieldId
        descriptionFieldId
        imageFieldId
        tags
        plugin
    }
`;

export const CREATE_MODEL = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    mutation CmsCreateContentModel($data: CmsContentModelCreateInput!) {
        createContentModel(data: $data) {
            data {
                ...DataFields
            }
            error {
                ...ErrorFields
            }
            __typename
        }
    }
`;

export const LIST_MODELS = /* GraphQL */ `
    ${DATA_FIELDS}
    ${ERROR_FIELDS}
    query CmsListContentModels {
        listContentModels {
            data {
                ...DataFields
            }
            error {
                ...ErrorFields
            }
        }
    }
`;

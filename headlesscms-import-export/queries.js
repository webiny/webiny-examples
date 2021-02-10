const gql = require("graphql-tag");

const LIST_CONTENT_MODELS_WITH_GROUPS = gql`
    {
        listContentModelGroups {
            data {
                id
                name
                icon
                slug
                description
            }
        }
        listContentModels {
            data {
                name
                modelId
                description
                group {
                    id
                }
                fields {
                    id
                    fieldId
                    label
                    helpText
                    placeholderText
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
            }
        }
    }
`;

const CREATE_CONTENT_MODEL_GROUP = gql`
    mutation CmsCreateContentModelGroup($data: CmsContentModelGroupInput!) {
        createContentModelGroup(data: $data) {
            data {
                id
            }
            error {
                code
                message
                data
            }
        }
    }
`;

const CREATE_CONTENT_MODEL = gql`
    mutation CmsCreateContentModel($data: CmsContentModelCreateInput!) {
        createContentModel(data: $data) {
            data {
                modelId
            }
            error {
                code
                message
                data
            }
        }
    }
`;

const UPDATE_CONTENT_MODEL = gql`
    mutation CmsUpdateContentModel($modelId: ID!, $data: CmsContentModelUpdateInput!) {
        updateContentModel(modelId: $modelId, data: $data) {
            data {
                modelId
            }
            error {
                code
                message
                data
            }
        }
    }
`;

const DELETE_CONTENT_MODEL = gql`
    mutation CmsDeleteContentModel($modelId: ID!) {
        deleteContentModel(modelId: $modelId) {
            data
            error {
                code
                message
                data
            }
        }
    }
`;

module.exports = {
    CREATE_CONTENT_MODEL_GROUP,
    CREATE_CONTENT_MODEL,
    UPDATE_CONTENT_MODEL,
    DELETE_CONTENT_MODEL,
    LIST_CONTENT_MODELS_WITH_GROUPS,
};

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
                    slug
                    icon
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

module.exports = {
    LIST_CONTENT_MODELS_WITH_GROUPS,
    CREATE_CONTENT_MODEL_GROUP,
    CREATE_CONTENT_MODEL,
};

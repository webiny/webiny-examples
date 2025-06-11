type CmsContentModel = Record<string, any>;

export function createFieldsList(model: CmsContentModel): string {
    return model.fields.map((field: Record<string, any>) => {
        if (field.type === "ref") {
            return `${field.fieldId} { modelId id }`;
        }

        if (field.type === "object") {
            return `${field.fieldId} { ${createFieldsList(field.settings)} }`;
        }
        return field.fieldId;
    });
}

const SOURCE_SYS_FIELDS = /* GraphQL */ `
        id
        entryId
        savedOn
        createdOn
        createdBy {
            id
            type
            displayName
        }
        ownedBy {
            id
            type
            displayName
        }
        meta {
            title
            description
            image
            publishedOn
            version
            locked
            status
        }
    `;

const TARGET_SYS_FIELDS = /* GraphQL */ `
        id
        entryId
        createdOn
        savedOn
        modifiedOn,
        deletedOn
        firstPublishedOn
        lastPublishedOn
        createdBy {
            id
            type
            displayName
        }
        savedBy {
            id
            type
            displayName
        }
        modifiedBy {
            id
            type
            displayName
        }
        deletedBy {
            id
            type
            displayName
        }
        firstPublishedBy {
            id
            type
            displayName
        }
        lastPublishedBy {
            id
            type
            displayName
        }
        wbyAco_location {
            folderId
        }
        meta {
            title
            description
            image
            version
            locked
            status
        }
    `;

const ERROR_FIELD = /* GraphQL */ `
    {
        message
        code
        data
    }
`;

export const createListEntriesQuery = (model: CmsContentModel) => {
    return /* GraphQL */ `
        query CmsEntriesList${model.pluralApiName}($where: ${
        model.singularApiName
    }ListWhereInput, $limit: Int, $after: String) {
            content: list${model.pluralApiName}(
            where: $where
            limit: $limit
            after: $after) {
                data {
                    ${SOURCE_SYS_FIELDS}
                    ${createFieldsList(model)}
                   
                }
                meta {
                    cursor
                    hasMoreItems
                    totalCount
                }
                error ${ERROR_FIELD}
            }
        }
    `;
};
export const createListPublishedEntriesQuery = (model: CmsContentModel) => {
    return /* GraphQL */ `
        query GetPublishedContentEntries($entries: [CmsModelEntryInput!]!) {
            content: getPublishedContentEntries(entries: $entries) {
                data {
                    id
                    entryId
                }
            }
        }
    `;
};

export const createGetEntryQuery = (model: CmsContentModel) => {
    return /* GraphQL */ `
        query CmsEntriesGet${model.singularApiName}($revision: ID, $entryId: ID) {
            content: get${model.singularApiName}(revision: $revision, entryId: $entryId) {
                data {
                    ${SOURCE_SYS_FIELDS}
                    ${createFieldsList(model)}
                }
                error ${ERROR_FIELD}
            }
        }
    `;
};

export const createCreateEntryMutation = (model: CmsContentModel) => {
    return /* GraphQL */ `
        mutation CmsEntriesCreate${model.singularApiName}($data: ${
        model.singularApiName
    }Input!, $options: CreateCmsEntryOptionsInput) {
            content: create${model.singularApiName}(data: $data, options: $options) {
                data {
                    ${TARGET_SYS_FIELDS}
                    ${createFieldsList(model)}
                }
                error ${ERROR_FIELD}
            }
        }
    `;
};

export const createCreateEntryFromMutation = (model: CmsContentModel) => {
    return /* GraphQL */ `
        mutation CmsEntriesCreate${model.singularApiName}From($revision: ID!, $data: ${
        model.singularApiName
    }Input!, $options: CreateRevisionCmsEntryOptionsInput) {
            content: create${
                model.singularApiName
            }From(revision: $revision, data: $data, options: $options) {
                data {
                    ${TARGET_SYS_FIELDS}
                    ${createFieldsList(model)}
                }
                error ${ERROR_FIELD}
            }
        }
    `;
};

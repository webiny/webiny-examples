export const languageSchema = /* GraphQL */ `
    type Language {
        name: String!
        code: String!
        direction: String!
        isBaseLanguage: Boolean!
    }

    type TranslationLanguagesResponse {
        data: [Language!]
        error: CmsError
    }

    input CreateLanguageInput {
        name: String!
        code: String!
        direction: String!
        isBaseLanguage: Boolean!
    }

    input UpdateLanguageInput {
        name: String
        direction: String
        isBaseLanguage: Boolean
    }

    type CreateLanguageResponse {
        data: Language
        error: CmsError
    }

    type UpdateLanguageResponse {
        data: Language
        error: CmsError
    }

    type DeleteLanguageResponse {
        data: Boolean
        error: CmsError
    }

    extend type TranslationsQuery {
        listLanguages: TranslationLanguagesResponse
    }

    extend type TranslationsMutation {
        createLanguage(data: CreateLanguageInput!): CreateLanguageResponse
        updateLanguage(code: String!, data: UpdateLanguageInput!): UpdateLanguageResponse
        deleteLanguage(code: String!): DeleteLanguageResponse
    }
`;

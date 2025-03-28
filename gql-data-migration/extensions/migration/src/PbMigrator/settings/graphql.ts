export const ERROR_FIELDS = /*GraphQL*/ `
    fragment ErrorFields on PbSettingsError {
        code
        data
        message
    }
`;

export const GET_SETTINGS = /* GraphQL */ `
    ${ERROR_FIELDS}
    query GetSettings {
        pageBuilder {
            getSettings {
                data {
                    name
                    logo {
                        id
                        src
                    }
                    favicon {
                        id
                        src
                    }
                    websiteUrl
                    websitePreviewUrl
                    htmlTags {
                        header
                        footer
                    }
                    pages {
                        home
                        notFound
                    }
                    social {
                        instagram
                        facebook
                        twitter
                        image {
                            src
                            id
                        }
                    }
                }
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

export const UPDATE_SETTINGS = /* GraphQL */ `
    ${ERROR_FIELDS}
    mutation UpdateSettings($data: PbSettingsInput!) {
        pageBuilder {
            updateSettings(data: $data) {
                error {
                    ...ErrorFields
                }
            }
        }
    }
`;

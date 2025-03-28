export const GET_SETTINGS = /* GraphQL */ `
    query GetFileManagerSettings {
        fileManager {
            getSettings {
                data {
                    uploadMinFileSize
                    uploadMaxFileSize
                    srcPrefix
                }
            }
        }
    }
`;

export const UPDATE_SETTINGS = /* GraphQL */ `
    mutation UpdateFileManagerSettings($data: FmSettingsInput) {
        fileManager {
            updateSettings(data: $data) {
                data {
                    uploadMinFileSize
                    uploadMaxFileSize
                    srcPrefix
                }
            }
        }
    }
`;

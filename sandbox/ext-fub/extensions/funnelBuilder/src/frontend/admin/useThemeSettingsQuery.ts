import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { ThemeSettings } from "../../shared/types";

export const GET_CURRENT_THEME_SETTINGS = gql`
    query GetThemeSettings {
        themeSettings {
            data {
                id
                theme {
                    primaryColor
                    secondaryColor
                    logo
                }
            }
            error {
                code
                message
                data
            }
        }
    }
`;

interface GetThemeSettingsResponse {
    themeSettings: {
        data: ThemeSettings | undefined;
        error:
            | undefined
            | {
                  code: string;
                  message: string;
                  data: Record<string, any>;
              };
    };
}

export function useThemeSettingsQuery() {
    const query = useQuery<GetThemeSettingsResponse>(GET_CURRENT_THEME_SETTINGS);

    const { data, error, loading } = query;

    if (loading) {
        return {
            themeSettings: undefined,
            error: undefined,
            loading: true
        };
    }

    if (!data) {
        return {
            themeSettings: undefined,
            error: error,
            loading: false
        };
    }

    const response = data.themeSettings;

    return {
        themeSettings: response.data,
        error: response.error,
        loading
    };
}

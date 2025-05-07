import { createGraphQLSchemaPlugin } from "@webiny/api-serverless-cms";
import { Response, ErrorResponse } from "@webiny/handler-graphql";

const fallbackResult = {
    id: "fallback",
    theme: {
        primaryColor: "#fa5723",
        secondaryColor: "#00ccb0",
        logo: ""
    }
};

export const getThemeSettings = () => {
    return createGraphQLSchemaPlugin({
        typeDefs: /* GraphQL */ `
            type ThemeSettingsError {
                code: String
                message: String
                data: JSON
                stack: String
            }

            type ThemeSettingsTheme {
                primaryColor: String!
                secondaryColor: String!
                logo: String
            }

            type ThemeSettings {
                id: ID
                theme: ThemeSettingsTheme
            }

            type ThemeSettingsResponse {
                data: ThemeSettings
                error: ThemeSettingsError
            }
            extend type Query {
                themeSettings: ThemeSettingsResponse
            }
        `,
        resolvers: {
            Query: {
                themeSettings: async (_, __, context) => {
                    try {
                        const themeSettings = await context.security.withoutAuthorization(
                            async () => {
                                const themeSettingsModel = await context.cms.getModel(
                                    "themeSettings"
                                );
                                const themeSettingsEntry =
                                    await context.cms.getSingletonEntryManager(themeSettingsModel);
                                const settings = await themeSettingsEntry.get();

                                return {
                                    ...fallbackResult,
                                    theme: {
                                        ...fallbackResult.theme,
                                        ...(settings.values.theme || {})
                                    }
                                };
                            }
                        );

                        return new Response(themeSettings);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                }
            }
        }
    });
};

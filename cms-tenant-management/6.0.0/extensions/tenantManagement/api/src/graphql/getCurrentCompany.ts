import { GraphQLSchemaPlugin, Response, ErrorResponse } from "@webiny/handler-graphql";
import { Context } from "../types";
import { GetCompanyById } from "../useCases/GetCompanyById";

export const getCurrentCompany = () => {
    return new GraphQLSchemaPlugin<Context>({
        typeDefs: /* GraphQL */ `
            type CompanyError {
                code: String
                message: String
                data: JSON
                stack: String
            }

            type CompanyTheme {
                websiteTitle: String!
                primaryColor: String!
                additionalColors: [String!]
                font: String
            }

            type Company {
                id: ID!
                name: String!
                description: String!
                theme: CompanyTheme!
            }

            type CompanyResponse {
                data: Company
                error: CompanyError
            }

            type CompanyThemeResponse {
                data: CompanyTheme
                error: CompanyError
            }

            extend type Query {
                currentCompany: CompanyResponse
            }
        `,
        resolvers: {
            Query: {
                currentCompany: async (_, __, context) => {
                    try {
                        const tenant = context.tenancy.getCurrentTenant();
                        const getCompany = new GetCompanyById(context);
                        const company = await getCompany.execute(tenant.id);

                        return new Response(company);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                }
            }
        }
    });
};

import { GraphQLSchemaPlugin, Response, ErrorResponse } from "@webiny/handler-graphql";
import { CreateAndInstallTenant } from "./useCases/CreateAndInstallTenant";
import { Context } from "./types";

export const installTenant = () => {
    return new GraphQLSchemaPlugin<Context>({
        typeDefs: /* GraphQL */ `
            type GenericError {
                code: String
                message: String
                data: JSON
                stack: String
            }

            type BooleanResponse {
                data: Boolean
                error: GenericError
            }
            extend type Mutation {
                installCompanyTenant(companyId: ID!): BooleanResponse
            }
        `,
        resolvers: {
            Mutation: {
                installCompanyTenant: async (_, args, context) => {
                    try {
                        const { companyId } = args as { companyId: string };
                        await new CreateAndInstallTenant(context).execute(companyId);
                        return new Response(true);
                    } catch (e) {
                        return new ErrorResponse(e);
                    }
                }
            }
        }
    });
};

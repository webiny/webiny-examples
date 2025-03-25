import { BeforeHandlerPlugin } from "@webiny/handler";

interface GqlQueryObject {
    operationName: string;
    variables: Record<string, any>;
    query: string;
}

// A single GraphQL query body can contain multiple queries.
type GqlRequestBody = GqlQueryObject[];

// An extension that disables GraphQL introspection queries.
export const createExtension = () => {
    return [
        new BeforeHandlerPlugin(async context => {
            const { request } = context;

            const gqlRequestBody = request.body as GqlRequestBody;
            if (!Array.isArray(gqlRequestBody)) {
                return;
            }

            for (const gqlQueryObject of gqlRequestBody) {
                const query = gqlQueryObject.query;
                if (typeof query !== "string") {
                    continue;
                }

                // Check if the query contains the "__schema" keyword.
                // If it does, it's an introspection query.
                if (!query.includes("__schema")) {
                    continue;
                }

                // Respond with a 403 status code if an introspection query is detected
                context.reply
                    .send({
                        message: "Forbidden to execute introspection queries."
                    })
                    .status(403)
                    .hijack();
                break;
            }
        })
    ];
};

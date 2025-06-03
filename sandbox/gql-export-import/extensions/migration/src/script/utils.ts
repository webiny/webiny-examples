import { GraphQLClient } from "graphql-request";
import pRetry from "p-retry";

export class GqlClient {
    gqlClient: GraphQLClient;
    defaultHeaders: Record<string, string>;

    constructor(apiUrl: string, apiKey: string, tenantId: string) {
        this.defaultHeaders = {
            Authorization: apiKey,
            "x-tenant": tenantId
        };

        this.gqlClient = new GraphQLClient(apiUrl, {
            headers: this.defaultHeaders
        });
    }

    run<TResponse = Record<string, any>>(
        query: string,
        variables?: Record<string, any>,
        headers: Record<string, string> = {}
    ): Promise<TResponse> {
        return pRetry<TResponse>(
            () => this.gqlClient.request(query, variables, { ...this.defaultHeaders, ...headers }),
            {
                onFailedAttempt: error => {
                    console.log(error.message);
                    console.log(
                        `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
                    );
                }
            }
        );
    }
}

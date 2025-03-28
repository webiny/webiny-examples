import { GraphQLClient } from "graphql-request";
import pRetry from "p-retry";

export class GqlClient {
    gqlClient: GraphQLClient;

    constructor(apiUrl: string, apiKey: string) {
        this.gqlClient = new GraphQLClient(apiUrl, {
            headers: {
                Authorization: apiKey
            }
        });
    }

    run<TResponse = Record<string, any>>(query: string, variables?: Record<string, any>) {
        return pRetry<TResponse>(() => this.gqlClient.request(query, variables), {
            onFailedAttempt: error => {
                console.log(error.message);
                console.log(
                    `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
                );
            }
        });
    }
}

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

// Your Content Delivery API URL.
const CONTENT_DELIVERY_API_URL = "...";

// Your Content Delivery API Access Token.
const CONTENT_DELIVERY_API_ACCESS_TOKEN = "...";

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: CONTENT_DELIVERY_API_URL
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const accessToken = CONTENT_DELIVERY_API_ACCESS_TOKEN;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `${accessToken}` : ""
        }
    };
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
});

export default apolloClient;

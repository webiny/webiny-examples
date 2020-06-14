import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

// Your Content Delivery API URL.
const CONTENT_DELIVERY_API_URL = '...';

// Your Content Delivery API Access Token.
const CONTENT_DELIVERY_API_ACCESS_TOKEN = '...';

export function provideApollo(httpLink: HttpLink) {
    const basic = setContext((operation, context) => ({
        headers: {
            Accept: 'charset=utf-8'
        }
    }));

    // Get the authentication token from local storage if it exists
    const accessToken = CONTENT_DELIVERY_API_ACCESS_TOKEN;

    // get the authentication token from local storage if it exists 
    const auth = setContext((operation, context) => ({
        headers: {
            Authorization: accessToken ? accessToken : ""
        },
    }));

    // HTTP connection to the API
    // You should use an absolute URL here
    const http_link = httpLink.create({ uri: CONTENT_DELIVERY_API_URL })

    const link = ApolloLink.from([basic, auth, http_link]);

    // Cache implementation
    const cache = new InMemoryCache();


    // Create the apollo client
    return {
        link,
        cache
    }
}
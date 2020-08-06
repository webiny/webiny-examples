import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

// Your Content Delivery API URL.
const CONTENT_DELIVERY_API_URL =
  'https://d1o9cpe51lhjy.cloudfront.net/cms/read/production';

// Your Content Delivery API Access Token.
const CONTENT_DELIVERY_API_ACCESS_TOKEN =
  '809f39a2ed8f5d1f0d84bc8c28da612e24765c857e78e62e';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: CONTENT_DELIVERY_API_URL,
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const accessToken = CONTENT_DELIVERY_API_ACCESS_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `${accessToken}` : '',
    },
  };
});

// Cache implementation
const cache = new InMemoryCache();

// Create the client as outlined in the setup guide
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;

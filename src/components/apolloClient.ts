import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://gql.hashnode.com/?source=legacy-api-page',
  cache: new InMemoryCache()
});

export default client;
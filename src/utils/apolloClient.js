import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: `${process.env.REACT_APP_STRAPI_URL}/graphql`,
    cache: new InMemoryCache(),
    headers: {}
});

export default apolloClient;
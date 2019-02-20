import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

    // local data for browser managed by apollo/graphql
    //we do not actually pass any variables, only the apollo client 
    // which is destructured to pull cartOpen value from cache
    
function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            //toggle cart state
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
    defaults: {
      cartOpen: false,
    },
  },
  });
}

export default withApollo(createClient);
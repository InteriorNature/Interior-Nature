import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import Order from './Order.js';

const MULTIPLE_ORDERS_QUERY = gql`
  query MULTIPLE_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
        id
        charge
        total
        createdAt
    }
  }
`;

class OrdersList extends React.Component {
  render() {
    return (
      <Query query={MULTIPLE_ORDERS_QUERY}>
        {({ data: { orders }, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
            return (
              <div>
                <p>You have {orders.length} orders</p>
                { 
                  orders.map(order => (
          			  <div>
          			      <Order id={ order.id } />
          			  </div>
                ))}
              </div>
            );
        }}
      </Query>
   );
}
};


export default OrdersList;
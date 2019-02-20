import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}
/*TakeMyMoney is used as a wrapper of other components (in this case a Checkout button). That means 
<p>this.props.children</p> says to render whatever items/css as they are in the other component
<StripeCheckout replaces the <p> in order to create actions*/
class TakeMyMoney extends React.Component {
  onToken = async (res, createOrder) => {
  	NProgress.start();
    console.log('On Token Called!');
    console.log(res.id);
    //manually call the the mutation once we have the Stripe charge token
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
    //console.log(order);
    Router.push({
    	pathname: '/order',
    	query: { id: order.data.createOrder.id }
    })
  };
  // "if loading" added after running jest  - should have
  // been there!
  render() {
    return (
      <User>
        {({ data: { me }, loading }) => {
          if (loading) return null;
          return (
        <Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
        {(createOrder) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Interior Nature"
            description={`Order of ${totalItems(me.cart)} items!`}
            image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_ru6o6gu0rKss6n7PnmyjYpQ5"
            currency="USD"
            email={me.email}
            token={res => this.onToken(res, createOrder)}
          >
            {this.props.children}
          </StripeCheckout>
        )}
        </Mutation>
        );}}
      </User>
    );
  }
}

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
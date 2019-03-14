import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

//access user current user in any component thru the CURRENT_USER_QUERY
const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id 
        quantity
        item {
          id 
          price 
          image 
          title 
          description
        }
      }
    }
  }
`;

// enables us to access the User info anywhere needed
//the user props are now accessible thru the User component
//we will fetch it the query thru many places - render prop the apollo payload
//generated thru the graphql query resolver
const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
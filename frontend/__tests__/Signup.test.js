import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import Signup, { SIGNUP_MUTATION } from '../components/Signup';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

function type(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value },
  });
}
//order of variables being passed in state has to match request
//some bug workaround
const me = fakeUser();
const mocks = [
  // signup mock mutation
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password: 'wes',
      },
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // current user query mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } },
  },
];

describe('<Signup/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    let apolloClient; //to manually query apollo like we did in Search.js
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    //console.log(ApolloClient);
    wrapper.update();
    type(wrapper, 'name', me.name);
    type(wrapper, 'email', me.email);
    type(wrapper, 'password', 'wes');
    wrapper.update();
    wrapper.find('form').simulate('submit');
    //make sure query is happening in right order
    await wait();
    // query the user out of the apollo client
    // signup uses refetchqueries
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(me);
  });
});

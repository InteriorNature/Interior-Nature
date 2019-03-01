import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
  	signin(email: $email, password: $password) {
  		id 
  		email 
  	}
  }
`;

class Signin extends Component {
	state = {
		email: '',
		name: '',
		password: '',
	}
	saveToState = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}
    
 // when using Form - have to use method post so user password
 //doesn't show in URL if there is a failure, re-render 
 //Once mutation is fetched, then it will conduct follow-up query
 //so we can update UI
    render() {
        return (
        	<Mutation 
            mutation={SIGNIN_MUTATION} 
            variables={this.state}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
        	  {(signup, {error, loading}) => (
        	<Form method="post" 
            onSubmit={async e => {
          		e.preventDefault();
          		const res = await signup();
          		this.setState({ email: '', password: '' });
          	}}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign in to your account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Sign In</button>
            </fieldset>
          </Form>
        	)}
        	</Mutation>
        );
    }
}

export default Signin;
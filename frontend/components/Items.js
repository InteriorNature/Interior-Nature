import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import ItemNU from './ItemNU';
import Pagination from './Pagination';
import { perPage } from '../config';
import User from './User';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_ASC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query
          query={ALL_ITEMS_QUERY}
          // fetchPolicy="network-only"
          variables={{
            skip: this.props.page * perPage - perPage,
          }}
        >
          {({ data : { items }, error : error1, loading : loading1 }) => {
            if (loading1) return <p>Loading...</p>;
            if (error1) return <p>Error: {error1.message}</p>;
            return (
              <User>
                {({ data: { me } }) => (
                  <div>
                  {me && (
                    <ItemsList>{items.map(item => <Item item={item} key={item.id} />)}</ItemsList>
                    )
                  }
                  {!me && (
                    <ItemsList>{items.map(item => <ItemNU item={item} key={item.id} />)}</ItemsList>
                    )
                  }
                  </div>
                )}
              </User>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };


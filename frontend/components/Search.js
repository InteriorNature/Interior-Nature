import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
      id
      image
      title
    }
  }
`;
/*used when adding DownShift component which exposes a bunch of props to us*/
function routeToItem(item) {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
}

/* 1) to see Apollo client console.log in input onChange={()=>console.log(client);}*/
/* 2) Initial test of manual query of apollo client thru onchange eventhandler (search result data: items:)
onChange = async (e, client) => {
		const res = await client.query({
			query: SEARCH_ITEMS_QUERY,
			variables: { searchTerm: e.target.value },
		});
		console.log(res);
	};  */
/* 3) put returned list of items into state so we can loop thru them in a rendered dropdown
and since we do not have mutation or query components to work with, we set initial state*/
/* add debounce timer so as user types many letters, onChange will not fire on every input*/
/* use e.persist in onChange so that during debounce, we do not lose e.target.value */
/* resetIdCounter is an internal downshift counter that perists during refreshes and needs
to be manually reset to 0 */

class AutoComplete extends React.Component {
	state = {
    items: [],
    loading: false,
  };
  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      items: res.data.items,
      loading: false,
    });
  }, 350);
    render() {
      resetIdCounter();
      return(
    	<SearchStyles>
        <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)}>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
        <div>
          <ApolloConsumer>
            {client => (
                <input
                  {...getInputProps({
                    type: 'search',
                    placeholder: 'Search For An Item',
                    id: 'search',
                    className: this.state.loading ? 'loading' : '',
                    onChange: e => {
                      e.persist();
                      this.onChange(e, client);
                    },
                  })}
                />
              )}
          </ApolloConsumer>
            {isOpen && (
                <DropDown>
                  {this.state.items.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!this.state.items.length &&
                    !this.state.loading && <DropDownItem> Nothing Found {inputValue}</DropDownItem>}
                </DropDown>
              )}
        </div>
        )}
        </Downshift>
    	</SearchStyles>
      );
    }
}
/*isOpen is used above - it is DownShift functionality so that when dropdown is open and user hits Esc or 
mouses outsdie of dropdown, the dropdown will close*/ 
export default AutoComplete;
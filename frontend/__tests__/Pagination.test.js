import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import Pagination, { PAGINATION_QUERY } from '../components/Pagination';
import { MockedProvider } from 'react-apollo/test-utils';

//mock the router portion of Pagination render
//basically, functions that do nothing - just so they are found
Router.router = {
  push() {},
  prefetch() {},
};

//generator for making mocks - choose how many items to mock
function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: 'aggregate',
            aggregate: {
              count: length,
              __typename: 'count',
            },
          },
        },
      },
    },
  ];
}

describe('<Pagination/>', () => {
  it('displays a loading message', () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    const pagination = wrapper.find('[data-test="pagination"]');
    expect(wrapper.text()).toContain('Loading...');
  });

  it('renders pagination for 18 items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('.totalPages').text()).toEqual('5');
    const pagination = wrapper.find('div[data-test="pagination"]');
    expect(toJSON(pagination)).toMatchSnapshot();
  });

//first Page
  it('disables prev button on first page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(true);
    expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false);
  });
//last Page
  it('disables next button on last page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={5} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false);
    expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(true);
  });
//middle page
  it('enables all buttons on a middle page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={3} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false);
    expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false);
  });
});

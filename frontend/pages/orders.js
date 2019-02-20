import PleaseSignIn from '../components/PleaseSignIn';
import OrdersList from '../components/OrdersList';

const OrderPage = props => (
  <div>
    <PleaseSignIn>
      <OrdersList />
    </PleaseSignIn>
  </div>
);

export default OrderPage;

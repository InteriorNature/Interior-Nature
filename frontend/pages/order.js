import PleaseSignIn from '../components/PleaseSignIn';
import Order from '../components/Order';
//<p>This is a single page Order { props.query.id }</p>

const OrderPage = props => (
  <div>
    <PleaseSignIn>
      <Order id={props.query.id} />
    </PleaseSignIn>
  </div>
);

export default OrderPage;

import UpdateItem from '../components/UpdateItem';
import PleaseSignIn from '../components/PleaseSignIn';

const Sell = ({query}) => (
  <div>
    <PleaseSignIn>
      <UpdateItem id={query.id} />
    </PleaseSignIn>
  </div>
);
export default Sell;
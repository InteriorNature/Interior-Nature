//import { configure } from 'enzyme';
const { configure } = require ('enzyme');
//import Adapter from 'enzyme-adapter-react-16';
const Adapter = require ('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

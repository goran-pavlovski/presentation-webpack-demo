import './../../assets/styles/login.scss';
import 'bootstrap';
import * as moment from 'moment';

export function printMessage() {
  console.log('Hi! This is the Checkout module.');
  console.log(moment().format());
}
printMessage();

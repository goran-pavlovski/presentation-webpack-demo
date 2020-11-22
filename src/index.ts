import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import '@fortawesome/fontawesome-free/js/fontawesome';
// import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';
// import '@fortawesome/fontawesome-free/js/brands';


// import './main.css';

import './assets/styles/styles.scss';
import { faBeer } from '@fortawesome/free-solid-svg-icons/faBeer';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { AddImage } from './app/utils/add-image';
import { AlertService } from './app/alert.service';
import { ComponentService } from './app/component.service';
import { run } from './app/app';
import 'bootstrap';
import 'react';
import 'react-dom';
import * as moment from 'moment';

library.add(faSpinner, faBeer, faPlusCircle, faMinusCircle);
dom.watch();

AddImage();

const alertService: AlertService = new AlertService();
const componentService: ComponentService = new ComponentService();
run(alertService, componentService);

const fancyFunc = () => {
  return [1, 2];
};
const [a, b] = fancyFunc();

export interface Person {
  name: string;
  age: number;
  sex: string;
}

const person: Person = {
  name: 'John',
  age: 26,
  sex: 'Male'
};

console.log('Person: ', person);
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

// enum EnvironmentsEnum {
//   production = 'production',
//   development = 'development'
// }
//
// if (process.env.NODE_ENV === EnvironmentsEnum.production) {
//   console.log('Production mode');
// } else if (process.env.NODE_ENV === EnvironmentsEnum.development) {
//   console.log('Development mode')
// }
//
// alertService.run();

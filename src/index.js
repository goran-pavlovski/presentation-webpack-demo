import {library, dom} from '@fortawesome/fontawesome-svg-core';
// import '@fortawesome/fontawesome-free/js/fontawesome';
// import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';
// import '@fortawesome/fontawesome-free/js/brands';
import { run } from './app/app';
import { AlertService } from './app/alert.service';
import { ComponentService } from './app/component.service';

// import './main.css';

import './assets/styles/styles.scss';
import { AddImage } from './app/utils/add-image';
import { faBeer } from "@fortawesome/free-solid-svg-icons/faBeer";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";

library.add(faSpinner, faBeer, faPlusCircle, faMinusCircle);
dom.watch();
AddImage();
const alertService = new AlertService();
const componentService = new ComponentService();
run(alertService, componentService);

const fancyFunc = () => {
  return [1, 2];
};
const [a, b] = fancyFunc();

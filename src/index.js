import { run } from './app/app';
import { AlertService } from './app/alert.service';
import { ComponentService } from './app/component.service';

// import './main.css';

import './styles.scss';
import { AddImage } from './app/utils/add-image';

AddImage();
const alertService = new AlertService();
const componentService = new ComponentService();
run(alertService, componentService);

const fancyFunc = () => {
  return [1, 2];
}
const [a, b] = fancyFunc();

console.log(a);
console.log(b);

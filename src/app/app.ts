import { parseInputs } from './utils/parse-inputs';
import { inputsAreValid } from './utils/inputs-are-valid';
import { AlertService } from './alert.service';
import { ComponentService } from './component.service';

export const run = (alertService: AlertService, componentService: ComponentService) => {
  alertService.hideErrors();

  componentService.onClick(() => {
    alertService.hideErrors();
    const inputs = componentService.getInputs();
    const parsedInputs = parseInputs(...inputs);
    if (inputsAreValid(...parsedInputs)) {
      const [numA, numB] = parsedInputs;
      componentService.setResult((numA + numB).toString());
    } else {
      componentService.setResult('');
      alertService.handleAdditionError(inputs, parsedInputs);
    }
  });
};

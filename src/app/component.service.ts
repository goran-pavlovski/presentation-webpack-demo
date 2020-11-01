export class ComponentService {
  private numberOneInput: HTMLInputElement;
  private numberTwoInput: HTMLInputElement;
  private addValuesButton: HTMLElement;
  private resultDiv: HTMLElement;
  constructor() {
    this.numberOneInput = document.getElementById("numberOne") as HTMLInputElement;
    this.numberTwoInput = document.getElementById("numberTwo") as HTMLInputElement;
    this.addValuesButton = document.getElementById("addValues");
    this.resultDiv = document.getElementById("result");
  }

  getInputs(): string[] {
    return [this.numberOneInput.value, this.numberTwoInput.value];
  }

  setResult(str: string) {
    this.resultDiv.innerText = str;
  }

  onClick(cb: any) {
    this.addValuesButton.addEventListener("click", cb);
  }
}

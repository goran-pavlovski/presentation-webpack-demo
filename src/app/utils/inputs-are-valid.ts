export const inputsAreValid = (...input: number[]): boolean => {
  return input.every(num => typeof num === "number" && !isNaN(num));
};

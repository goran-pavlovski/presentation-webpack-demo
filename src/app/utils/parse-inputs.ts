export const parseInputs = (...input: string[]): number[] => {
  return input.map(str => parseInt(str));
};

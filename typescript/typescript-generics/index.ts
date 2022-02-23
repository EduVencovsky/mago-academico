// Create a function to assert that two values are the same
// If not, throw an Error
const numMustBeEqual = (x: number, y: number) => {
  if (x !== y) throw new Error(`${x} must be equal to ${y}`);
};

const strMustBeEqual = (x: string, y: string) => {
  if (x !== y) throw new Error(`${x} must be equal to ${y}`);
};

const anyMustBeEqual = (x: any, y: any) => {
  if (x !== y) throw new Error(`${x} must be equal to ${y}`);
};
anyMustBeEqual(123, "abc");

const mustBeEqual = <T>(x: T, y: T) => {
  if (x !== y) throw new Error(`${x} must be equal to ${y}`);
};

mustBeEqual(123, 123);
// @ts-expect-error
mustBeEqual(123, "abc");

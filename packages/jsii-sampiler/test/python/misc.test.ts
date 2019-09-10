import { expectPython } from "./python";

test('booleans render to right primitives', () => {
  expectPython(`
  callFunction(true, false);
  `, `
  call_function(True, False)
  `);
});

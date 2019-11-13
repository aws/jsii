import { expectPython } from "./python";

test('as-expression', () => {
  expectPython(`
  console.log(3 as number);
  `, `
  print(3)
  `);
});

test('prefix unary expression', () => {
  expectPython(`
  console.log(-3);
  `, `
  print(-3)
  `);
});

test('ellipsis at a random place', () => {
  expectPython(`
  callThisFunction(foo, ...);
  `, `
  call_this_function(foo, ...)
  `);
});

test('string interpolation', () => {
  expectPython([
  'const x = "world";',
  'const y = "well";',
  'console.log(`Hello, ${x}, it works ${y}!`);',
  ].join('\n'), `
  x = "world"
  y = "well"
  print(f"Hello, {x}, it works {y}!")
  `);
});

test('non-null expression', () => {
  expectPython([
  'const x = someObject!.someAttribute;',
  ].join('\n'), `
  x = some_object.some_attribute
  `);
});

test('double-quoted dict keys', () => {
  expectPython([
  'const x = { "key": "value" }',
  ].join('\n'), `
  x = {"key": "value"}
  `);
});

test('backtick string w/o substitutions', () => {
  expectPython([
  'const x = `some string`',
  ].join('\n'), `
  x = "some string"
  `);
});

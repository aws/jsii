import { expectPython } from "./python";
import { LiteralSource, PythonVisitor, translateTypeScript, renderTree } from "../../lib";

test('if', () => {
  expectPython(`
  if (x == 3) {
    console.log('bye');
  }
  `, `
  if x == 3:
      print("bye")
  `);
});

test('if/then/else', () => {
  expectPython(`
  if (x == 3) {
    console.log('bye');
  } else {
    console.log('toodels');
  }
  `, `
  if x == 3:
      print("bye")
  else:
      print("toodels")
  `);
});

test('multiline if/then/else', () => {
  expectPython(`
  if (x == 3) {
    x += 1;
    console.log('bye');
  } else {
    console.log('toodels');
  }
  `, `
  if x == 3:
      x += 1
      print("bye")
  else:
      print("toodels")
  `);
});

test('empty control block', () => {
  expectPython(`
  if (x == 3) {
  }
  `, `
  if x == 3:
      pass
  `);
});

test('block without braces', () => {
  expectPython(`
  if (x == 3) console.log('hello');
  `, `
  if x == 3: print("hello")
  `);
});

test('for/of loop', () => {
  expectPython(`
  for (const x of xs) {
    console.log(x);
  }
  `, `
  for x in xs:
      print(x)
  `);
});

test('whitespace between statements', () => {
  expectPython(`
  statementOne();

  statementTwo();
  `, `
  statement_one()

  statement_two()
  `);
});

test('whitespace between statements in a block', () => {
  expectPython(`
  if (condition) {
    statementOne();

    statementTwo();
  }
  `, `
  if condition:
      statement_one()

      statement_two()
  `);
});

test('prepend disclaimer', () => {
  const src = new LiteralSource('console.log("hello");', 'test.ts');

  const result = translateTypeScript(src, new PythonVisitor({
    disclaimer: 'Do not write this code'
  }));

  expect(renderTree(result.tree)).toEqual(
`# Do not write this code
print("hello")`);
});
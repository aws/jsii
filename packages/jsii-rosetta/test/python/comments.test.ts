import { expectPython } from "./python";

test('interleave single line comments with function call', () => {
  expectPython(`
  someFunction(arg1, {
    // A comment before arg2
    arg2: 'string',

    // A comment before arg3
    arg3: 'boo'
  });
  `, `
  some_function(arg1,
      # A comment before arg2
      arg2="string",

      # A comment before arg3
      arg3="boo"
  )
  `);
});

test('interleave multiline comments with function call', () => {
  expectPython(`
  someFunction(arg1, {
    /* A comment before arg2 */
    arg2: 'string',

    /* A comment before arg3 */
    arg3: 'boo'
  });
  `, `
  some_function(arg1,
      # A comment before arg2
      arg2="string",

      # A comment before arg3
      arg3="boo"
  )
  `);
});

test('no duplication of comments', () => {
  // Harder than it looks!
  expectPython(`
  // Here's a comment
  object.member.functionCall(new Class(), "argument");
  `, `
  # Here's a comment
  object.member.function_call(Class(), "argument")
  `);
});

test('empty lines in comments', () => {
  expectPython(`
  // Here's a comment
  //
  // Second line
  someCall();
  `, `
  # Here's a comment
  #
  # Second line
  some_call()
  `);
});

test.skip('trailing comments', () => {
  expectPython(`
  someCall();  // Oh no, it's a call

  otherCall({
    value: 5, // That's a big number
    secondValue: 6 // Even bigger
  });
  `, `
  some_call()  # Oh no, it's a call

  other_call(
      value=5, # That's a big number
      second_value=6 # Even bigger
  )
  `);
});
import {
  includeAndRenderExamples,
  typescriptSourceToMarkdown,
} from '../lib/literate';

test('simple file gets wrapped in tags', () => {
  assertRendersTo(
    ['const x = 1;', 'console.log(x);'],
    ['```ts', 'const x = 1;', 'console.log(x);', '```'],
  );
});

test('can switch on and off', () => {
  assertRendersTo(
    [
      'const x = 1;',
      '/// !show',
      'console.log(x);',
      '/// !hide',
      'console.log("It worked")',
    ],
    ['```ts', 'console.log(x);', '```'],
  );
});

test('common whitespace in a single block gets stripped', () => {
  assertRendersTo(
    [
      'const x = 1;',
      'if (x) {',
      '    /// !show',
      '    console.log(x);',
      '    /// !hide',
      '}',
    ],
    ['```ts', 'console.log(x);', '```'],
  );
});

test('inline markdown with indentation still gets rendered', () => {
  assertRendersTo(
    [
      'const x = 1;',
      'if (x) {',
      '    /// This is how we render x',
      '    console.log(x);',
      '}',
    ],
    [
      '```ts',
      'const x = 1;',
      'if (x) {',
      '```',
      'This is how we render x',
      '```ts',
      '    console.log(x);',
      '}',
      '```',
    ],
  );
});

test('subsequent code blocks get joined', () => {
  assertRendersTo(
    [
      '/// !show',
      'let x = 1;',
      '/// !hide',
      'x += 1;',
      '/// !show',
      'console.log(x);',
      '/// !hide',
    ],
    ['```ts', 'let x = 1;', 'console.log(x);', '```'],
  );
});

test('can add inline MarkDown', () => {
  assertRendersTo(
    ['const x = 1;', '/// This is how we print x', 'console.log(x);'],
    [
      '```ts',
      'const x = 1;',
      '```',
      'This is how we print x',
      '```ts',
      'console.log(x);',
      '```',
    ],
  );
});

test('can do example inclusion', async () => {
  const inputMarkDown = [
    'This is a preamble',
    '[included here](test/something.lit.ts)',
    'This is a postamble',
  ];

  const fakeLoader = (fileName: string) => {
    expect(fileName).toBe('test/something.lit.ts');
    return {
      fullPath: fileName,
      lines: ['const x = 1;', '/// This is how we print x', 'console.log(x);'],
    };
  };

  const rendered = await includeAndRenderExamples(
    inputMarkDown,
    fakeLoader,
    '.',
  );

  expect(rendered).toEqual([
    'This is a preamble',
    '```ts lit=test/something.lit.ts',
    'const x = 1;',
    '```',
    'This is how we print x',
    '```ts lit=test/something.lit.ts',
    'console.log(x);',
    '```',
    'This is a postamble',
  ]);
});

function assertRendersTo(source: string[], expected: string[]) {
  const rendered = typescriptSourceToMarkdown(source, []);
  expect(expected).toEqual(rendered);
}

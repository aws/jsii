import { transformMarkdown } from "../../lib/markdown/markdown";
import { MarkdownRenderer } from "../../lib/markdown/markdown-renderer";
import { StructureRenderer } from "../../lib/markdown/structure-renderer";

const DEBUG = false;

test('can roundtrip markdown', () => {
  expectOutput(`
# Hello

Yes please.

> this
>
> works
`, `
# Hello

Yes please.

> this
>
> works
`);
});

test('can roundtrip lists', () => {
  expectOutput(`
* A list.
* Another list.
  * A nested list.

1. We might have numbers.
2. Yes it's a numbered list.
  `, `
* A list.
* Another list.

  * A nested list.

1. We might have numbers.
2. Yes it's a numbered list.
  `);
});

test('list with paragraphs', () => {
  expectOutput(`
* A list.
* Another list.

  Para2.
  `, `
* A list.
* Another list.

  Para2.
  `);
});

test('can roundtrip complex hyperlink texts', () => {
  expectOutput(`
This is a [hyperlink](https://amazonaws.com).

![Image though](fun.gif).

This is a [` + '`' + `monospace hyperlink` + '`' + `](https://amazonaws.com).
  `, `
This is a [hyperlink](https://amazonaws.com).

![Image though](fun.gif).

This is a [` + '`' + `monospace hyperlink` + '`' + `](https://amazonaws.com).
  `);
});

test('fenced code block', () => {
  expectOutput([
    'before',
    '```ts',
    'banana',
    '  second',
    '```',
    'after',
  ].join('\n'), [
    'before',
    '',
    '```ts',
    'banana',
    '  second',
    '```',
    '',
    'after',
  ].join('\n'));
});

test('indented code block', () => {
  expectOutput([
    'before',
    '',
    '    banana',
    '      second',
    '',
    'after',
  ].join('\n'), [
    'before',
    '',
    '```',
    'banana',
    '  second',
    '```',
    '',
    'after',
  ].join('\n'));
});

test('code block followed by heading leaves paragraph marker', () => {
  expectOutput([
    '```',
    'code_here',
    '```',
    '',
    '# Heading',
  ].join('\n'), [
    '```',
    'code_here',
    '```',
    '',
    '# Heading',
  ].join('\n'));
});

test('emphases', () => {
  expectOutput(`
Text with *emphasis* and **strongness**.

Other style _emphasis_ and __strongness__.
  `, `
Text with *emphasis* and **strongness**.

Other style *emphasis* and **strongness**.
  `);
});

test('headings', () => {
  expectOutput(`
## Heading 2
### Heading 3
  `, `
## Heading 2

### Heading 3
  `);
});

function expectOutput(source: string, expected: string) {
  if (DEBUG) {
    const struct = new StructureRenderer();
    // tslint:disable-next-line:no-console
    console.log(transformMarkdown(source, struct));
  }

  const output = transformMarkdown(source, new MarkdownRenderer());
  expect(output.trim()).toEqual(expected.trim());
}
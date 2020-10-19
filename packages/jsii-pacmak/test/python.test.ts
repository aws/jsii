import { md2rst } from '../lib/markdown';

test('code to literal blocks', () => {
  converts(
    ['Here is an example:', '', '```', 'example', 'line 2', '```'],
    ['Here is an example::', '', '   example', '   line 2'],
  );
});

test('code to literal blocks with text after it as well', () => {
  converts(
    [
      'Here is an example:',
      '',
      '```',
      'example',
      'line 2',
      '```',
      'Continuing our regularly scheduled programming.',
    ],
    [
      'Here is an example::',
      '',
      '   example',
      '   line 2',
      '',
      'Continuing our regularly scheduled programming.',
    ],
  );
});

test('code to literal blocks without separating line', () => {
  converts(
    ['Here is an example:', '```', 'example', 'line 2', '```'],
    ['Here is an example::', '', '   example', '   line 2'],
  );
});

test('code to literal blocks without preceding colon', () => {
  converts(
    ['Here is an example.', '```', 'example', 'line 2', '```'],
    ['Here is an example::', '', '   example', '   line 2'],
  );
});

test('code to literal blocks without preceding line adds the word Example', () => {
  converts(
    ['```', 'example', 'line 2', '```'],
    ['Example::', '', '   example', '   line 2'],
  );
});

test('blocks to blocks', () => {
  converts(
    [
      'This is a long ongoing piece of text and I have not idea how this will',
      "be broken down into lines. Let's just try it and we will see.",
    ],
    [
      'This is a long ongoing piece of text and I have not idea how this will',
      "be broken down into lines. Let's just try it and we will see.",
    ],
  );
});

test('backticks to double backticks', () => {
  converts(['This is `literal` code'], ['This is ``literal`` code']);
});

test('style markup', () => {
  converts(
    ['text is *emphasized* or **strong**'],
    ['text is *emphasized* or **strong**'],
  );
});

test('hyperlink formatting', () => {
  converts(
    ['this is a [markdown](http://example.com/) hyperlink'],
    ['this is a `markdown <http://example.com/>`_ hyperlink'],
  );
});

test('bulleted list', () => {
  converts(
    ['This is a bulleted list:', '* one', '* two'],
    ['This is a bulleted list:', '', '- one', '- two'],
  );
});

test('numbered list', () => {
  converts(
    ['This is a numbered list:', '1. one', '2. two'],
    ['This is a numbered list:', '', '1. one', '2. two'],
  );
});

test('list with multiline text', () => {
  converts(
    [
      'This is a bulleted list:',
      '* this bullet has multiple lines.',
      '  I hope these are indendented properly.',
      '* two',
    ],
    [
      'This is a bulleted list:',
      '',
      '- this bullet has multiple lines.',
      '  I hope these are indendented properly.',
      '- two',
    ],
  );
});

test('escape character escaping', () => {
  converts(
    [
      String.raw`For example, if you specify "\N", BigQuery interprets "\N" as a null value`,
      String.raw`Single slash \\`, // markdown parses the escape even if ts doesn't
      String.raw`Double slash \\\\`,
      String.raw`Triple slash \\\\\\`,
    ],
    [
      String.raw`For example, if you specify "\\N", BigQuery interprets "\\N" as a null value`,
      String.raw`Single slash \\`,
      String.raw`Double slash \\\\`,
      String.raw`Triple slash \\\\\\`,
    ],
  );
});

function converts(input: string[], output: string[]) {
  const converted = md2rst(input.join('\n'));

  expect(converted.split('\n')).toEqual(output);
}

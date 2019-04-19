import { Test } from 'nodeunit';
import { md2rst } from '../lib/markdown';

export = {
  'code to literal blocks'(test: Test) {
    converts(test, [
      'Here is an example:',
      '',
      '```',
      'example',
      'line 2',
      '```'
    ], [
      'Here is an example::',
      '',
      '   example',
      '   line 2'
    ]);

    test.done();
  },

  'code to literal blocks with text after it as well'(test: Test) {
    converts(test, [
      'Here is an example:',
      '',
      '```',
      'example',
      'line 2',
      '```',
      'Continuing our regularly scheduled programming.'
    ], [
      'Here is an example::',
      '',
      '   example',
      '   line 2',
      '',
      'Continuing our regularly scheduled programming.'
    ]);

    test.done();
  },

  'code to literal blocks without separating line'(test: Test) {
    converts(test, [
      'Here is an example:',
      '```',
      'example',
      'line 2',
      '```'
    ], [
      'Here is an example::',
      '',
      '   example',
      '   line 2'
    ]);

    test.done();
  },

  'code to literal blocks without preceding colon'(test: Test) {
    converts(test, [
      'Here is an example.',
      '```',
      'example',
      'line 2',
      '```'
    ], [
      'Here is an example::',
      '',
      '   example',
      '   line 2'
    ]);

    test.done();
  },

  'code to literal blocks without preceding line adds the word Example'(test: Test) {
    converts(test, [
      '```',
      'example',
      'line 2',
      '```'
    ], [
      'Example::',
      '',
      '   example',
      '   line 2'
    ]);

    test.done();
  },

  'blocks to blocks'(test: Test) {
    converts(test, [
      'This is a long ongoing piece of text and I have not idea how this will',
      'be broken down into lines. Let\'s just try it and we will see.',
    ], [
      'This is a long ongoing piece of text and I have not idea how this will',
      'be broken down into lines. Let\'s just try it and we will see.',
    ]);

    test.done();
  },

  'backticks to double backticks'(test: Test) {
    converts(test, [
      'This is `literal` code',
    ], [
      'This is ``literal`` code',
    ]);

    test.done();
  },

  'style markup'(test: Test) {
    converts(test, [
      'text is *emphasized* or **strong**',
    ], [
      'text is *emphasized* or **strong**',
    ]);

    test.done();
  },

  'hyperlink formatting'(test: Test) {
    converts(test, [
      'this is a [markdown](http://example.com/) hyperlink',
    ], [
      'this is a `markdown <http://example.com/>`_ hyperlink',
    ]);

    test.done();
  },

  'bulleted list'(test: Test) {
    converts(test, [
      'This is a bulleted list:',
      '* one',
      '* two',
    ], [
      'This is a bulleted list:',
      '',
      '- one',
      '- two',
    ]);

    test.done();
  },

  'numbered list'(test: Test) {
    converts(test, [
      'This is a numbered list:',
      '1. one',
      '2. two',
    ], [
      'This is a numbered list:',
      '',
      '1. one',
      '2. two',
    ]);

    test.done();
  },
};

function converts(test: Test, input: string[], output: string[]) {
  const converted = md2rst(input.join('\n'));

  test.deepEqual(converted.split('\n'), output);
}
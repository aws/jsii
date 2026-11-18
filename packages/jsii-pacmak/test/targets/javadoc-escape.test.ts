import { escapeJavadoc } from '../../lib/targets/javadoc-escape';

test.each([
  ['\\u<Unicode>', '&#92;u<Unicode>'],
  ['\\u0041', '&#92;u0041'],
  ['C:\\users', 'C:&#92;users'],
  ['\\\\u', '\\&#92;u'],
  ['\\\\\\u', '\\\\&#92;u'],
  ['\\uuuu0041', '&#92;uuuu0041'],
  ['\\u002A/', '&#92;u002A/'],
  ['ends */ early', 'ends *\\/ early'],
  ['C:\\temp\\', 'C:\\temp\\'],
  ['plain text', 'plain text'],
])('escapeJavadoc(%j) is %j', (text, expected) => {
  expect(escapeJavadoc(text)).toBe(expected);
});

test.each(['\\u', '\\\\u', '\\\\\\u', 'a\\u\\u\\\\uu', '*/\\u*/'])(
  'no unicode escape or comment end survives in %j',
  (text) => {
    expect(escapeJavadoc(text)).not.toMatch(/\\u|\*\//);
  },
);

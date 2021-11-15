import { Spans, trimCompleteSourceToVisible } from '../../lib/typescript/visible-spans';

test('full text visible by default', () => {
  const vis = Spans.visibleSpansFromSource('asdf');
  expect(vis.spans).toEqual([{ start: 0, end: 4, visible: true }]);
});

test('initial span visible if directive is hiding', () => {
  const vis = Spans.visibleSpansFromSource('asdf\n/// !hide\nxyz');
  expect(vis.spans).toEqual([{ start: 0, end: 5, visible: true }]);
});

test('initial span invisible if directive is showing', () => {
  const s = 'asdf\n/// !show\nxyz';
  const vis = Spans.visibleSpansFromSource('asdf\n/// !show\nxyz');

  expect(s.substring(vis.spans[0].start, vis.spans[0].end)).toEqual('xyz');
  expect(vis.spans).toEqual([{ start: 15, end: 18, visible: true }]);
});

test('merge adjacent spans', () => {
  const spans = new Spans([
    { start: 10, end: 18 },
    { start: 18, end: 20 },
  ]);

  expect(spans.spans).toEqual([{ start: 10, end: 20 }]);
});

test('trim source to spans', () => {
  const source = ['a', '/// !show', 'b', 'c', '/// !hide', 'd'].join('\n');

  const trimmed = trimCompleteSourceToVisible(source);

  expect(trimmed).toEqual('b\nc');
});

test('trim source to spans with leading whitespace ', () => {
  const source = ['a', '   /// !show', 'b', 'c', ' /// !hide', 'd'].join('\n');

  const trimmed = trimCompleteSourceToVisible(source);

  expect(trimmed).toEqual('b\nc');
});

test('trim source to spans with trailing whitespace ', () => {
  const source = ['a', '/// !show   ', 'b', 'c', ' /// !hide ', 'd'].join('\n');

  const trimmed = trimCompleteSourceToVisible(source);

  expect(trimmed).toEqual('b\nc');
});

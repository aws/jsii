import { Spans } from '../../lib/typescript/visible-spans';

test('full text visible by default', () => {
  const vis = Spans.visibleSpansFromSource('asdf');
  expect(vis.spans).toEqual([{ start: 0, end: 4, visible: true }]);
});

test('initial span visible if directive is hiding', () => {
  const vis = Spans.visibleSpansFromSource('asdf\n/// !hide\nxyz');
  expect(vis.spans).toEqual([{ start: 0, end: 5, visible: true }]);
});

test('initial span invisible if directive is showing', () => {
  const vis = Spans.visibleSpansFromSource('asdf\n/// !show\nxyz');
  expect(vis.spans).toEqual([{ start: 14, end: 18, visible: true }]);
});

test('merge adjacent spans', () => {
  const spans = new Spans([
    { start: 10, end: 18 },
    { start: 18, end: 20 },
  ]);

  expect(spans.spans).toEqual([{ start: 10, end: 20 }]);
});

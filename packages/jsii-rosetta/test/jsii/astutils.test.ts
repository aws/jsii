import { calculateVisibleSpans } from "../../lib/typescript/ast-utils";

test('full text visible by default', () => {
  expect(calculateVisibleSpans('asdf')).toEqual([
    { start: 0, end: 4, visible: true }
  ]);
});

test('initial span visible if directive is hiding', () => {
  expect(calculateVisibleSpans('asdf\n/// !hide\nxyz')).toEqual([
    { start: 0, end: 5, visible: true }
  ]);
});

test('initial span invisible if directive is showing', () => {
  expect(calculateVisibleSpans('asdf\n/// !show\nxyz')).toEqual([
    { start: 14, end: 18, visible: true }
  ]);
});

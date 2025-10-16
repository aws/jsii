import { parseExpression, Predicate } from '../lib/jsii-query';

describe('parseExpression', () => {
  test('+', () => {
    expect(parseExpression('+type')).toMatchObject({
      op: 'select',
      kind: 'type',
    });
  });
  test('-', () => {
    expect(parseExpression('-type')).toMatchObject({
      op: 'filter',
      kind: 'type',
      invert: true,
    });
  });
  test('.', () => {
    expect(parseExpression('.type')).toMatchObject({
      op: 'filter',
      kind: 'type',
      invert: false,
    });
  });

  test('with expression', () => {
    expect(parseExpression('.property:name.startsWith("x")')).toMatchObject({
      op: 'filter',
      kind: 'property',
      invert: false,
      expression: 'name.startsWith("x")',
    });
  });
});

describe('Predicate', () => {
  test('Simple', () => {
    const p = new Predicate('name.startsWith("ba")');

    expect(p.apply({ name: 'banana' })).toBeTruthy();
    expect(p.apply({ name: 'blob' })).toBeFalsy();
  });

  test('inverted', () => {
    const p = new Predicate('name.startsWith("ba")', true);

    expect(p.apply({ name: 'banana' })).toBeFalsy();
    expect(p.apply({ name: 'blob' })).toBeTruthy();
  });

  test('empty', () => {
    const p = new Predicate();

    expect(p.apply({ name: 'banana' })).toBeTruthy();
    expect(p.apply({ name: 'blob' })).toBeTruthy();
  });
});

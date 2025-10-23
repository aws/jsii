import * as path from 'path';

import {
  jsiiQuery,
  JsiiQueryOptions,
  parseExpression,
  Predicate,
  renderElement,
} from '../lib/jsii-query';

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
      remove: true,
    });
  });
  test('.', () => {
    expect(parseExpression('.type')).toMatchObject({
      op: 'filter',
      kind: 'type',
      remove: false,
    });

    expect(parseExpression('type')).toMatchObject({
      op: 'filter',
      kind: 'type',
      remove: false,
    });
  });

  test('with expression', () => {
    expect(parseExpression('.property:name.startsWith("x")')).toMatchObject({
      op: 'filter',
      kind: 'property',
      remove: false,
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

  test('empty', () => {
    const p = new Predicate();

    expect(p.apply({ name: 'banana' })).toBeTruthy();
    expect(p.apply({ name: 'blob' })).toBeTruthy();
  });
});

describe('filtering', () => {
  test('empty filter returns everything', async () => {
    const result = await query([], 'members');
    expect(result.length).toBeGreaterThan(700);
    expect(result).toContainEqual(
      'readonly jsii-calc.ExportedBaseClass#success: boolean',
    );
  });

  test('filter on method name', async () => {
    const result = await query(
      [parseExpression('method:name.includes("con")')],
      'members',
    );
    expect(result).toContainEqual(
      'static @scope/jsii-calc-base-of-base.StaticConsumer#consume(..._args: any[]): void',
    );
  });

  test('filter on methods but expect types', async () => {
    const result = await query(
      [parseExpression('method:name.includes("con")')],
      'types',
    );
    expect(result).toContainEqual(
      'class @scope/jsii-calc-base-of-base.StaticConsumer',
    );
  });

  test('filter on type but expect members', async () => {
    const result = await query(
      [parseExpression('class:name == "StaticConsumer"')],
      'members',
    );
    expect(result).toContainEqual(
      'static @scope/jsii-calc-base-of-base.StaticConsumer#consume(..._args: any[]): void',
    );
  });

  test('filter on classes with a separate expression', async () => {
    const result = await query(
      [
        parseExpression('method:name.includes("con")'),
        parseExpression('class'),
      ],
      'members',
    );
    expect(result).toContainEqual(
      'static @scope/jsii-calc-base-of-base.StaticConsumer#consume(..._args: any[]): void',
    );
  });
});

async function query(
  exp: JsiiQueryOptions['expressions'],
  what: 'members' | 'types' | 'all' = 'all',
): Promise<string[]> {
  const jsiiCalcDir = path.dirname(require.resolve('jsii-calc/package.json'));

  const result = await jsiiQuery({
    fileName: jsiiCalcDir,
    expressions: exp,
    returnMembers: what !== 'types',
    returnTypes: what !== 'members',
  });
  return result.map(renderElement);
}

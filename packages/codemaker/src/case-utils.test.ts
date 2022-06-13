import * as caseUtils from './case-utils';

test('toCamelCase', () => {
  expect(caseUtils.toCamelCase('EXAMPLE_VALUE')).toBe('exampleValue');
  expect(caseUtils.toCamelCase('example', 'value')).toBe('exampleValue');
});

test('toPascalCase', () => {
  expect(caseUtils.toPascalCase('EXAMPLE_VALUE')).toBe('ExampleValue');
  expect(caseUtils.toPascalCase('example', 'value')).toBe('ExampleValue');
});

test('toSnakeCase', () => {
  expect(caseUtils.toSnakeCase('EXAMPLE_VALUE')).toBe('example_value');
  expect(caseUtils.toSnakeCase('exampleValue')).toBe('example_value');
  expect(caseUtils.toSnakeCase('ExampleValue')).toBe('example_value');
  expect(caseUtils.toSnakeCase('EPSConduit')).toBe('eps_conduit');
  expect(caseUtils.toSnakeCase('SomeEBSVolume')).toBe('some_ebs_volume');
});

test('reserved word snake-casing', () => {
  expect(caseUtils.toSnakeCase('SizeMiB')).toBe('size_mib');
  expect(caseUtils.toSnakeCase('SizeMiBiBytes')).toBe('size_mi_bi_bytes');
  expect(caseUtils.toSnakeCase('MiBSize')).toBe('mib_size');
});

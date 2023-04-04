import { undoTypesVersionsRedirect } from '../lib/types-versions';

test('no configuration', () => {
  expect(undoTypesVersionsRedirect('test/path/index.ts', undefined)).toBe(
    'test/path/index.ts',
  );
});

test('no candidate matches', () => {
  expect(
    undoTypesVersionsRedirect('test/path/index.ts', {
      '*': { '*': ['.types-versions/ts3.9/*'] },
    }),
  ).toBe('test/path/index.ts');
});

test('incompatible-typescript-version', () => {
  expect(
    undoTypesVersionsRedirect('test/path/index.ts', {
      '>99.99.99': {
        '*': ['test/*'],
      },
    }),
  ).toBe('test/path/index.ts');
});

test('simple match', () => {
  expect(
    undoTypesVersionsRedirect('test/path/index.ts', {
      '*': {
        '*': ['test/*/index.ts'],
      },
    }),
  ).toBe('path');
});

test('multiple typeScript versions (first one wins)', () => {
  expect(
    undoTypesVersionsRedirect('test/path/index.ts', {
      '>=0': {
        '*': ['test/*/index.ts'],
      },
      '*': {
        'before/*/after.ts': ['test/*/index.ts'],
      },
    }),
  ).toBe('path');
});

test('prefix+suffix match', () => {
  expect(
    undoTypesVersionsRedirect('test/path/index.ts', {
      '*': {
        'before/*/after.ts': ['test/*/index.ts'],
      },
    }),
  ).toBe('before/path/after.ts');
});

test('multiple candidates (first match wins)', () => {
  expect(
    undoTypesVersionsRedirect('test/path/index.ts', {
      '*': {
        'before/*/after.ts': ['*/path/index.ts', 'test/*/index.ts'],
      },
    }),
  ).toBe('before/test/after.ts');
});

import { Code, configureCategories } from '../lib/jsii-diagnostic';
import { DiagnosticCategory } from 'typescript';

describe('jsii diagnostics', () => {
  describe('configureCategories', () => {
    beforeEach(() => {
      const code = Code.lookup(1)!;
      code.category = DiagnosticCategory.Suggestion;
    });

    test('diagnostic by name', () => {
      configureCategories({
        'metadata/package-json-missing-description': 'error',
      });
      expect(Code.lookup(1)!.category).toEqual(DiagnosticCategory.Error);
    });

    test('diagnostic by code', () => {
      configureCategories({
        JSII1: 'error',
      });
      expect(Code.lookup(1)!.category).toEqual(DiagnosticCategory.Error);
    });

    test('diagnostic by code zero prefixed', () => {
      configureCategories({
        JSII001: 'error',
      });
      expect(Code.lookup(1)!.category).toEqual(DiagnosticCategory.Error);
    });

    test('invalid diagnostic code - NaN', () => {
      expect(() => {
        configureCategories({
          JSIIPP: 'error',
        });
      }).toThrow(/number must follow code/);
    });

    test('invalid diagnostic code - number', () => {
      expect(() => {
        configureCategories({
          JSII77778888: 'error',
        });
      }).toThrow(/Unrecognized diagnostic code/);
    });

    test('invalid diagnostic code - string', () => {
      expect(() => {
        configureCategories({
          'invalid/does-not-exist': 'error',
        });
      }).toThrow(/Unrecognized diagnostic code/);
    });

    test('invalid category', () => {
      expect(() => {
        configureCategories({
          JSII1: 'invalid',
        });
      }).toThrow(/Unrecognized diagnostic category/);
    });
  });
});

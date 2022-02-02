import { TestJsiiModule, DUMMY_JSII_CONFIG } from './testutil';

let assembly: TestJsiiModule;
beforeAll(async () => {
  assembly = await TestJsiiModule.fromSource(
    `
    export class ClassA {
      public someMethod() {
      }
    }
    export class ClassB {
      public argumentMethod(args: BeeArgs) {
        Array.isArray(args);
      }
    }
    export interface BeeArgs { readonly value: string; readonly nested?: NestedType; }
    export interface NestedType { readonly x: number; }
    `,
    {
      name: 'my_assembly',
      jsii: DUMMY_JSII_CONFIG,
    },
  );
});
afterAll(async () => assembly.cleanup());

test('generate syntax counter', () => {
  const translator = assembly.successfullyCompile(`
    import * as ass from 'my_assembly';
    const a = new ass.ClassA();
  `);
  expect(translator.syntaxKindCounter()).toEqual({
    10: 1, // StringLiteral
    75: 4, // Identifier
    194: 1, // PropertyAccessExpression
    197: 1, // NewExpression
    225: 1, // VariableStatement
    242: 1, // VariableDeclaration
    243: 1, // VariableDeclarationList
    254: 1, // ImportDeclaration
    255: 1, // ImportClause
    256: 1, // NamespaceImport
    290: 1, // SourceFile
  });
});

test('do not count syntax in hidden lines', () => {
  const translator = assembly.successfullyCompile(`
    /// !hide
    import * as ass from 'my_assembly';
    const a = new ass.ClassA();
    /// !show
    const b = new ass.ClassB();
  `);
  expect(translator.syntaxKindCounter()).toEqual({
    75: 3, // Identifier
    194: 1, // PropertyAccessExpression
    197: 1, // NewExpression
    225: 1, // VariableStatement
    242: 1, // VariableDeclaration
    243: 1, // VariableDeclarationList
  });
});

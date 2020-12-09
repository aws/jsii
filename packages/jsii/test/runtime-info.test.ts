import * as spec from '@jsii/spec';
import * as ts from 'typescript';

import { RuntimeClassInfo, RuntimeTypeInfoInjector } from '../lib/runtime-info';

test('adds vfqn symbol at the top of each file', () => {
  expect(transformedSource(EXAMPLE_SINGLE_CLASS)).toContain(
    'var vfqnSym = Symbol.for("jsii.rtti");',
  );
});

test('adds runtime info for a class', () => {
  expect(transformedSource(EXAMPLE_SINGLE_CLASS, 'Foo')).toContain(
    'private static [vfqnSym] = { fqn: "RuntimeInfoTest.Foo", version: "1.2.3" }',
  );
});

test('adds runtime info for each class', () => {
  const transformed = transformedSource(EXAMPLE_MULTIPLE_CLASSES, 'Foo', 'Bar');
  expect(transformed).toContain(
    'private static [vfqnSym] = { fqn: "RuntimeInfoTest.Foo", version: "1.2.3" }',
  );
  expect(transformed).toContain(
    'private static [vfqnSym] = { fqn: "RuntimeInfoTest.Bar", version: "1.2.3" }',
  );
});

test('skips runtime info if not available', () => {
  const transformed = transformedSource(EXAMPLE_MULTIPLE_CLASSES, 'Foo');
  expect(transformed).toContain(
    'private static [vfqnSym] = { fqn: "RuntimeInfoTest.Foo", version: "1.2.3" }',
  );
  expect(transformed).not.toContain(
    'private static [vfqnSym] = { fqn: "RuntimeInfoTest.Bar", version: "1.2.3" }',
  );
});

function transformedSource(source: string, ...classNames: string[]) {
  const typeInfo = mockedTypeInfoForClasses(...classNames);
  const transformed = ts.transform(
    ts.createSourceFile('source.ts', source, ts.ScriptTarget.Latest),
    [new RuntimeTypeInfoInjector('1.2.3', typeInfo).runtimeTypeTransformer()],
  );
  return ts
    .createPrinter()
    .printBundle(ts.createBundle(transformed.transformed));
}

/**
 * Mock the `RuntimeClassInfo`, typically provided by a Map<ts.Node, spec.TypeBase>.
 * This assumes each class name only appears once in the source,
 * which is a reasonable assumption for these tests.
 */
function mockedTypeInfoForClasses(...classNames: string[]): RuntimeClassInfo {
  const typeInfoMap = new Map<string, spec.TypeBase>();
  classNames.forEach((clazz) =>
    typeInfoMap.set(clazz, {
      assembly: 'test',
      fqn: `RuntimeInfoTest.${clazz}`,
      kind: spec.TypeKind.Class,
      name: clazz,
    }),
  );
  return {
    get: (node: ts.ClassDeclaration) => {
      return node.name ? typeInfoMap.get(node.name.text) : undefined;
    },
  };
}

/**
 * ===============================
 * =    EXAMPLE SOURCE FILES     =
 * ===============================
 */

const EXAMPLE_SINGLE_CLASS = `
import * as ts from 'typescript';

class Foo {
  constructor(public readonly bar: string) {}
}
`;

const EXAMPLE_MULTIPLE_CLASSES = `
class Foo {
  constructor(public readonly bar: string) {}
  public doStuff() { return 42; }
}

interface FooBar {
  readonly answer: number;
}

/**
 * A bar.
 */
class Bar {
  public doStuffToo() {
    return new class implements FooBar {
      public readonly answer = 21;
    }();
  }
}

export default class {
  constructor() {}
}
`;

import * as ts from 'typescript';

import { RuntimeTypeInfoInjector } from '../lib/runtime-info';

test('leaves files without classes unaltered', () => {
  expect(transformedSource(EXAMPLE_NO_CLASS, 'Foo')).not.toContain(
    'jsiiRttiSymbol',
  );
});

test('leaves files without classes with metadata unaltered', () => {
  expect(transformedSource(EXAMPLE_SINGLE_CLASS)).not.toContain(
    'jsiiRttiSymbol',
  );
});

test('adds vfqn symbol at the top of each file when classes are present', () => {
  expect(transformedSource(EXAMPLE_SINGLE_CLASS, 'Foo')).toContain(
    'var jsiiRttiSymbol_1 = Symbol.for("jsii.rtti");',
  );
});

test('adds runtime info for a class', () => {
  expect(transformedSource(EXAMPLE_SINGLE_CLASS, 'Foo')).toContain(
    'private static readonly [jsiiRttiSymbol_1] = { fqn: "RuntimeInfoTest.Foo", version: "1.2.3" }',
  );
});

test('adds runtime info for each class', () => {
  const transformed = transformedSource(EXAMPLE_MULTIPLE_CLASSES, 'Foo', 'Bar');
  expect(transformed).toContain(
    'private static readonly [jsiiRttiSymbol_1] = { fqn: "RuntimeInfoTest.Foo", version: "1.2.3" }',
  );
  expect(transformed).toContain(
    'private static readonly [jsiiRttiSymbol_1] = { fqn: "RuntimeInfoTest.Bar", version: "1.2.3" }',
  );
});

test('skips runtime info if not available', () => {
  const transformed = transformedSource(EXAMPLE_MULTIPLE_CLASSES, 'Foo');
  expect(transformed).toContain(
    'private static readonly [jsiiRttiSymbol_1] = { fqn: "RuntimeInfoTest.Foo", version: "1.2.3" }',
  );
  expect(transformed).not.toContain(
    'private static readonly [jsiiRttiSymbol_1] = { fqn: "RuntimeInfoTest.Bar", version: "1.2.3" }',
  );
});

test('creates a unique name if the default is taken', () => {
  // Conflicting example has existing variable for jsiiRttiSymbol_1, so transformation should use _2.
  const transformed = transformedSource(EXAMPLE_CONFLICTING_NAME, 'Foo');
  expect(transformed).toContain(
    'var jsiiRttiSymbol_2 = Symbol.for("jsii.rtti");',
  );
  expect(transformed).toContain(
    'private static readonly [jsiiRttiSymbol_2] = { fqn: "RuntimeInfoTest.Foo", version: "1.2.3" }',
  );
});

function transformedSource(source: string, ...classNames: string[]) {
  const mockedTypeInfo = mockedTypeInfoForClasses(...classNames);
  const injector = new TestRuntimeTypeInfoInjector(mockedTypeInfo);
  const transformed = ts.transform(
    ts.createSourceFile('source.ts', source, ts.ScriptTarget.Latest),
    [injector.runtimeTypeTransformer()],
  );
  return ts
    .createPrinter()
    .printBundle(ts.createBundle(transformed.transformed));
}

/** Test subclass of RuntimeTypeInfoInjector that accepts overrides for type info */
class TestRuntimeTypeInfoInjector extends RuntimeTypeInfoInjector {
  public constructor(private readonly typeInfo: Map<string, string>) {
    super('1.2.3');
  }

  protected getClassFqn(clazz: ts.ClassDeclaration): string | undefined {
    return clazz.name ? this.typeInfo.get(clazz.name.text) : undefined;
  }
}

/**
 * Mock the Map<ts.ClassDefinition, string> of classes to fqns.
 * This assumes each class name only appears once in the source,
 * which is a reasonable assumption for these tests.
 */
function mockedTypeInfoForClasses(
  ...classNames: string[]
): Map<string, string> {
  const typeInfoMap = new Map<string, string>();
  classNames.forEach((clazz) =>
    typeInfoMap.set(clazz, `RuntimeInfoTest.${clazz}`),
  );
  return typeInfoMap;
}

/**
 * ===============================
 * =    EXAMPLE SOURCE FILES     =
 * ===============================
 */

const EXAMPLE_NO_CLASS = `
import * as ts from 'typescript';

interface Foo {
  readonly foobar: string;
}
`;

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

const EXAMPLE_CONFLICTING_NAME = `
import * as ts from 'typescript';

const jsiiRttiSymbol_1 = 42;

class Foo {
  constructor(public readonly bar: string) {}
}
`;

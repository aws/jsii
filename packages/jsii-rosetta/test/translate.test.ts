import { SnippetTranslator, TypeScriptSnippet, PythonVisitor, TargetLanguage } from '../lib';
import { VisualizeAstVisitor } from '../lib/languages/visualize';
import { snippetKey } from '../lib/tablets/key';
import { TestJsiiModule, DUMMY_JSII_CONFIG } from './testutil';

const location = {
  api: { api: 'moduleReadme', moduleFqn: '@aws-cdk/aws-apigateway' },
  field: { field: 'example' },
} as const;

test('does not fail on "Debug Failure"', () => {
  // GIVEN
  const snippet: TypeScriptSnippet = {
    completeSource: 'Missing literate source file test/integ.restapi-import.lit.ts',
    location,
    visibleSource:
      "import { App, CfnOutput, NestedStack, NestedStackProps, Stack } from '@aws-cdk/core';\nimport { Construct } from 'constructs';\nimport { Deployment, Method, MockIntegration, PassthroughBehavior, RestApi, Stage } from '../lib';\n\n/**\n * This file showcases how to split up a RestApi's Resources and Methods across nested stacks.\n *\n * The root stack 'RootStack' first defines a RestApi.\n * Two nested stacks BooksStack and PetsStack, create corresponding Resources '/books' and '/pets'.\n * They are then…;\n\n  readonly methods?: Method[];\n}\n\nclass DeployStack extends NestedStack {\n  constructor(scope: Construct, props: DeployStackProps) {\n    super(scope, 'integ-restapi-import-DeployStack', props);\n\n    const deployment = new Deployment(this, 'Deployment', {\n      api: RestApi.fromRestApiId(this, 'RestApi', props.restApiId),\n    });\n    (props.methods ?? []).forEach((method) => deployment.node.addDependency(method));\n    new Stage(this, 'Stage', { deployment });\n  }\n}\n\nnew RootStack(new App());",
    parameters: { lit: 'test/integ.restapi-import.lit.ts' },
    strict: false,
  };

  // WHEN
  const subject = new SnippetTranslator(snippet, {
    includeCompilerDiagnostics: true,
  });

  // THEN
  expect(subject.renderUsing(new VisualizeAstVisitor())).toMatchInlineSnapshot(`
    "(ExpressionStatement Missing
      (Identifier Missing))(ExpressionStatement literate
      (Identifier literate))(ExpressionStatement source
      (Identifier source))(ExpressionStatement file
      (Identifier file))(ExpressionStatement test/integ.restapi-import.lit.ts
      (BinaryExpression test/integ.restapi-import.lit.ts
        (BinaryExpression test/integ.restapi
          (Identifier test)
          (SlashToken /)
          (PropertyAccessExpression integ.restapi
            (Identifier integ)
            (Identifier restapi)))
        (MinusToken -)
        (PropertyAccessExpression import.lit.ts
          import.lit
          (Identifier ts))))"
  `);
});

test('rejects ?? operator', () => {
  const snippet: TypeScriptSnippet = {
    completeSource: 'const x = false ?? true;',
    location,
    visibleSource: 'const x = false ?? true;',
    parameters: { lit: 'test/integ.restapi-import.lit.ts' },
    strict: false,
  };

  // WHEN
  const subject = new SnippetTranslator(snippet, {
    includeCompilerDiagnostics: true,
  });
  subject.renderUsing(new PythonVisitor());

  expect(subject.diagnostics[0].messageText).toContain('QuestionQuestionToken');
});

test('rejects function declarations in object literals', () => {
  const snippet: TypeScriptSnippet = {
    completeSource: 'const x = { method() { return 1; } }',
    location,
    visibleSource: 'const x = { method() { return 1; } }',
    parameters: { lit: 'test/integ.restapi-import.lit.ts' },
    strict: false,
  };

  // WHEN
  const subject = new SnippetTranslator(snippet, {
    includeCompilerDiagnostics: true,
  });
  subject.renderUsing(new PythonVisitor());

  expect(subject.diagnostics[0].messageText).toContain(
    'Use of MethodDeclaration in an object literal is not supported',
  );
});

test('completeSource does not impact the snippet key', () => {
  const snippet1: TypeScriptSnippet = {
    visibleSource: '// hello',
    location: { api: { api: 'member', fqn: 'my.class', memberName: 'member1' } },
    completeSource: '// i do not like to say\n// hello',
  };

  const snippet2 = {
    ...snippet1,
    completeSource: undefined,
  };

  expect(snippetKey(snippet1)).toEqual(snippetKey(snippet2));
});

test('Snippets from different locations have different keys', () => {
  const visibleSource = 'console.log("banana");';

  const snippet1: TypeScriptSnippet = {
    visibleSource,
    location: { api: { api: 'member', fqn: 'my.class', memberName: 'member1' } },
  };

  const snippet2: TypeScriptSnippet = {
    visibleSource,
    location: { api: { api: 'type', fqn: 'my.class' } },
  };

  expect(snippetKey(snippet1)).not.toEqual(snippetKey(snippet2));
});

test('didSuccessfullyCompile is true when compilation is attempted', () => {
  const visibleSource = 'console.log("banana");';

  const snippet: TypeScriptSnippet = {
    visibleSource,
    location: { api: { api: 'type', fqn: 'my.class' } },
  };

  // WHEN
  const subject = new SnippetTranslator(snippet, {
    includeCompilerDiagnostics: true,
  });
  subject.renderUsing(new PythonVisitor());

  expect(subject.didSuccessfullyCompile).toBeTruthy();
});

test('didSuccessfullyCompile is undefined when compilation is not attempted', () => {
  const visibleSource = 'console.log("banana");';

  const snippet: TypeScriptSnippet = {
    visibleSource,
    location: { api: { api: 'type', fqn: 'my.class' } },
  };

  // WHEN
  const subject = new SnippetTranslator(snippet);
  subject.renderUsing(new PythonVisitor());

  expect(subject.didSuccessfullyCompile).toBeUndefined();
});

test('refuse to translate object literal with function member', () => {
  const visibleSource = 'const x: any = { mem: () => 42 };';

  const snippet: TypeScriptSnippet = {
    visibleSource,
    location: { api: { api: 'type', fqn: 'my.class' } },
  };

  // WHEN
  const subject = new SnippetTranslator(snippet);
  subject.renderUsing(new PythonVisitor());

  expect(subject.diagnostics).toContainEqual(
    expect.objectContaining({
      messageText: expect.stringMatching(/You cannot use an object literal/),
    }),
  );
});

test('refuse to translate object literal with function member in shorthand property', () => {
  const visibleSource = 'const mem = () => 42; const x: any = { mem };';

  const snippet: TypeScriptSnippet = {
    visibleSource,
    location: { api: { api: 'type', fqn: 'my.class' } },
  };

  // WHEN
  const subject = new SnippetTranslator(snippet);
  subject.renderUsing(new PythonVisitor());

  expect(subject.diagnostics).toContainEqual(
    expect.objectContaining({
      messageText: expect.stringMatching(/You cannot use an object literal/),
    }),
  );
});

test('declarations are translated correctly in all jsii languages', () => {
  // Create an assembly in a temp directory
  const assembly = TestJsiiModule.fromSource(
    {
      'index.ts': `
      export class ClassA {
        public someMethod() {
        }
      }
      export class ClassB {
        public anotherMethod() {
        }
      }
      `,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_JSII_CONFIG,
    },
  );
  try {
    const ts = assembly.translateHere(
      ["import * as masm from 'my_assembly';", 'declare const classA: masm.ClassA;'].join('\n'),
    );

    expect(ts.get(TargetLanguage.PYTHON)?.source).toEqual(
      ['import example_test_demo as masm', '# class_a: masm.ClassA'].join('\n'),
    );
    expect(ts.get(TargetLanguage.JAVA)?.source).toEqual(['import example.test.demo.*;', 'ClassA classA;'].join('\n'));
    expect(ts.get(TargetLanguage.CSHARP)?.source).toEqual(['using Example.Test.Demo;', 'ClassA classA;'].join('\n'));
  } finally {
    assembly.cleanup();
  }
});

test('handling capital letters in identifiers', () => {
  // Create an assembly in a temp directory
  const assembly = TestJsiiModule.fromSource(
    {
      'index.ts': `
      export interface InterfaceA {
        readonly sizeInMBs: Number;
      }
      `,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_JSII_CONFIG,
    },
  );
  try {
    const ts = assembly.translateHere(
      ["import * as masm from 'my_assembly';", 'declare let intA: masm.InterfaceA;', 'intA = { sizeInMBs: 3 };'].join('\n'),
    );

    expect(ts.get(TargetLanguage.PYTHON)?.source).toEqual(
      ['import example_test_demo as masm', '# int_a: masm.InterfaceA', 'int_a = masm.InterfaceA(size_in_m_bs=3)'].join('\n'),
    );
    expect(ts.get(TargetLanguage.JAVA)?.source).toEqual(['import example.test.demo.*;', 'InterfaceA intA;', 'intA = InterfaceA.builder().sizeInMBs(3).build();'].join('\n'));
    expect(ts.get(TargetLanguage.CSHARP)?.source).toEqual(['using Example.Test.Demo;', 'InterfaceA intA;', 'intA = new InterfaceA { SizeInMBs = 3 };'].join('\n'));
  } finally {
    assembly.cleanup();
  }
});
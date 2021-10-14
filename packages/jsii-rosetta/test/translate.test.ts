import { SnippetTranslator, TypeScriptSnippet, PythonVisitor } from '../lib';
import { VisualizeAstVisitor } from '../lib/languages/visualize';

test('does not fail on "Debug Failure"', () => {
  // GIVEN
  const snippet: TypeScriptSnippet = {
    completeSource: 'Missing literate source file test/integ.restapi-import.lit.ts',
    where: '@aws-cdk.aws-apigateway-README-snippet4',
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
    where: '@aws-cdk.aws-apigateway-README-snippet4',
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
    where: '@aws-cdk.aws-apigateway-README-snippet4',
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

import {
  Assembly,
  ClassType,
  InterfaceType,
  isClassOrInterfaceType,
  Stability,
} from '@jsii/spec';
import * as ts from 'typescript';
import { Block } from 'typescript';

import * as bindings from '../node-bindings';
import { fullyQualifiedName, isDeprecated } from './utils';

type MethodLikeDeclaration =
  | ts.MethodDeclaration
  | ts.ConstructorDeclaration
  | ts.FunctionDeclaration
  | ts.GetAccessorDeclaration
  | ts.SetAccessorDeclaration;

enum ElementType {
  METHOD = 0,
  FUNCTION = 1,
  CLASS = 2,
  PARAMETER = 3,
}

interface Warning {
  readonly elementName: string;
  readonly message: string;
  readonly type: ElementType;
}

export class DeprecatedWarningInjector {
  private readonly index = new Map<
    string,
    ts.ClassDeclaration | ts.InterfaceDeclaration | undefined
  >();
  private deprecatedTypes: ts.Type[] = [];

  public constructor(private readonly typeChecker: ts.TypeChecker) {}

  public get customTransformers(): ts.CustomTransformers {
    return {
      before: [
        (context) => {
          const transformer = new DeprecatedWarningsTransformer(
            this.typeChecker,
            context,
            this.deprecatedTypes,
            this.index,
          );
          return transformer.transform.bind(transformer);
        },
      ],
    };
  }

  public process(assembly: Assembly) {
    if (assembly.types != null) {
      const types: Array<InterfaceType | ClassType> = Object.values(
        assembly.types,
      ).filter(isClassOrInterfaceType);

      for (const type of types) {
        const node = bindings.getClassOrInterfaceRelatedNode(type)!;
        this.index.set(fullyQualifiedName(this.typeChecker, node)!, node);
      }

      this.deprecatedTypes = Object.values(assembly.types)
        .filter((typeInfo) => typeInfo.docs?.stability === Stability.Deprecated)
        .filter(isClassOrInterfaceType)
        .map((typeInfo) => bindings.getClassOrInterfaceRelatedNode(typeInfo)!)
        .map((node) => this.typeChecker.getTypeAtLocation(node));
    }
  }
}

class DeprecatedWarningsTransformer {
  private addWarning = false;
  private warnings: Warning[] = [];
  private readonly typesWithDeprecatedProperties = new Map<ts.Type, ts.Node>();

  public constructor(
    private readonly typeChecker: ts.TypeChecker,
    private readonly context: ts.TransformationContext,
    private readonly deprecatedTypes: ts.Type[],
    private readonly index: Map<
      string,
      ts.ClassDeclaration | ts.InterfaceDeclaration | undefined
    >,
  ) {}

  public transform<T extends ts.Node>(node: T): T {
    if (this.index.size === 0) {
      // Processing didn't happen, probably due to JSII compilation errors
      return node;
    }
    return this.visitEachChild(node);
  }

  private visitEachChild<T extends ts.Node>(node: T): T {
    return ts.visitEachChild(node, this.visitor.bind(this), this.context);
  }

  private visitor<T extends ts.Node>(node: T): ts.VisitResult<T> {
    if (ts.isPropertyDeclaration(node) || ts.isPropertySignature(node)) {
      if (node.parent != null && isDeprecated(node)) {
        const type = this.typeChecker.getTypeAtLocation(node.parent);
        this.typesWithDeprecatedProperties.set(type, node);
      }
    }

    if (ts.isClassDeclaration(node)) {
      this.warnings = [];
      const deprecatedType = this.findDeprecatedInTheTypeHierarchy([
        this.typeChecker.getTypeAtLocation(node),
      ]);
      this.addWarning = deprecatedType != null;
      if (this.addWarning) {
        const deprecatedNode = this.index.get(
          this.typeChecker.getFullyQualifiedName(deprecatedType!.symbol),
        );
        this.warnings.push(
          getWarning(this.typeChecker, deprecatedNode!, ElementType.CLASS),
        );
      }
    }

    if (ts.isFunctionDeclaration(node)) {
      this.warnings = this.getParameterWarnings(node);
      if (isDeprecated(node)) {
        this.warnings.push(
          getWarning(this.typeChecker, node, ElementType.FUNCTION),
        );
      }
      this.addWarning = this.warnings.length > 0;
    }

    if (isMethodLikeDeclaration(node)) {
      const parameterWarnings = this.getParameterWarnings(
        node as any as MethodLikeDeclaration,
      );

      parameterWarnings.forEach((warning: Warning) =>
        this.warnings.push(warning),
      );

      if (isDeprecated(node)) {
        this.warnings.push(
          getWarning(this.typeChecker, node, ElementType.METHOD),
        );
      }

      this.addWarning = this.warnings.length > 0;
    }

    if (ts.isBlock(node) && this.addWarning) {
      const block = node as Block;
      const nodeArray: ts.NodeArray<ts.Statement> = ts.createNodeArray([
        ...this.createWarningStatements(),
        ...block.statements,
      ]);

      // "Unstack" all warnings specific to this block
      this.warnings = this.warnings.filter(
        (warning) =>
          ![ElementType.METHOD, ElementType.PARAMETER].includes(warning.type),
      );
      return ts.updateBlock(node, nodeArray) as any;
    }

    return this.visitEachChild(node);
  }

  private getParameterWarnings(node: MethodLikeDeclaration): Warning[] {
    return node.parameters
      .filter((parameter) =>
        this.typesWithDeprecatedProperties.has(
          this.typeChecker.getTypeAtLocation(parameter),
        ),
      )
      .map(
        (parameter) =>
          getWarning(
            this.typeChecker,
            this.typesWithDeprecatedProperties.get(
              this.typeChecker.getTypeAtLocation(parameter),
            )!,
            ElementType.PARAMETER,
          )!,
      );
  }

  private createWarningStatements(): ts.Statement[] {
    return [...this.warnings].flatMap(createWarningStatement);
  }

  // TODO Rename this method
  private findDeprecatedInTheTypeHierarchy(
    toProcess: ts.Type[],
  ): ts.Type | undefined {
    if (toProcess.length === 0) {
      return undefined;
    }

    if (this.deprecatedTypes.includes(toProcess[0])) {
      return toProcess[0];
    }

    const node = this.index.get(
      this.typeChecker.getFullyQualifiedName(toProcess[0].symbol),
    )!;

    // This type was not declared in the JSII assembly. Skipping.
    if (node == null) {
      return undefined;
    }

    if (!ts.isClassDeclaration(node) && !ts.isInterfaceDeclaration(node)) {
      throw new Error('Node should be a class or interface declaration.');
    }

    const newBatch = toProcess.slice(1);
    const heritageClauses = node.heritageClauses ?? [];
    for (const clause of heritageClauses) {
      for (const expression of clause.types) {
        const type = this.typeChecker.getTypeAtLocation(expression);
        if (!toProcess.includes(type)) {
          newBatch.push(type);
        }
      }
    }

    return this.findDeprecatedInTheTypeHierarchy(newBatch);
  }
}

function createWarningStatement(warning: Warning): ts.Statement[] {
  const message = `${warning?.elementName} is deprecated.\n  ${warning?.message}\n  This API will be removed in the net major release.`;
  // TODO Are random numbers a good idea?
  const functionName = `printWarning${getRandomInt(
    0,
    Number.MAX_SAFE_INTEGER,
  )}`;

  // TODO There must be a simpler way...
  return [
    // TODO Instead of declaring the function everywhere it's used, should we create a single declaration somewhere and reuse it?
    //  If so, where should this declaration go?
    ts.createFunctionDeclaration(
      undefined,
      undefined,
      undefined,
      functionName,
      [],
      [],
      undefined,
      ts.createBlock(
        [
          ts.createExpressionStatement(
            ts.createAssignment(
              ts.createIdentifier('const deprecated'),
              ts.createIdentifier('process.env.DEPRECATED'),
            ),
          ),
          ts.createExpressionStatement(
            ts.createAssignment(
              ts.createIdentifier('const deprecationMode'),
              ts.createIdentifier(
                "['warn', 'error', 'quiet'].includes(deprecated) ? deprecated : \"warn\"",
              ),
            ),
          ),
          ts.createExpressionStatement(
            ts.createAssignment(
              ts.createIdentifier('const message'),
              ts.createLiteral(message),
            ),
          ),
          // ts.createExpressionStatement(
          ts.createSwitch(
            ts.createIdentifier('deprecationMode'),
            ts.createCaseBlock([
              ts.createCaseClause(ts.createLiteral('error'), [
                ts.createThrow(
                  ts.createNew(
                    ts.createIdentifier('Error'),
                    [],
                    [ts.createIdentifier('message')],
                  ),
                ),
                ts.createBreak(),
              ]),
              ts.createCaseClause(ts.createLiteral('warn'), [
                ts.createExpressionStatement(
                  ts.createCall(
                    ts.createIdentifier('console.warn'),
                    [],
                    [ts.createIdentifier("'[WARNING] ' + message")],
                  ),
                ),
                ts.createBreak(),
              ]),
            ]),
          ),
        ],
        true,
      ),
    ),
    ts.createExpressionStatement(
      ts.createCall(ts.createIdentifier(functionName), [], []),
    ),
  ];
}

function isMethodLikeDeclaration(node: ts.Node): boolean {
  return (
    ts.isMethodDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node) ||
    ts.isConstructorDeclaration(node)
  );
}

function getWarning(
  typeChecker: ts.TypeChecker,
  node: ts.Node,
  elementType: ElementType,
): Warning {
  const original = ts.getOriginalNode(node);
  const deprecatedTag = ts
    .getJSDocTags(original)
    .find(
      (tag: ts.JSDocTag) =>
        (tag.tagName.text ?? tag.tagName.escapedText) === 'deprecated',
    )!;

  typeChecker.getTypeAtLocation(node);
  // TODO Find a way to the get fully qualified name of any node
  const fqn = '[NAME PLACEHOLDER]';

  return {
    elementName: fqn,
    message: deprecatedTag.comment,
    type: elementType,
  } as Warning;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

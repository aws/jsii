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
  private moduleName = '';

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
            this.moduleName,
          );
          return transformer.transform.bind(transformer);
        },
      ],
    };
  }

  public process(assembly: Assembly) {
    if (assembly.types != null) {
      this.moduleName = assembly.name;
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
  private warnings: Warning[] = [];

  public constructor(
    private readonly typeChecker: ts.TypeChecker,
    private readonly context: ts.TransformationContext,
    private readonly deprecatedTypes: ts.Type[],
    private readonly index: Map<
      string,
      ts.ClassDeclaration | ts.InterfaceDeclaration | undefined
    >,
    private readonly moduleName: string,
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
    if (ts.isClassDeclaration(node)) {
      this.handleClassDeclaration(node);
    }

    if (ts.isFunctionDeclaration(node)) {
      this.handleFunctionDeclaration(node);
    }

    if (isMethodLikeDeclaration(node)) {
      this.handleMethodLikeDeclaration(node);
    }

    if (ts.isBlock(node)) {
      if (this.warnings.length > 0) {
        const block = node as Block;
        const nodeArray: ts.NodeArray<ts.Statement> = ts.createNodeArray([
          ...this.createWarningStatements(),
          ...block.statements,
        ]);

        // "Pop" all warnings specific to this block
        this.warnings = this.warnings.filter(
          (warning) =>
            ![ElementType.METHOD, ElementType.PARAMETER].includes(warning.type),
        );
        return ts.updateBlock(node, nodeArray) as any;
      }
    }

    return this.visitEachChild(node);
  }

  private handleMethodLikeDeclaration(node: ts.Node) {
    const parameterWarnings = this.getParameterWarnings([
      ...(node as any as MethodLikeDeclaration).parameters,
    ]);

    parameterWarnings.forEach((warning: Warning) =>
      this.warnings.push(warning),
    );

    if (isDeprecated(node)) {
      this.warnings.push(getWarning(node, ElementType.METHOD, this.moduleName));
    }
  }

  private handleFunctionDeclaration<T>(node: T & ts.FunctionDeclaration) {
    this.warnings = this.getParameterWarnings([
      ...(node as any as MethodLikeDeclaration).parameters,
    ]);

    if (isDeprecated(node)) {
      this.warnings.push(
        getWarning(node, ElementType.FUNCTION, this.moduleName),
      );
    }
  }

  private handleClassDeclaration<T>(node: T & ts.ClassDeclaration) {
    this.warnings = [];
    const deprecatedType = this.findDeprecatedInTheTypeHierarchy([
      this.typeChecker.getTypeAtLocation(node),
    ]);
    if (deprecatedType != null) {
      const deprecatedNode = this.index.get(
        this.typeChecker.getFullyQualifiedName(deprecatedType.symbol),
      );
      this.warnings.push(
        getWarning(deprecatedNode!, ElementType.CLASS, this.moduleName),
      );
    }
  }

  // TODO rename this method
  private getWarningForHeritage(node: ts.Node): Warning | undefined {
    const type = this.typeChecker.getTypeAtLocation(node);
    const declaration = type.symbol?.declarations[0];
    if (
      declaration == null ||
      (!ts.isClassDeclaration(declaration) &&
        !ts.isInterfaceDeclaration(declaration))
    ) {
      // This type doesn't have a hierarchy (e.g., a primitive type)
      return undefined;
    }

    const deprecatedType = this.findDeprecatedInTheTypeHierarchy([type]);
    return deprecatedType != null
      ? getWarning(
          deprecatedType.symbol.declarations[0],
          ElementType.PARAMETER,
          this.moduleName,
        )
      : undefined; // There is no deprecated type in its heritage chain
  }

  private getParameterWarnings(
    toProcess: ts.Node[],
    result: Warning[] = [],
  ): Warning[] {
    if (toProcess.length === 0) {
      return result;
    }

    const node = toProcess[0];
    const warning = this.getWarningForHeritage(node);
    const warnings: Warning[] = warning != null ? [warning] : [];
    if (isDeprecated(node)) {
      warnings.push(getWarning(node, ElementType.PARAMETER, this.moduleName));
    }
    const type = this.typeChecker.getTypeAtLocation(node);
    const declaration = type.symbol?.declarations[0]; // TODO Is there really only one?
    let newBatch: ts.Node[] = [];
    if (declaration != null && ts.isInterfaceDeclaration(declaration)) {
      if (isDeprecated(declaration)) {
        warnings.push(
          getWarning(declaration, ElementType.PARAMETER, this.moduleName),
        );
      }
      newBatch = type.getProperties().map((p) => p.declarations[0]);
    }
    return this.getParameterWarnings(
      toProcess.slice(1).concat(newBatch),
      result.concat(warnings),
    );
  }

  private createWarningStatements(): ts.Statement[] {
    return [...this.warnings].flatMap((w) => this.createWarningStatement(w));
  }

  // TODO Rename this method
  private findDeprecatedInTheTypeHierarchy(
    toProcess: ts.Type[],
  ): ts.Type | undefined {
    if (toProcess.length === 0) {
      return undefined;
    }

    const type = toProcess[0];
    if (this.deprecatedTypes.includes(type)) {
      return type;
    }

    const node = this.index.get(
      this.typeChecker.getFullyQualifiedName(type.symbol),
    );

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

  private createWarningStatement(warning: Warning): ts.Statement[] {
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
  node: ts.Node,
  elementType: ElementType,
  moduleName: string,
): Warning {
  const original = ts.getOriginalNode(node);
  const deprecatedTag = ts
    .getJSDocTags(original)
    .find(
      (tag: ts.JSDocTag) =>
        (tag.tagName.text ?? tag.tagName.escapedText) === 'deprecated',
    )!;

  const fqnComponents: string[] = [];
  let currentNode = node;
  do {
    const declaration = ts.getNameOfDeclaration(currentNode as ts.Declaration);
    if (declaration != null) {
      fqnComponents.unshift(declaration.getText());
    }
    currentNode = currentNode.parent;
  } while (currentNode != null);
  fqnComponents.unshift(moduleName);

  const fqn = fqnComponents.join('.');

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

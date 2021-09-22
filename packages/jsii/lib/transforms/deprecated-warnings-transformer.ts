import {
  Assembly,
  ClassType,
  InterfaceType,
  isClassOrInterfaceType,
  Stability,
} from '@jsii/spec';
import * as ts from 'typescript';

import * as bindings from '../node-bindings';
import { fullyQualifiedName, isDeprecated } from './utils';

type MethodLikeDeclaration =
  | ts.MethodDeclaration
  | ts.ConstructorDeclaration
  | ts.GetAccessorDeclaration
  | ts.SetAccessorDeclaration;

interface Warning {
  readonly elementName: string;
  readonly message: string;
}

export class DeprecatedWarningInjector {
  private readonly index = new Map<
    string,
    ts.ClassDeclaration | ts.InterfaceDeclaration
  >();
  private deprecatedTypes = new Set<ts.Type>();
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
    if (assembly.types == null) {
      return;
    }

    this.moduleName = assembly.name;
    const types: Array<InterfaceType | ClassType> = Object.values(
      assembly.types,
    ).filter(isClassOrInterfaceType);
    for (const type of types) {
      const node = bindings.getClassOrInterfaceRelatedNode(type)!;
      this.index.set(fullyQualifiedName(this.typeChecker, node)!, node);
    }
    this.deprecatedTypes = new Set(
      Object.values(assembly.types)
        .filter((typeInfo) => typeInfo.docs?.stability === Stability.Deprecated)
        .filter(isClassOrInterfaceType)
        .map((typeInfo) => bindings.getClassOrInterfaceRelatedNode(typeInfo)!)
        .map((node) => this.typeChecker.getTypeAtLocation(node)),
    );
  }
}

class DeprecatedWarningsTransformer {
  private warnings: Warning[] = [];

  public constructor(
    private readonly typeChecker: ts.TypeChecker,
    private readonly context: ts.TransformationContext,
    private readonly deprecatedTypes: Set<ts.Type>,
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

    if (isMethodLikeDeclaration(node)) {
      const declaration = node as any as MethodLikeDeclaration;
      const warnings = this.warnings.concat(
        this.getParameterWarnings([...declaration.parameters]),
      );

      if (isDeprecated(node)) {
        warnings.push(getWarning(node, this.moduleName));
      }

      const body = declaration.body;
      if (body != null && warnings.length > 0) {
        const warningStatements = this.createWarningStatements(warnings);
        const nodeArray = ts.createNodeArray([
          ...warningStatements,
          ...body.statements,
        ]);

        if (ts.isConstructorDeclaration(declaration)) {
          return ts.updateConstructor(
            declaration,
            declaration.decorators,
            declaration.modifiers,
            declaration.parameters,
            ts.updateBlock(body, nodeArray),
          ) as any;
        } else if (ts.isMethodDeclaration(declaration)) {
          return ts.updateMethod(
            declaration,
            declaration.decorators,
            declaration.modifiers,
            declaration.asteriskToken,
            declaration.name,
            declaration.questionToken,
            declaration.typeParameters,
            declaration.parameters,
            declaration.type,
            ts.updateBlock(body, nodeArray),
          ) as any;
        } else if (ts.isSetAccessorDeclaration(declaration)) {
          return ts.updateSetAccessor(
            declaration,
            declaration.decorators,
            declaration.modifiers,
            declaration.name,
            declaration.parameters,
            ts.updateBlock(body, nodeArray),
          ) as any;
        } else if (ts.isGetAccessorDeclaration(declaration)) {
          return ts.updateGetAccessor(
            declaration,
            declaration.decorators,
            declaration.modifiers,
            declaration.name,
            declaration.parameters,
            declaration.type,
            ts.updateBlock(body, nodeArray),
          ) as any;
        }
      } else {
        return declaration as any;
      }
    }

    return this.visitEachChild(node);
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
      this.warnings.push(getWarning(deprecatedNode!, this.moduleName));
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
      ? getWarning(deprecatedType.symbol.declarations[0], this.moduleName)
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
      warnings.push(getWarning(node, this.moduleName));
    }
    const type = this.typeChecker.getTypeAtLocation(node);
    const declaration = type.symbol?.declarations[0];
    let newBatch: ts.Node[] = [];
    // In some cases (e.g., enums) the declaration is the node itself. Not including them twice here
    if (declaration != null && declaration !== node) {
      if (isDeprecated(declaration)) {
        warnings.push(getWarning(declaration, this.moduleName));
      }
      if (
        ts.isInterfaceDeclaration(declaration) ||
        ts.isClassDeclaration(node)
      ) {
        newBatch = type.getProperties().map((p) => p.declarations[0]);
      }
      if (ts.isEnumDeclaration(declaration)) {
        newBatch = [...declaration.members];
      }
    }
    return this.getParameterWarnings(
      toProcess.slice(1).concat(newBatch),
      result.concat(warnings),
    );
  }

  private createWarningStatements(warnings: Warning[]): ts.Statement[] {
    return warnings.flatMap((w) => this.createWarningStatement(w));
  }

  // TODO Rename this method
  private findDeprecatedInTheTypeHierarchy(
    toProcess: ts.Type[],
  ): ts.Type | undefined {
    if (toProcess.length === 0) {
      return undefined;
    }

    const type = toProcess[0];
    if (this.deprecatedTypes.has(type)) {
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
    function createParameter(name: string) {
      return ts.createParameter(
        undefined,
        undefined,
        undefined,
        name,
        undefined,
        undefined,
        undefined,
      );
    }

    const message =
      '`${name} is deprecated.\\n  ${deprecationMessage}\\n  This API will be removed in the next major release.`';
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
        undefined, // decorators
        undefined, // modifiers
        undefined, // asteriskToken
        functionName,
        [], // typeParameters
        ['name', 'deprecationMessage', 'value'].map(createParameter),
        undefined, // type
        ts.createBlock(
          [
            ts.createExpressionStatement(
              ts.createAssignment(
                ts.createIdentifier('const deprecated'),
                ts.createIdentifier('process.env.JSII_DEPRECATED'),
              ),
            ),
            ts.createExpressionStatement(
              ts.createAssignment(
                ts.createIdentifier('const deprecationMode'),
                ts.createIdentifier(
                  "['warn', 'fail', 'quiet'].includes(deprecated) ? deprecated : 'warn'",
                ),
              ),
            ),
            ts.createExpressionStatement(
              ts.createAssignment(
                ts.createIdentifier('const message'),
                ts.createIdentifier(message),
              ),
            ),
            ts.createSwitch(
              ts.createIdentifier('deprecationMode'),
              ts.createCaseBlock([
                ts.createCaseClause(ts.createLiteral('fail'), [
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
                      [
                        ts.createLiteral('[WARNING]'),
                        ts.createIdentifier('message'),
                      ],
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
        ts.createCall(
          ts.createIdentifier(functionName),
          [],
          [
            ts.createLiteral(warning.elementName),
            ts.createLiteral(warning.message),
          ],
        ),
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

function getWarning(node: ts.Node, moduleName: string): Warning {
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
  } as Warning;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

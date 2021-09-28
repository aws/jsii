import {
  Assembly,
  ClassType,
  InterfaceType,
  isClassOrInterfaceType,
  Stability,
} from '@jsii/spec';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

import * as bindings from '../node-bindings';
import { fullyQualifiedName, isDeprecated, isInternal } from './utils';

const WARNING_FUNCTION_NAME = 'printJsiiDeprecationWarnings';
const FILE_NAME = '.warnings.jsii.js';

type MethodLikeDeclaration =
  | ts.MethodDeclaration
  | ts.ConstructorDeclaration
  | ts.GetAccessorDeclaration
  | ts.SetAccessorDeclaration;

interface Warning {
  readonly elementName: string;
  readonly message: string;
  readonly path?: string;
}

export class DeprecatedWarningInjector {
  private readonly declarationIndex = new Map<
    string,
    ts.ClassDeclaration | ts.InterfaceDeclaration
  >();
  private deprecatedTypes = new Set<ts.Type>();
  private moduleName = '';
  private projectRoot = '';

  public constructor(private readonly typeChecker: ts.TypeChecker) {}

  public get customTransformers(): ts.CustomTransformers {
    return {
      before: [
        (context) => {
          const transformer = new DeprecatedWarningsTransformer(
            this.typeChecker,
            context,
            this.deprecatedTypes,
            this.declarationIndex,
            this.moduleName,
            this.projectRoot,
          );
          return transformer.transform.bind(transformer);
        },
      ],
    };
  }

  public process(assembly: Assembly, projectRoot: string) {
    if (assembly.types == null) {
      return;
    }

    this.moduleName = assembly.name;
    this.projectRoot = projectRoot;
    const types: Array<InterfaceType | ClassType> = Object.values(
      assembly.types,
    ).filter(isClassOrInterfaceType);
    for (const type of types) {
      const node = bindings.getClassOrInterfaceRelatedNode(type)!;
      this.declarationIndex.set(
        fullyQualifiedName(this.typeChecker, node)!,
        node,
      );
    }
    this.deprecatedTypes = new Set(
      Object.values(assembly.types)
        .filter((typeInfo) => typeInfo.docs?.stability === Stability.Deprecated)
        .filter(isClassOrInterfaceType)
        .map((typeInfo) => bindings.getClassOrInterfaceRelatedNode(typeInfo)!)
        .map((node) => this.typeChecker.getTypeAtLocation(node)),
    );

    this.createWarningFunction();
  }

  private createWarningFunction() {
    const functionText = `function ${WARNING_FUNCTION_NAME}(name, deprecationMessage, value) {
  if (value != null) {
    const deprecated = process.env.JSII_DEPRECATED;
    const deprecationMode = ['warn', 'fail', 'quiet'].includes(deprecated) ? deprecated : 'warn';
    const message = \`\${name} is deprecated.\\n  \${deprecationMessage}\\n  This API will be removed in the next major release.\`;
    switch (deprecationMode) {
      case "fail":
        throw new Error(message);
      case "warn":
        console.warn("[WARNING]", message);
        break;
    }
  }
}

module.exports = ${WARNING_FUNCTION_NAME}`;

    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const resultFile = ts.createSourceFile(
      FILE_NAME,
      functionText,
      ts.ScriptTarget.Latest,
      false,
      ts.ScriptKind.JS,
    );

    fs.writeFileSync(
      path.join(this.projectRoot, FILE_NAME),
      printer.printFile(resultFile),
    );
  }
}

class DeprecatedWarningsTransformer {
  private warnings: Warning[] = [];

  public constructor(
    private readonly typeChecker: ts.TypeChecker,
    private readonly context: ts.TransformationContext,
    private readonly deprecatedTypes: Set<ts.Type>,
    private readonly declarationIndex: Map<
      string,
      ts.ClassDeclaration | ts.InterfaceDeclaration
    >,
    private readonly moduleName: string,
    private readonly projectRoot: string,
  ) {}

  public transform<T extends ts.Node>(node: T): T {
    if (this.declarationIndex.size === 0) {
      // Processing didn't happen, probably due to JSII compilation errors
      return node;
    }
    const result = this.visitEachChild(node);

    if (ts.isSourceFile(result)) {
      const importPath = path.join(
        path.relative(path.dirname(result.fileName), this.projectRoot),
        FILE_NAME,
      );

      return ts.updateSourceFileNode(result, [
        ts.createImportEqualsDeclaration(
          undefined,
          undefined,
          WARNING_FUNCTION_NAME,
          ts.createExternalModuleReference(ts.createLiteral(importPath)),
        ),
        ...result.statements,
      ]) as any;
    }
    return result;
  }

  private visitEachChild<T extends ts.Node>(node: T): T {
    return ts.visitEachChild(node, this.visitor.bind(this), this.context);
  }

  private visitor<T extends ts.Node>(node: T): ts.VisitResult<T> {
    if (ts.isClassDeclaration(node)) {
      this.handleClassDeclaration(node);
    }

    if (isMethodLikeDeclaration(node) && !isInternal(node)) {
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
        const nodeArray = insertStatements(body, warningStatements);

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
      const deprecatedNode = this.declarationIndex.get(
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

    const backlog = this.getImmediateSuperTypes(declaration, [type]);
    const deprecatedType = this.findDeprecatedInTheTypeHierarchy(backlog);
    return deprecatedType != null
      ? getWarning(deprecatedType.symbol.declarations[0], this.moduleName)
      : undefined; // There is no deprecated type in its heritage chain
  }

  private getParameterWarnings(
    parameters: ts.ParameterDeclaration[],
  ): Warning[] {
    // TODO In which situations does getNameOfDeclaration return undefined?
    const names = parameters.map((p) => ts.getNameOfDeclaration(p)!.getText());
    return this.buildParameterWarnings(parameters, names);
  }

  private buildParameterWarnings(
    toProcess: ts.Node[],
    paths: string[] = [],
    result: Warning[] = [],
    visited: Set<ts.Node> = new Set(),
  ): Warning[] {
    if (toProcess.length === 0) {
      return result;
    }
    const moduleName = this.moduleName;
    const typeChecker = this.typeChecker;
    const projectRoot = this.projectRoot;
    const getWarningForHeritage = this.getWarningForHeritage.bind(this);

    const node = toProcess[0];
    const path = paths[0];

    const warning = getPossibleWarning(node);
    const types = getAllTypes(node);
    const warnings = getWarningsForTypes(types);
    const children = getChildren(types);

    const nextBatch = toProcess
      .slice(1)
      .concat(children)
      .filter((child) => !visited.has(child))
      .map((node) => node as ts.Declaration);

    const nextPaths = paths
      .slice(1)
      .concat(children.filter((child) => !visited.has(child)).map(getPath));

    const accumulatedResult = result
      .concat(warnings)
      .concat(warning ? [warning] : []);
    const accumulatedVisited = new Set(visited);
    accumulatedVisited.add(node);

    return this.buildParameterWarnings(
      nextBatch,
      nextPaths,
      accumulatedResult,
      accumulatedVisited,
    );

    function getAllTypes(node: ts.Node): ts.Type[] {
      const type = typeChecker.getTypeAtLocation(node);
      return type.isUnionOrIntersection()
        ? (type as ts.UnionType | ts.IntersectionType).types
        : [type];
    }

    function getPossibleWarning(node: ts.Node): Warning | undefined {
      return isDeprecated(node) && !isInternal(node)
        ? getWarning(node, moduleName, path)
        : getWarningForHeritage(node);
    }

    function getChildren(types: ts.Type[]): ts.Declaration[] {
      return types.flatMap((type) =>
        type.getProperties().flatMap((symbol) => {
          const declarations = symbol.declarations;
          const typeIsInTheCompiledModule = declarations
            .map((d) => d.getSourceFile().fileName)
            .some((name: string) => name.startsWith(projectRoot));
          return typeIsInTheCompiledModule ? symbol.declarations : [];
        }),
      );
    }

    function getWarningsForTypes(types: ts.Type[]): Warning[] {
      return types
        .flatMap((type) => type.symbol?.declarations)
        .filter((d) => d != null)
        .map((d) => getPossibleWarning(d))
        .filter((warning) => warning != null)
        .map((w) => w!); // We have no undefined warnings at this point
    }

    function getPath(node: ts.Declaration): string {
      const name = ts.getNameOfDeclaration(node)?.getText();
      return name != null ? `${path}.${name}` : '';
    }
  }

  private createWarningStatements(warnings: Warning[]): ts.Statement[] {
    return warnings.flatMap((w) => this.createWarningStatement(w));
  }

  /**
   * Given a list of types, returns all types in the transitive closure of their
   * inheritance graphs that are deprecated
   * @param backlog The list of roots to the inheritance graphs
   */
  private findDeprecatedInTheTypeHierarchy(
    backlog: ts.Type[],
  ): ts.Type | undefined {
    if (backlog.length === 0) {
      return undefined;
    }

    const type = backlog[0];
    if (this.deprecatedTypes.has(type)) {
      return type;
    }

    const node = this.declarationIndex.get(
      this.typeChecker.getFullyQualifiedName(type.symbol),
    );

    if (
      node == null || // This type was not declared in the JSII assembly. Skipping.
      isInternal(node)
    ) {
      return undefined;
    }

    if (!ts.isClassDeclaration(node) && !ts.isInterfaceDeclaration(node)) {
      throw new Error('Node should be a class or interface declaration.');
    }

    const newBatch = this.getImmediateSuperTypes(node, backlog);

    return this.findDeprecatedInTheTypeHierarchy(newBatch);
  }

  /**
   * Given a class or interface declaration, finds the declarations of the
   * class and interfaces that it extends and implements, respectively. This
   * result is added to the tail of a list of known types, without duplication.
   * @param node A class or interface declaration
   * @param types A list of known types
   */
  private getImmediateSuperTypes(
    node: ts.ClassDeclaration | ts.InterfaceDeclaration,
    types: ts.Type[],
  ): ts.Type[] {
    const result = types.slice(1);
    const heritageClauses = node.heritageClauses ?? [];
    for (const clause of heritageClauses) {
      for (const expression of clause.types) {
        const type = this.typeChecker.getTypeAtLocation(expression);
        if (!types.includes(type)) {
          result.push(type);
        }
      }
    }
    return result;
  }

  private createWarningStatement(warning: Warning): ts.Statement[] {
    return [
      ts.createExpressionStatement(
        ts.createCall(
          ts.createIdentifier(WARNING_FUNCTION_NAME),
          [],
          warningFunctionArguments(),
        ),
      ),
    ];

    function warningFunctionArguments(): ts.Expression[] {
      const message = warning.message ?? '';
      const baseArguments: ts.Expression[] = [
        ts.createLiteral(warning.elementName),
        ts.createLiteral(message),
      ];
      const valueArg =
        warning.path != null
          ? ts.createIdentifier(warning.path)
          : ts.createLiteral('');
      return baseArguments.concat(valueArg);
    }
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

function makeFqn(node: ts.Node, moduleName: string) {
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

  return fqnComponents.join('.');
}

function getWarning(node: ts.Node, moduleName: string, path?: string): Warning {
  const original = ts.getOriginalNode(node);
  const deprecatedTag = ts
    .getJSDocTags(original)
    .find(
      (tag: ts.JSDocTag) =>
        (tag.tagName.text ?? tag.tagName.escapedText) === 'deprecated',
    )!;
  const fqn = makeFqn(node, moduleName);

  return {
    elementName: fqn,
    message: deprecatedTag.comment,
    path,
  } as Warning;
}

/**
 * Insert a list of statements in the correct position inside a block of statements.
 * If there is a `super` call, It inserts the statements just after it. Otherwise,
 * insert the statements right at the beginning of the block.
 */
function insertStatements(block: ts.Block, newStatements: ts.Statement[]) {
  function splicePoint(statement: ts.Statement | undefined) {
    if (statement == null) {
      return 0;
    }
    let isSuper = false;
    statement.forEachChild((node) => {
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.SuperKeyword
      ) {
        isSuper = true;
      }
    });
    return isSuper ? 1 : 0;
  }

  const result = [...block.statements];
  result.splice(splicePoint(block.statements[0]), 0, ...newStatements);
  return ts.createNodeArray(result);
}

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

interface Warning {
  readonly elementName: string;
  readonly message: string;
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
  private warning?: Warning;

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
    return this.visitEachChild(node);
  }

  private visitEachChild<T extends ts.Node>(node: T): T {
    return ts.visitEachChild(node, this.visitor.bind(this), this.context);
  }

  private visitor<T extends ts.Node>(node: T): ts.VisitResult<T> {
    if (ts.isClassDeclaration(node)) {
      const deprecatedType = this.findDeprecated([
        this.typeChecker.getTypeAtLocation(node),
      ]);
      this.addWarning = deprecatedType != null;
      if (this.addWarning) {
        const deprecatedNode = this.index.get(
          this.typeChecker.getFullyQualifiedName(deprecatedType!.symbol),
        );
        this.warning = getWarning(this.typeChecker, deprecatedNode!);
      }
    }

    if (ts.isFunctionDeclaration(node)) {
      this.addWarning = isDeprecated(node);
      if (this.addWarning) {
        this.warning = getWarning(this.typeChecker, node);
      }
    }

    if (isMethodLikeDeclaration(node)) {
      this.addWarning = this.addWarning || isDeprecated(node);
      if (isDeprecated(node)) {
        this.warning = getWarning(this.typeChecker, node);
      }
    }

    if (ts.isBlock(node) && this.addWarning) {
      const block = node as Block;
      const warningStatement = this.createWarningStatement();
      return ts.updateBlock(
        node,
        ts.createNodeArray([...warningStatement, ...block.statements]),
      ) as any;
    }

    return this.visitEachChild(node);
  }

  private createWarningStatement() {
    const warning = this.warning;
    const message = `[WARNING] ${warning?.elementName} is deprecated.\n  ${warning?.message}\n  This API will be removed in the net major release.`;

    // TODO There should be a simpler way...
    return [
      // TODO Instead of declaring the function everywhere it's used, should we create a single declaration somewhere and reuse it?
      //  If so, where should this declaration go?
      ts.createFunctionDeclaration(
        undefined,
        undefined,
        undefined,
        'printWarning',
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
                ts.createLiteral(
                  `${warning?.elementName} is deprecated.\n  ${warning?.message}\n  This API will be removed in the net major release.`,
                ),
              ),
            ),
            // ts.createExpressionStatement(
            ts.createSwitch(
              ts.createIdentifier('deprecationMode'),
              ts.createCaseBlock([
                ts.createCaseClause(ts.createLiteral('error'), [
                  ts.createThrow(
                    ts.createNew(ts.createIdentifier('Error'), [], []),
                  ),
                  ts.createBreak(),
                ]),
                ts.createCaseClause(ts.createLiteral('warn'), [
                  ts.createExpressionStatement(
                    ts.createCall(
                      ts.createIdentifier('console.warn'),
                      [],
                      [ts.createLiteral(message)],
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
        ts.createCall(ts.createIdentifier('printWarning'), [], []),
      ),
    ];
  }

  private findDeprecated(toProcess: ts.Type[]): ts.Type | undefined {
    if (toProcess.length === 0) {
      return undefined;
    }

    if (this.deprecatedTypes.includes(toProcess[0])) {
      return toProcess[0];
    }

    const node = this.index.get(
      this.typeChecker.getFullyQualifiedName(toProcess[0].symbol),
    )!;
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

    return this.findDeprecated(newBatch);
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
  typeChecker: ts.TypeChecker,
  node: ts.Node,
): Warning | undefined {
  const original = ts.getOriginalNode(node);
  const warnings = ts
    .getJSDocTags(original)
    .filter(
      (tag) => (tag.tagName.text ?? tag.tagName.escapedText) === 'deprecated',
    )
    .map((tag: ts.JSDocTag) => {
      const type = typeChecker.getTypeAtLocation(node);
      // TODO We need a better fully qualified name
      const fqn = typeChecker.getFullyQualifiedName(type.symbol);
      return {
        elementName: fqn,
        message: tag.comment,
      } as Warning;
    });
  return warnings[0];
}

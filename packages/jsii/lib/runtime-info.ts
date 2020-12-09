import * as spec from '@jsii/spec';
import * as ts from 'typescript';

/**
 * A limited subset of the Map<ts.ClassDeclaration, spec.TypeBase> to ease testing.
 */
export interface RuntimeClassInfo {
  get(key: ts.ClassDeclaration): spec.TypeBase | undefined;
}

export class RuntimeTypeInfoInjector {
  public constructor(
    private readonly version: string,
    private readonly typeInfo: RuntimeClassInfo,
  ) {}

  public makeTransformers(): ts.CustomTransformers {
    return {
      before: [this.runtimeTypeTransformer()],
    };
  }

  public runtimeTypeTransformer(): ts.TransformerFactory<ts.SourceFile> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return (context) => {
      return (sourceFile) => {
        const rttiSymbolIdentifier = ts.createIdentifier('vfqnSym');
        const rttiSymbol = ts.createCall(
          ts.createPropertyAccess(
            ts.createIdentifier('Symbol'),
            ts.createIdentifier('for'),
          ),
          undefined,
          [ts.createStringLiteral('jsii.rtti')],
        );
        const rttiSymbolDeclaration = ts.createVariableDeclaration(
          rttiSymbolIdentifier,
          undefined,
          rttiSymbol,
        );

        sourceFile = ts.updateSourceFileNode(sourceFile, [
          ts.createVariableStatement([], [rttiSymbolDeclaration]),
          ...sourceFile.statements,
        ]);

        const visitor = (node: ts.Node): ts.Node => {
          if (ts.isClassDeclaration(node)) {
            return self.addRuntimeInfoToClass(node, rttiSymbolIdentifier);
          }
          return ts.visitEachChild(node, visitor, context);
        };

        return ts.visitNode(sourceFile, visitor);
      };
    };
  }

  private addRuntimeInfoToClass(
    node: ts.ClassDeclaration,
    rttiSymbol: ts.Identifier,
  ): ts.ClassDeclaration {
    const nodeTypeInfo = this.typeInfo.get(node);
    if (!nodeTypeInfo) {
      return node;
    }

    const runtimeInfo = ts.createObjectLiteral([
      ts.createPropertyAssignment(
        ts.createIdentifier('fqn'),
        ts.createStringLiteral(nodeTypeInfo.fqn),
      ),
      ts.createPropertyAssignment(
        ts.createIdentifier('version'),
        ts.createStringLiteral(this.version),
      ),
    ]);
    const runtimeProperty = ts.createProperty(
      undefined,
      ts.createModifiersFromModifierFlags(
        ts.ModifierFlags.Private | ts.ModifierFlags.Static,
      ),
      ts.createComputedPropertyName(rttiSymbol),
      undefined,
      undefined,
      runtimeInfo,
    );
    return ts.updateClassDeclaration(
      node,
      node.decorators,
      node.modifiers,
      node.name,
      node.typeParameters,
      node.heritageClauses,
      [runtimeProperty, ...node.members],
    );
  }
}

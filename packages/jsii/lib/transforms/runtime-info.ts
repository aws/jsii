import * as ts from 'typescript';

/**
 * Provides a TransformerFactory to annotate classes with runtime information
 * (e.g., fully-qualified name, version).
 *
 * It does this by first inserting this definition at the top of each source file:
 * ```
 * var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
 * ```
 *
 * Then, for each class that has registered runtime information during assembly,
 * insert a static member to the class with its fqn and version:
 * ```
 * private static readonly [JSII_RTTI_SYMBOL_1] = { fqn: "ModuleName.ClassName", version: "1.2.3" }
 * ```
 */
export class RuntimeTypeInfoInjector {
  private readonly fqnsByClass = new Map<ts.ClassDeclaration, string>();

  public constructor(private readonly version: string) {}

  /**
   * Register the fully-qualified name (fqn) of a class with its ClassDeclaration.
   * Only ClassDeclarations with registered fqns will be annotated.
   */
  public registerClassFqn(clazz: ts.ClassDeclaration, fqn: string) {
    this.fqnsByClass.set(clazz, fqn);
  }

  /**
   * Return the set of Transformers to be used in TSC's program.emit()
   */
  public makeTransformers(): ts.CustomTransformers {
    return {
      before: [this.runtimeTypeTransformer()],
    };
  }

  public runtimeTypeTransformer(): ts.TransformerFactory<ts.SourceFile> {
    return (context) => {
      return (sourceFile) => {
        const rttiSymbolIdentifier = ts.createUniqueName('JSII_RTTI_SYMBOL');

        let classesAnnotated = false;
        const visitor = (node: ts.Node): ts.Node => {
          if (ts.isClassDeclaration(node)) {
            const fqn = this.getClassFqn(node);
            if (fqn) {
              classesAnnotated = true;
              return this.addRuntimeInfoToClass(
                node,
                fqn,
                rttiSymbolIdentifier,
              );
            }
          }
          return ts.visitEachChild(node, visitor, context);
        };

        // Visit the source file, annotating the classes.
        let annotatedSourceFile = ts.visitNode(sourceFile, visitor);

        // Only add the symbol definition if it's actually used.
        if (classesAnnotated) {
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
          const variableDeclaration = ts.createVariableStatement(
            [],
            ts.createVariableDeclarationList(
              [rttiSymbolDeclaration],
              ts.NodeFlags.Const,
            ),
          );

          annotatedSourceFile = ts.updateSourceFileNode(annotatedSourceFile, [
            variableDeclaration,
            ...annotatedSourceFile.statements,
          ]);
        }

        return annotatedSourceFile;
      };
    };
  }

  /** Used instead of direct access to the map to facilitate testing. */
  protected getClassFqn(clazz: ts.ClassDeclaration): string | undefined {
    return this.fqnsByClass.get(clazz);
  }

  /**
   * If the ClassDeclaration has an associated fully-qualified name registered,
   * will append a static property to the class with the fqn and version.
   */
  private addRuntimeInfoToClass(
    node: ts.ClassDeclaration,
    fqn: string,
    rttiSymbol: ts.Identifier,
  ): ts.ClassDeclaration {
    const runtimeInfo = ts.createObjectLiteral([
      ts.createPropertyAssignment(
        ts.createIdentifier('fqn'),
        ts.createStringLiteral(fqn),
      ),
      ts.createPropertyAssignment(
        ts.createIdentifier('version'),
        ts.createStringLiteral(this.version),
      ),
    ]);
    const runtimeProperty = ts.createProperty(
      undefined,
      ts.createModifiersFromModifierFlags(
        ts.ModifierFlags.Private |
          ts.ModifierFlags.Static |
          ts.ModifierFlags.Readonly,
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

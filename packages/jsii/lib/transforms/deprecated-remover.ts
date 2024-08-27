import {
  Assembly,
  ClassType,
  EnumMember,
  Initializer,
  InterfaceType,
  isClassOrInterfaceType,
  isClassType,
  isCollectionTypeReference,
  isEnumType,
  isMethod,
  isNamedTypeReference,
  isPrimitiveTypeReference,
  Method,
  Parameter,
  Property,
  Stability,
  TypeReference,
} from '@jsii/spec';
import { basename, dirname, relative } from 'path';
import * as ts from 'typescript';

import { JsiiDiagnostic } from '../jsii-diagnostic';
import * as bindings from '../node-bindings';

export class DeprecatedRemover {
  private readonly transformations = new Array<Transformation>();
  private readonly nodesToRemove = new Set<ts.Node>();

  public constructor(
    private readonly typeChecker: ts.TypeChecker,
    private readonly allowlistedDeprecations: Set<string> | undefined,
  ) {}

  /**
   * Obtains the configuration for the TypeScript transform(s) that will remove
   * `@deprecated` members from the generated declarations (`.d.ts`) files. It
   * will leverage information accumulated during `#removeFrom(Assembly)` in
   * order to apply corrections to inheritance chains, ensuring a valid output
   * is produced.
   */
  public get customTransformers(): ts.CustomTransformers {
    return {
      afterDeclarations: [
        (context) => {
          const transformer = new DeprecationRemovalTransformer(
            this.typeChecker,
            context,
            this.transformations,
            this.nodesToRemove,
          );
          return transformer.transform.bind(transformer);
        },
      ],
    };
  }

  /**
   * Removes all `@deprecated` API elements from the provided assembly, and
   * records the operations needed in order to fix the inheritance chains that
   * mix `@deprecated` and non-`@deprecated` types.
   *
   * @param assembly the assembly to be modified.
   *
   * @returns diagnostic messages produced when validating no remaining API
   *          makes use of a `@deprecated` type that was removed.
   */
  public removeFrom(assembly: Assembly): readonly JsiiDiagnostic[] {
    if (assembly.types == null) {
      return [];
    }

    const strippedFqns = new Set<string>();
    const replaceWithClass = new Map<string, string>();
    const replaceWithInterfaces = new Map<string, readonly string[]>();

    // Find all types that will be stripped out
    for (const [fqn, typeInfo] of Object.entries(assembly.types)) {
      if (typeInfo.docs?.stability === Stability.Deprecated) {
        if (!this.shouldFqnBeStripped(fqn)) {
          continue;
        }
        strippedFqns.add(fqn);

        if (isClassType(typeInfo) && typeInfo.base != null) {
          replaceWithClass.set(fqn, typeInfo.base);
        }
        if (isClassOrInterfaceType(typeInfo) && typeInfo.interfaces != null) {
          replaceWithInterfaces.set(fqn, typeInfo.interfaces);
        }

        this.nodesToRemove.add(bindings.getRelatedNode(typeInfo)!);
      }
    }

    for (const [fqn, typeInfo] of Object.entries(assembly.types)) {
      // Ignore `@deprecated` types
      if (strippedFqns.has(fqn)) {
        continue;
      }

      // Enums cannot have references to `@deprecated` types, but can have deprecated members
      if (isEnumType(typeInfo)) {
        const enumNode = bindings.getEnumRelatedNode(typeInfo)!;
        const members: EnumMember[] = [];
        typeInfo.members.forEach((mem) => {
          if (
            mem.docs?.stability === Stability.Deprecated &&
            this.shouldFqnBeStripped(`${fqn}#${mem.name}`)
          ) {
            const matchingMemberNode = enumNode.members.find(
              (enumMem) => enumMem.name.getText() === mem.name,
            );
            if (matchingMemberNode) {
              this.nodesToRemove.add(matchingMemberNode);
            }
          } else {
            members.push(mem);
          }
        });
        typeInfo.members = members;
        continue;
      }

      // For classes, we erase `@deprecated` base classes, replacing as needed
      const additionalInterfaces = new Set<string>();
      if (
        isClassType(typeInfo) &&
        typeInfo.base != null &&
        strippedFqns.has(typeInfo.base)
      ) {
        while (typeInfo.base != null && strippedFqns.has(typeInfo.base)) {
          const oldBase = assembly.types[typeInfo.base] as ClassType;
          oldBase.interfaces?.forEach((fqn) => additionalInterfaces.add(fqn));
          typeInfo.base = replaceWithClass.get(typeInfo.base);
        }
        this.transformations.push(
          typeInfo.base != null
            ? Transformation.replaceBaseClass(
                this.typeChecker,
                bindings.getClassRelatedNode(typeInfo)!,
                typeInfo.base in assembly.types
                  ? (bindings.getClassRelatedNode(
                      assembly.types[typeInfo.base] as ClassType,
                    ) ?? typeInfo.base)
                  : typeInfo.base,
              )
            : Transformation.removeBaseClass(
                this.typeChecker,
                bindings.getClassRelatedNode(typeInfo)!,
              ),
        );
      }

      // Be defensive in case we add other kinds in the future
      if (!isClassOrInterfaceType(typeInfo)) {
        throw new Error(
          `Unhandled type encountered! ${JSON.stringify(typeInfo, null, 2)}`,
        );
      }

      // Strip all `@deprecated` interfaces from the inheritance tree, replacing as needed
      if (
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        typeInfo.interfaces?.some((fqn) => strippedFqns.has(fqn)) ||
        additionalInterfaces.size > 0
      ) {
        const originalSet = new Set(typeInfo.interfaces ?? []);
        const newSet = new Set<string>();

        const candidates = Array.from(
          new Set([...originalSet, ...additionalInterfaces]),
        );
        while (candidates.length > 0) {
          const fqn = candidates.pop()!;
          if (!strippedFqns.has(fqn)) {
            newSet.add(fqn);
            if (!originalSet.has(fqn)) {
              this.transformations.push(
                Transformation.addInterface(
                  this.typeChecker,
                  bindings.getClassOrInterfaceRelatedNode(typeInfo)!,
                  fqn in assembly.types
                    ? (bindings.getInterfaceRelatedNode(
                        assembly.types[fqn] as InterfaceType,
                      ) ?? fqn)
                    : fqn,
                ),
              );
            }
            continue;
          }
          if (originalSet.has(fqn)) {
            this.transformations.push(
              Transformation.removeInterface(
                this.typeChecker,
                bindings.getClassOrInterfaceRelatedNode(typeInfo)!,
                bindings.getInterfaceRelatedNode(
                  assembly.types[fqn] as InterfaceType,
                )!,
              ),
            );
          }
          const replacement = replaceWithInterfaces.get(fqn);
          if (replacement != null) {
            candidates.push(...replacement);
          }
        }

        typeInfo.interfaces =
          newSet.size > 0 ? Array.from(newSet).sort() : undefined;
      }

      // Drop all `@deprecated` members, and remove "overrides" from stripped types
      const methods: Method[] = [];
      const properties: Property[] = [];
      typeInfo.methods?.forEach((meth) => {
        if (
          meth.docs?.stability === Stability.Deprecated &&
          this.shouldFqnBeStripped(`${fqn}#${meth.name}`)
        ) {
          this.nodesToRemove.add(bindings.getMethodRelatedNode(meth)!);
        } else {
          methods.push(
            meth.overrides != null && strippedFqns.has(meth.overrides)
              ? { ...meth, overrides: undefined }
              : meth,
          );
        }
      });
      typeInfo.methods = typeInfo.methods ? methods : undefined;
      typeInfo.properties?.forEach((prop) => {
        if (
          prop.docs?.stability === Stability.Deprecated &&
          this.shouldFqnBeStripped(`${fqn}#${prop.name}`)
        ) {
          this.nodesToRemove.add(bindings.getParameterRelatedNode(prop)!);
        } else {
          properties.push(
            prop.overrides != null && strippedFqns.has(prop.overrides)
              ? { ...prop, overrides: undefined }
              : prop,
          );
        }
      });
      typeInfo.properties = typeInfo.properties ? properties : undefined;
    }

    const diagnostics = this.findLeftoverUseOfDeprecatedAPIs(
      assembly,
      strippedFqns,
    );

    // Remove all `@deprecated` types, after we did everything, so we could
    // still access the related nodes from the assembly object.
    for (const fqn of strippedFqns) {
      if (this.shouldFqnBeStripped(fqn)) {
        delete assembly.types[fqn];
      }
    }

    return diagnostics;
  }

  private findLeftoverUseOfDeprecatedAPIs(
    assembly: Assembly,
    strippedFqns: Set<string>,
  ): readonly JsiiDiagnostic[] {
    if (assembly.types == null) {
      return [];
    }

    const result = new Array<JsiiDiagnostic>();

    for (const type of Object.values(assembly.types)) {
      if (isEnumType(type) || strippedFqns.has(type.fqn)) {
        continue;
      }
      if (isClassType(type) && type.initializer) {
        result.push(
          ...this.verifyCallable(assembly, strippedFqns, type.initializer),
        );
      }
      type.methods?.forEach((method) =>
        result.push(...this.verifyCallable(assembly, strippedFqns, method)),
      );
      type.properties?.forEach((property) =>
        result.push(...this.verifyProperty(assembly, strippedFqns, property)),
      );
    }

    return result;
  }

  private verifyCallable(
    assembly: Assembly,
    strippedFqns: ReadonlySet<string>,
    method: Method | Initializer,
  ): readonly JsiiDiagnostic[] {
    const diagnostics = new Array<JsiiDiagnostic>();
    const deprecatedReturnFqn =
      isMethod(method) &&
      method.returns &&
      this.tryFindReference(method.returns.type, strippedFqns);
    if (deprecatedReturnFqn) {
      diagnostics.push(
        this.makeDiagnostic(deprecatedReturnFqn, 'Method', method, assembly),
      );
    }

    if (method.parameters) {
      for (const parameter of method.parameters) {
        const deprecatedTypeFqn = this.tryFindReference(
          parameter.type,
          strippedFqns,
        );
        if (deprecatedTypeFqn) {
          diagnostics.push(
            this.makeDiagnostic(
              deprecatedTypeFqn,
              'Parameter',
              parameter,
              assembly,
            ),
          );
        }
      }
    }
    return diagnostics;
  }

  private verifyProperty(
    assembly: Assembly,
    strippedFqns: ReadonlySet<string>,
    property: Property,
  ): readonly JsiiDiagnostic[] {
    const deprecatedTypeFqn = this.tryFindReference(
      property.type,
      strippedFqns,
    );
    if (deprecatedTypeFqn) {
      return [
        this.makeDiagnostic(deprecatedTypeFqn, 'Property', property, assembly),
      ];
    }
    return [];
  }

  /**
   * Determines whether a `TypeReference` contains an FQN within a given set.
   *
   * @param ref  the tested `TypeReference`.
   * @param fqns the set of FQNs that are being searched for.
   *
   * @returns the first FQN that was identified.
   */
  private tryFindReference(
    ref: TypeReference,
    fqns: ReadonlySet<string>,
  ): string | undefined {
    if (isNamedTypeReference(ref)) {
      return fqns.has(ref.fqn) ? ref.fqn : undefined;
    }
    if (isPrimitiveTypeReference(ref)) {
      return undefined;
    }
    if (isCollectionTypeReference(ref)) {
      return this.tryFindReference(ref.collection.elementtype, fqns);
    }
    return ref.union.types
      .map((type) => this.tryFindReference(type, fqns))
      .find((ref) => ref != null);
  }

  private shouldFqnBeStripped(fqn: string) {
    return this.allowlistedDeprecations?.has(fqn) ?? true;
  }

  private makeDiagnostic(
    fqn: string,
    messagePrefix: 'Method',
    context: Method | Initializer,
    assembly: Assembly,
  ): JsiiDiagnostic;
  private makeDiagnostic(
    fqn: string,
    messagePrefix: 'Parameter',
    context: Parameter,
    assembly: Assembly,
  ): JsiiDiagnostic;
  private makeDiagnostic(
    fqn: string,
    messagePrefix: 'Property',
    context: Property,
    assembly: Assembly,
  ): JsiiDiagnostic;
  private makeDiagnostic(
    fqn: string,
    messagePrefix: 'Method' | 'Property' | 'Parameter',
    context: Method | Initializer | Parameter | Property,
    assembly: Assembly,
  ): JsiiDiagnostic {
    const node = bindings.getRelatedNode<
      | ts.AccessorDeclaration
      | ts.MethodDeclaration
      | ts.MethodSignature
      | ts.ParameterDeclaration
      | ts.PropertyDeclaration
      | ts.PropertySignature
    >(context);
    const diagnostic = JsiiDiagnostic.JSII_3999_INCOHERENT_TYPE_MODEL.create(
      node?.type ?? node!,
      `${messagePrefix} has @deprecated type ${fqn}, and it is erased by --strip-deprecated.`,
    );

    const typeInfo = assembly.types?.[fqn];
    const typeNode = typeInfo && bindings.getTypeRelatedNode(typeInfo);
    if (typeNode == null) {
      return diagnostic;
    }
    return diagnostic.addRelatedInformation(
      ts.getNameOfDeclaration(typeNode) ?? typeNode,
      `The @deprecated type is declared here`,
    );
  }
}

class Transformation {
  public static addInterface(
    typeChecker: ts.TypeChecker,
    node: ts.ClassDeclaration | ts.InterfaceDeclaration,
    iface: ts.InterfaceDeclaration | string,
  ) {
    return new Transformation(typeChecker, node, (declaration) => {
      if (
        !ts.isClassDeclaration(declaration) &&
        !ts.isInterfaceDeclaration(declaration)
      ) {
        throw new Error(
          `Expected a ClassDeclaration or InterfaceDeclaration, found a ${
            ts.SyntaxKind[declaration.kind]
          }`,
        );
      }

      const { typeExpression: newInterface, syntheticImport } =
        Transformation.typeReference(iface, declaration, typeChecker);
      if (ts.isClassDeclaration(declaration)) {
        return {
          node: ts.updateClassDeclaration(
            declaration,
            declaration.decorators,
            declaration.modifiers,
            declaration.name,
            declaration.typeParameters,
            addInterfaceTo(
              ts.SyntaxKind.ImplementsKeyword,
              declaration.heritageClauses,
            ),
            declaration.members,
          ),
          syntheticImport,
        };
      }
      return {
        node: ts.updateInterfaceDeclaration(
          declaration,
          declaration.decorators,
          declaration.modifiers,
          declaration.name,
          declaration.typeParameters,
          addInterfaceTo(
            ts.SyntaxKind.ExtendsKeyword,
            declaration.heritageClauses,
          ),
          declaration.members,
        ),
        syntheticImport,
      };

      function addInterfaceTo(
        token: ts.HeritageClause['token'],
        clauses: readonly ts.HeritageClause[] = [],
      ): ts.HeritageClause[] {
        const existingClause = clauses.find((clause) => clause.token === token);
        if (existingClause == null) {
          return [...clauses, ts.createHeritageClause(token, [newInterface])];
        }
        return [
          ...clauses.filter((clause) => clause !== existingClause),
          ts.updateHeritageClause(existingClause, [
            ...existingClause.types,
            newInterface,
          ]),
        ];
      }
    });
  }

  public static replaceBaseClass(
    typeChecker: ts.TypeChecker,
    node: ts.ClassDeclaration,
    baseClass: ts.ClassDeclaration | string,
  ) {
    return new Transformation(typeChecker, node, (declaration) => {
      if (!ts.isClassDeclaration(declaration)) {
        throw new Error(
          `Expected a ClassDeclaration, found a ${
            ts.SyntaxKind[declaration.kind]
          }`,
        );
      }
      const { typeExpression: newBaseClass, syntheticImport } =
        Transformation.typeReference(baseClass, declaration, typeChecker);
      const existingClause = declaration.heritageClauses?.find(
        (clause) => clause.token === ts.SyntaxKind.ExtendsKeyword,
      );
      return {
        node: ts.updateClassDeclaration(
          declaration,
          declaration.decorators,
          declaration.modifiers,
          declaration.name,
          declaration.typeParameters,
          [
            ...(declaration.heritageClauses ?? []).filter(
              (clause) => clause !== existingClause,
            ),
            existingClause
              ? ts.updateHeritageClause(existingClause, [newBaseClass])
              : ts.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
                  newBaseClass,
                ]),
          ],
          declaration.members,
        ),
        syntheticImports: syntheticImport && [syntheticImport],
      };
    });
  }

  public static removeBaseClass(
    typeChecker: ts.TypeChecker,
    node: ts.ClassDeclaration,
  ) {
    return new Transformation(typeChecker, node, (declaration) => {
      if (!ts.isClassDeclaration(declaration)) {
        throw new Error(
          `Expected a ClassDeclaration, found a ${
            ts.SyntaxKind[declaration.kind]
          }`,
        );
      }
      return {
        node: ts.updateClassDeclaration(
          declaration,
          declaration.decorators,
          declaration.modifiers,
          declaration.name,
          declaration.typeParameters,
          declaration.heritageClauses?.filter(
            (clause) => clause.token !== ts.SyntaxKind.ExtendsKeyword,
          ),
          declaration.members,
        ),
      };
    });
  }

  public static removeInterface(
    typeChecker: ts.TypeChecker,
    node: ts.ClassDeclaration | ts.InterfaceDeclaration,
    iface: ts.InterfaceDeclaration,
  ) {
    const ifaceName = Transformation.fullyQualifiedName(typeChecker, iface)!;

    return new Transformation(typeChecker, node, (declaration) => {
      if (ts.isClassDeclaration(declaration)) {
        return {
          node: ts.updateClassDeclaration(
            declaration,
            declaration.decorators,
            declaration.modifiers,
            declaration.name,
            declaration.typeParameters,
            removeInterfaceHeritage(declaration.heritageClauses),
            declaration.members,
          ),
        };
      } else if (ts.isInterfaceDeclaration(declaration)) {
        return {
          node: ts.updateInterfaceDeclaration(
            declaration,
            declaration.decorators,
            declaration.modifiers,
            declaration.name,
            declaration.typeParameters,
            removeInterfaceHeritage(declaration.heritageClauses),
            declaration.members,
          ),
        };
      }
      throw new Error(
        `Expected a ClassDeclaration or InterfaceDeclaration, found a ${
          ts.SyntaxKind[declaration.kind]
        }`,
      );
    });

    function removeInterfaceHeritage(
      clauses: readonly ts.HeritageClause[] | undefined,
    ): ts.HeritageClause[] | undefined {
      if (clauses == null) {
        return clauses;
      }
      return clauses
        .map((clause) => {
          const types = clause.types.filter(
            (type) =>
              Transformation.fullyQualifiedName(
                typeChecker,
                type.expression,
              ) !== ifaceName,
          );
          if (types.length === clause.types.length) {
            // Means the interface was only transitively present...
            return clause;
          }
          if (types.length === 0) {
            return undefined;
          }
          return ts.updateHeritageClause(clause, types);
        })
        .filter((clause) => clause != null) as ts.HeritageClause[];
    }
  }

  private static fullyQualifiedName(
    typeChecker: ts.TypeChecker,
    node: ts.Node,
  ): string | undefined {
    const symbol = typeChecker.getSymbolAtLocation(
      ts.getNameOfDeclaration(node as ts.Declaration) ?? node,
    );
    // This symbol ☝️ does not contain enough information in some cases - when
    // an imported type is part of a heritage clause - to produce the fqn.
    // Round tripping this to its type and back to a symbol seems to fix this.
    const type = symbol && typeChecker.getDeclaredTypeOfSymbol(symbol);
    return type?.symbol && typeChecker.getFullyQualifiedName(type.symbol);
  }

  private static typeReference(
    type: ts.ClassDeclaration | ts.InterfaceDeclaration | string,
    context: ts.ClassDeclaration | ts.InterfaceDeclaration,
    typeChecker: ts.TypeChecker,
  ): {
    typeExpression: ts.ExpressionWithTypeArguments;
    syntheticImport?: ts.ImportDeclaration;
  } {
    context = ts.getOriginalNode(context) as any;

    const [, contextSource] = /^"([^"]+)"\..*$/.exec(
      typeChecker.getFullyQualifiedName(
        typeChecker.getSymbolAtLocation(ts.getNameOfDeclaration(context)!)!,
      ),
    )!;

    let expression: ts.Expression;
    let syntheticImport: ts.ImportDeclaration | undefined;

    if (typeof type === 'string') {
      const [root, ...tail] = type.split('.');
      const syntheticImportName = ts.createUniqueName(root);
      syntheticImport = ts.createImportDeclaration(
        undefined /* decorators */,
        undefined /* modifiers */,
        ts.createImportClause(
          undefined,
          ts.createNamespaceImport(syntheticImportName),
        ),
        ts.createStringLiteral(root),
      );
      expression = tail.reduce(
        (curr, elt) => ts.createPropertyAccess(curr, elt),
        syntheticImportName as ts.Expression,
      );
    } else {
      const [, typeSource, qualifiedName] = /^"([^"]+)"\.(.*)$/.exec(
        typeChecker.getFullyQualifiedName(
          typeChecker.getSymbolAtLocation(ts.getNameOfDeclaration(type)!)!,
        ),
      )!;

      if (typeSource === contextSource) {
        const [root, ...tail] = qualifiedName.split('.');
        expression = tail.reduce(
          (curr, elt) => ts.createPropertyAccess(curr, elt),
          ts.createIdentifier(root) as ts.Expression,
        );
      } else {
        const syntheticImportName = ts.createUniqueName(basename(typeSource));
        syntheticImport = ts.createImportDeclaration(
          undefined /* decorators */,
          undefined /* modifiers */,
          ts.createImportClause(
            undefined,
            ts.createNamespaceImport(syntheticImportName),
          ),
          ts.createStringLiteral(
            `./${relative(dirname(contextSource), typeSource)}`,
          ),
        );
        expression = qualifiedName
          .split('.')
          .reduce(
            (curr, elt) => ts.createPropertyAccess(curr, elt),
            syntheticImportName as ts.Expression,
          );
      }
    }

    return {
      typeExpression: ts.createExpressionWithTypeArguments(
        undefined,
        expression,
      ),
      syntheticImport,
    };
  }

  private readonly nodeName: string;

  private constructor(
    private readonly typeChecker: ts.TypeChecker,
    node: ts.Declaration,
    public readonly apply: (
      this: Transformation,
      node: ts.Node,
    ) => { node: ts.Node; syntheticImport?: ts.ImportDeclaration },
  ) {
    this.nodeName = Transformation.fullyQualifiedName(typeChecker, node)!;
  }

  public targets(node: ts.Declaration) {
    return (
      this.nodeName ===
      Transformation.fullyQualifiedName(this.typeChecker, node)
    );
  }
}

class DeprecationRemovalTransformer {
  /**
   * A list of SyntaxKinds for which it is not necessary to evaluate children,
   * since they are never of interest to this transform. This opens up a wee
   * optimization, which is particularly useful when trying to troubleshoot the
   * transform in a debugger (saves a TON of time stepping into useless nodes
   * then).
   */
  private static readonly IGNORE_CHILDREN: ReadonlySet<ts.SyntaxKind> = new Set(
    [
      ts.SyntaxKind.Constructor,
      ts.SyntaxKind.FunctionDeclaration,
      ts.SyntaxKind.GetAccessor,
      ts.SyntaxKind.MethodDeclaration,
      ts.SyntaxKind.MethodSignature,
      ts.SyntaxKind.PropertySignature,
      ts.SyntaxKind.PropertyDeclaration,
      ts.SyntaxKind.SetAccessor,
      ts.SyntaxKind.VariableDeclaration,
    ],
  );

  private syntheticImports = new Array<ts.ImportDeclaration>();

  public constructor(
    private readonly typeChecker: ts.TypeChecker,
    private readonly context: ts.TransformationContext,
    private readonly transformations: readonly Transformation[],
    private readonly nodesToRemove: Set<ts.Node>,
  ) {}

  public transform<T extends ts.Node>(node: T): T {
    let result = this.visitEachChild(node);

    // If there are any synthetic imports, add them to the source file
    if (ts.isSourceFile(result) && this.syntheticImports.length > 0) {
      result = ts.updateSourceFileNode(
        result,
        [...this.syntheticImports, ...result.statements],
        result.isDeclarationFile,
        result.referencedFiles,
        result.typeReferenceDirectives,
        result.hasNoDefaultLib,
        result.libReferenceDirectives,
      ) as any;
      this.syntheticImports = new Array<ts.ImportDeclaration>();
    }

    return result;
  }

  private visitEachChild<T extends ts.Node>(node: T): T {
    return ts.visitEachChild(node, this.visitor.bind(this), this.context);
  }

  private visitor<T extends ts.Node>(node: T): ts.VisitResult<T> {
    if (this.isDeprecated(node)) {
      // Removing deprecated members by substituting "nothing" to them
      return undefined;
    }

    if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      for (const transformation of this.transformations) {
        // 👇 as any because the assignment below confuses type checker
        if (transformation.targets(node as any)) {
          const { node: transformedNode, syntheticImport } =
            transformation.apply(node);
          node = transformedNode as any;
          if (syntheticImport) {
            this.syntheticImports.push(syntheticImport);
          }
        }
      }
    }

    // Remove named imports of `@deprecated` members from the source...
    if (
      ts.isImportDeclaration(node) &&
      node.importClause &&
      node.importClause.namedBindings &&
      ts.isNamedImports(node.importClause.namedBindings)
    ) {
      const filteredElements = node.importClause.namedBindings.elements.filter(
        (element) => {
          // This symbol is local (it's declaration points back to the named import)
          const symbol = this.typeChecker.getSymbolAtLocation(element.name);
          const exportedSymbol =
            // This "resolves" the imported type, so we can get to it's declaration(s)
            symbol && this.typeChecker.getDeclaredTypeOfSymbol(symbol)?.symbol;
          return !exportedSymbol?.declarations.some((decl) =>
            this.isDeprecated(decl),
          );
        },
      );
      if (
        filteredElements.length !==
        node.importClause.namedBindings.elements.length
      ) {
        return ts.updateImportDeclaration(
          node,
          node.decorators,
          node.modifiers,
          node.importClause.name != null || filteredElements.length > 0
            ? ts.updateImportClause(
                node.importClause,
                node.importClause.name,
                ts.updateNamedImports(
                  node.importClause.namedBindings,
                  filteredElements,
                ),
                node.importClause.isTypeOnly,
              )
            : undefined,
          node.moduleSpecifier,
        ) as any;
      }

      return node;
    }

    // Replace "export ... from ..." places that no longer export anything
    // with an "import from ...", so side effects are preserved.
    if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      const symbol = this.typeChecker.getSymbolAtLocation(node.moduleSpecifier);
      const moduleExports =
        symbol &&
        this.typeChecker
          .getExportsOfModule(symbol)
          ?.filter(
            (sym) => !sym.declarations.some((decl) => this.isDeprecated(decl)),
          );
      if (
        (node.exportClause == null ||
          ts.isNamespaceExport(node.exportClause)) &&
        moduleExports?.length === 0
      ) {
        return ts.createImportDeclaration(
          undefined /* decorators */,
          undefined /* modifiers */,
          undefined /* importClause */,
          node.moduleSpecifier,
        ) as any;
      }

      if (node.exportClause != null && moduleExports) {
        const bindings = node.exportClause as ts.NamedExports;
        const exportedNames = new Set(moduleExports.map((sym) => sym.name));
        const filteredElements = bindings.elements?.filter((elt) =>
          exportedNames.has(elt.name.text),
        );
        if (filteredElements?.length !== bindings.elements?.length) {
          return ts.updateExportDeclaration(
            node,
            node.decorators,
            node.modifiers,
            ts.updateNamedExports(bindings, filteredElements),
            node.moduleSpecifier,
            node.isTypeOnly,
          ) as any;
        }
      }
    }

    return DeprecationRemovalTransformer.IGNORE_CHILDREN.has(node.kind)
      ? node
      : this.visitEachChild(node);
  }

  private isDeprecated(node: ts.Node): boolean {
    const original = ts.getOriginalNode(node);
    return (
      this.nodesToRemove.has(original) &&
      ts.getJSDocTags(original).some((tag) => tag.tagName.text === 'deprecated')
    );
  }
}

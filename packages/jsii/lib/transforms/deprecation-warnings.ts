import * as spec from '@jsii/spec';
import { Assembly } from '@jsii/spec';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

import { ProjectInfo } from '../project-info';
import { symbolIdentifier } from '../symbol-id';

export const WARNINGSCODE_FILE_NAME = '.warnings.jsii.js';
const WARNING_FUNCTION_NAME = 'print';
const PARAMETER_NAME = 'p';
const FOR_LOOP_ITEM_NAME = 'o';
const NAMESPACE = 'jsiiDeprecationWarnings';
const LOCAL_ENUM_NAMESPACE = 'ns';
const VISITED_OBJECTS_SET_NAME = 'visitedObjects';
const DEPRECATION_ERROR = 'DeprecationError';
const GET_PROPERTY_DESCRIPTOR = 'getPropertyDescriptor';

export class DeprecationWarningsInjector {
  private transformers: ts.CustomTransformers = {
    before: [],
  };

  public constructor(private readonly typeChecker: ts.TypeChecker) {}

  public process(assembly: Assembly, projectInfo: ProjectInfo) {
    const projectRoot = projectInfo.projectRoot;
    const functionDeclarations: ts.FunctionDeclaration[] = [];

    const types = assembly.types ?? {};
    for (const type of Object.values(types)) {
      const statements: ts.Statement[] = [];
      let isEmpty = true;

      // This will add the parameter to the set of visited objects, to prevent infinite recursion
      statements.push(
        ts.createExpressionStatement(
          ts.createCall(
            ts.createPropertyAccess(
              ts.createIdentifier(VISITED_OBJECTS_SET_NAME),
              'add',
            ),
            undefined,
            [ts.createIdentifier(PARAMETER_NAME)],
          ),
        ),
      );

      const tryStatements = [];
      if (spec.isDeprecated(type) && spec.isEnumType(type)) {
        // The type is deprecated
        tryStatements.push(
          createWarningFunctionCall(type.fqn, type.docs?.deprecated),
        );
        isEmpty = false;
      }

      if (spec.isEnumType(type) && type.locationInModule?.filename) {
        tryStatements.push(
          createEnumRequireStatement(type.locationInModule?.filename),
        );
        tryStatements.push(createDuplicateEnumValuesCheck(type));

        for (const member of Object.values(type.members ?? [])) {
          if (spec.isDeprecated(member)) {
            // The enum member is deprecated
            const condition = ts.createBinary(
              ts.createIdentifier(PARAMETER_NAME),
              ts.SyntaxKind.EqualsEqualsEqualsToken,
              ts.createPropertyAccess(
                ts.createPropertyAccess(
                  ts.createIdentifier(LOCAL_ENUM_NAMESPACE),
                  type.name,
                ),
                member.name,
              ),
            );
            tryStatements.push(
              createWarningFunctionCall(
                `${type.fqn}#${member.name}`,
                member.docs?.deprecated,
                condition,
              ),
            );
            isEmpty = false;
          }
        }
      } else if (spec.isInterfaceType(type) && type.datatype) {
        const { statementsByProp, excludedProps } = processInterfaceType(
          type,
          types,
          assembly,
          projectInfo,
          undefined,
          undefined,
        );

        for (const [name, statement] of statementsByProp.entries()) {
          if (!excludedProps.has(name)) {
            tryStatements.push(statement);
            isEmpty = false;
          }
        }
      }

      statements.push(
        ts.createTry(
          ts.createBlock(tryStatements),
          undefined,
          ts.createBlock([
            ts.createExpressionStatement(
              ts.createCall(
                ts.createPropertyAccess(
                  ts.createIdentifier(VISITED_OBJECTS_SET_NAME),
                  'delete',
                ),
                undefined,
                [ts.createIdentifier(PARAMETER_NAME)],
              ),
            ),
          ]),
        ),
      );

      const paramValue = ts.createParameter(
        undefined,
        undefined,
        undefined,
        PARAMETER_NAME,
      );
      const functionName = fnName(type.fqn);
      const functionDeclaration = ts.createFunctionDeclaration(
        undefined,
        undefined,
        undefined,
        functionName,
        undefined,
        [paramValue],
        undefined,
        createFunctionBlock(isEmpty ? [] : statements),
      );
      functionDeclarations.push(functionDeclaration);
    }
    this.transformers = {
      before: [
        (context) => {
          const transformer = new Transformer(
            this.typeChecker,
            context,
            projectRoot,
            this.buildTypeIndex(assembly),
            assembly,
          );
          return transformer.transform.bind(transformer);
        },
      ],
    };
    generateWarningsFile(projectRoot, functionDeclarations);
  }

  public get customTransformers(): ts.CustomTransformers {
    return this.transformers;
  }

  private buildTypeIndex(assembly: Assembly): Map<string, spec.Type> {
    const result = new Map<string, spec.Type>();

    for (const type of Object.values(assembly.types ?? {})) {
      const symbolId = type.symbolId;
      if (symbolId) {
        result.set(symbolId, type);
      }
    }

    return result;
  }
}

function processInterfaceType(
  type: spec.InterfaceType,
  types: { [p: string]: spec.Type },
  assembly: Assembly,
  projectInfo: ProjectInfo,
  statementsByProp: Map<string, ts.Statement> = new Map<string, ts.Statement>(),
  excludedProps: Set<string> = new Set<string>(),
) {
  for (const prop of Object.values(type.properties ?? {})) {
    const fqn = `${type.fqn}#${prop.name}`;
    if (spec.isDeprecated(prop) || spec.isDeprecated(type)) {
      // If the property individually is deprecated, or the entire type is deprecated
      const deprecatedDocs = prop.docs?.deprecated ?? type.docs?.deprecated;
      const statement = createWarningFunctionCall(
        fqn,
        deprecatedDocs,
        ts.createBinary(
          ts.createStringLiteral(prop.name),
          ts.SyntaxKind.InKeyword,
          ts.createIdentifier(PARAMETER_NAME),
        ),
        undefined,
      );
      statementsByProp.set(prop.name, statement);
    } else {
      /* If a prop is not deprecated, we don't want to generate a warning for it,
         even if another property with the same name is deprecated in another
         super-interface. */
      excludedProps.add(prop.name);
    }

    if (
      spec.isNamedTypeReference(prop.type) &&
      Object.keys(types).includes(prop.type.fqn)
    ) {
      const functionName = importedFunctionName(
        prop.type.fqn,
        assembly,
        projectInfo,
      );
      if (functionName) {
        const statement = createTypeHandlerCall(
          functionName,
          `${PARAMETER_NAME}.${prop.name}`,
        );
        statementsByProp.set(`${prop.name}_`, statement);
      }
    } else if (
      spec.isCollectionTypeReference(prop.type) &&
      spec.isNamedTypeReference(prop.type.collection.elementtype)
    ) {
      const functionName = importedFunctionName(
        prop.type.collection.elementtype.fqn,
        assembly,
        projectInfo,
      );
      if (functionName) {
        const statement = createTypeHandlerCall(
          functionName,
          `${PARAMETER_NAME}.${prop.name}`,
          prop.type.collection.kind,
        );
        statementsByProp.set(`${prop.name}_`, statement);
      }
    } else if (
      spec.isUnionTypeReference(prop.type) &&
      spec.isNamedTypeReference(prop.type.union.types[0]) &&
      Object.keys(types).includes(prop.type.union.types[0].fqn)
    ) {
      const functionName = importedFunctionName(
        prop.type.union.types[0].fqn,
        assembly,
        projectInfo,
      );
      if (functionName) {
        const statement = createTypeHandlerCall(
          functionName,
          `${PARAMETER_NAME}.${prop.name}`,
        );
        statementsByProp.set(`${prop.name}_`, statement);
      }
    }
  }

  // We also generate calls to all the supertypes
  for (const interfaceName of type.interfaces ?? []) {
    const assemblies = projectInfo.dependencyClosure.concat(assembly);
    const superType = findType(interfaceName, assemblies);
    if (superType.type) {
      processInterfaceType(
        superType.type as spec.InterfaceType,
        types,
        assembly,
        projectInfo,
        statementsByProp,
        excludedProps,
      );
    }
  }
  return { statementsByProp, excludedProps };
}

function fnName(fqn: string): string {
  return fqn.replace(/[^\w\d]/g, '_');
}

function createFunctionBlock(statements: ts.Statement[]): ts.Block {
  if (statements.length > 0) {
    const validation = ts.createIf(
      ts.createBinary(
        ts.createIdentifier(PARAMETER_NAME),
        ts.SyntaxKind.EqualsEqualsToken,
        ts.createNull(),
      ),
      ts.createReturn(),
    );
    return ts.createBlock([validation, ...statements], true);
  }
  return ts.createBlock([], true);
}

function createWarningFunctionCall(
  fqn: string,
  message = '',
  condition?: ts.Expression,
  includeNamespace = false,
): ts.Statement {
  const functionName = includeNamespace
    ? `${NAMESPACE}.${WARNING_FUNCTION_NAME}`
    : WARNING_FUNCTION_NAME;

  const mainStatement = ts.createExpressionStatement(
    ts.createCall(ts.createIdentifier(functionName), undefined, [
      ts.createLiteral(fqn),
      ts.createLiteral(message),
    ]),
  );

  return condition ? ts.createIf(condition, mainStatement) : mainStatement;
}

function generateWarningsFile(
  projectRoot: string,
  functionDeclarations: ts.FunctionDeclaration[],
) {
  const names = [...functionDeclarations]
    .map((d) => d.name?.text)
    .filter(Boolean);
  const exportedSymbols = [
    WARNING_FUNCTION_NAME,
    GET_PROPERTY_DESCRIPTOR,
    DEPRECATION_ERROR,
    ...names,
  ].join(',');

  const functionText = `function ${WARNING_FUNCTION_NAME}(name, deprecationMessage) {
  const deprecated = process.env.JSII_DEPRECATED;
  const deprecationMode = ['warn', 'fail', 'quiet'].includes(deprecated) ? deprecated : 'warn';
  const message = \`\${name} is deprecated.\\n  \${deprecationMessage.trim()}\\n  This API will be removed in the next major release.\`;
  switch (deprecationMode) {
    case "fail":
      throw new ${DEPRECATION_ERROR}(message);
    case "warn":
      console.warn("[WARNING]", message);
      break;
  }
}

function ${GET_PROPERTY_DESCRIPTOR}(obj, prop) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
  if (descriptor) {
    return descriptor;
  }
  const proto = Object.getPrototypeOf(obj);
  const prototypeDescriptor = proto && getPropertyDescriptor(proto, prop);
  if (prototypeDescriptor) {
    return prototypeDescriptor;
  }
  return {};
}

const ${VISITED_OBJECTS_SET_NAME} = new Set();

class ${DEPRECATION_ERROR} extends Error {
  constructor(...args) {
    super(...args);
    Object.defineProperty(this, 'name', {
      configurable: false,
      enumerable: true,
      value: '${DEPRECATION_ERROR}',
      writable: false,
    });
  }
}

module.exports = {${exportedSymbols}}
`;

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const resultFile = ts.createSourceFile(
    path.join(projectRoot, WARNINGSCODE_FILE_NAME),
    functionText,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.JS,
  );

  const declarations = functionDeclarations.map((declaration) =>
    printer.printNode(ts.EmitHint.Unspecified, declaration, resultFile),
  );

  const content = declarations.concat(printer.printFile(resultFile)).join('\n');

  fs.writeFileSync(path.join(projectRoot, WARNINGSCODE_FILE_NAME), content);
}

class Transformer {
  private warningCallsWereInjected = false;

  public constructor(
    private readonly typeChecker: ts.TypeChecker,
    private readonly context: ts.TransformationContext,
    private readonly projectRoot: string,
    private readonly typeIndex: Map<string, spec.Type>,
    private readonly assembly: Assembly,
  ) {}

  public transform<T extends ts.Node>(node: T): T {
    this.warningCallsWereInjected = false;

    const result = this.visitEachChild(node);

    if (ts.isSourceFile(result) && this.warningCallsWereInjected) {
      const importDir = path.relative(
        path.dirname(result.fileName),
        this.projectRoot,
      );
      const importPath = importDir.startsWith('..')
        ? unixPath(path.join(importDir, WARNINGSCODE_FILE_NAME))
        : `./${WARNINGSCODE_FILE_NAME}`;

      return ts.updateSourceFileNode(result, [
        createRequireStatement(NAMESPACE, importPath),
        ...result.statements,
      ]) as any;
    }
    return result;
  }

  private visitEachChild<T extends ts.Node>(node: T): T {
    return ts.visitEachChild(node, this.visitor.bind(this), this.context);
  }

  private visitor<T extends ts.Node>(node: T): ts.VisitResult<T> {
    if (ts.isMethodDeclaration(node) && node.body != null) {
      const statements = this.getStatementsForDeclaration(node);
      this.warningCallsWereInjected =
        this.warningCallsWereInjected || statements.length > 0;
      return ts.updateMethod(
        node,
        node.decorators,
        node.modifiers,
        node.asteriskToken,
        node.name,
        node.questionToken,
        node.typeParameters,
        node.parameters,
        node.type,
        ts.updateBlock(node.body, [
          ...wrapWithRethrow(
            statements,
            ts.createPropertyAccess(
              ts.createThis(),
              node.name.getText(node.getSourceFile()),
            ),
          ),
          ...node.body.statements,
        ]),
      ) as any;
    } else if (ts.isGetAccessorDeclaration(node) && node.body != null) {
      const statements = this.getStatementsForDeclaration(node);
      this.warningCallsWereInjected =
        this.warningCallsWereInjected || statements.length > 0;
      return ts.updateGetAccessor(
        node,
        node.decorators,
        node.modifiers,
        node.name,
        node.parameters,
        node.type,
        ts.updateBlock(node.body, [
          ...wrapWithRethrow(
            statements,
            ts.createPropertyAccess(
              ts.createCall(
                ts.createPropertyAccess(
                  ts.createIdentifier(NAMESPACE),
                  GET_PROPERTY_DESCRIPTOR,
                ),
                undefined,
                [
                  ts.createThis(),
                  ts.createLiteral(node.name.getText(node.getSourceFile())),
                ],
              ),
              'get',
            ),
          ),
          ...node.body.statements,
        ]),
      ) as any;
    } else if (ts.isSetAccessorDeclaration(node) && node.body != null) {
      const statements = this.getStatementsForDeclaration(node);
      this.warningCallsWereInjected =
        this.warningCallsWereInjected || statements.length > 0;
      return ts.updateSetAccessor(
        node,
        node.decorators,
        node.modifiers,
        node.name,
        node.parameters,
        ts.updateBlock(node.body, [
          ...wrapWithRethrow(
            statements,
            ts.createPropertyAccess(
              ts.createCall(
                ts.createPropertyAccess(
                  ts.createIdentifier(NAMESPACE),
                  GET_PROPERTY_DESCRIPTOR,
                ),
                undefined,
                [
                  ts.createThis(),
                  ts.createLiteral(node.name.getText(node.getSourceFile())),
                ],
              ),
              'set',
            ),
          ),
          ...node.body.statements,
        ]),
      ) as any;
    } else if (ts.isConstructorDeclaration(node) && node.body != null) {
      const statements = this.getStatementsForDeclaration(node);
      this.warningCallsWereInjected =
        this.warningCallsWereInjected || statements.length > 0;
      return ts.updateConstructor(
        node,
        node.decorators,
        node.modifiers,
        node.parameters,
        ts.updateBlock(
          node.body,
          insertStatements(
            node.body,
            wrapWithRethrow(statements, node.parent.name!),
          ),
        ),
      ) as any;
    }

    return this.visitEachChild(node);
  }

  /**
   * @param getOrSet for property accessors, determines which of the getter or
   *                 setter should be used to get the caller function value.
   */
  private getStatementsForDeclaration(
    node:
      | ts.MethodDeclaration
      | ts.GetAccessorDeclaration
      | ts.SetAccessorDeclaration
      | ts.ConstructorDeclaration,
  ): ts.Statement[] {
    const klass = node.parent;
    const classSymbolId = symbolIdentifier(
      this.typeChecker,
      this.typeChecker.getTypeAtLocation(klass).symbol,
    );
    if (classSymbolId && this.typeIndex.has(classSymbolId)) {
      const classType = this.typeIndex.get(classSymbolId)! as spec.ClassType;

      if (ts.isConstructorDeclaration(node)) {
        const initializer = classType?.initializer;
        if (initializer) {
          return this.getStatements(classType, initializer);
        }
      }

      const methods = classType?.methods ?? [];
      const method = methods.find(
        (method) => method.name === node.name?.getText(),
      );
      if (method) {
        return this.getStatements(classType, method);
      }

      const properties = classType?.properties ?? [];
      const property = properties.find(
        (property) => property.name === node.name?.getText(),
      );
      if (property) {
        return createWarningStatementForElement(property, classType);
      }
    }
    return [];
  }

  private getStatements(
    classType: spec.ClassType,
    method: spec.Method | spec.Initializer,
  ) {
    const statements = createWarningStatementForElement(method, classType);
    for (const parameter of Object.values(method.parameters ?? {})) {
      const parameterType =
        this.assembly.types && spec.isNamedTypeReference(parameter.type)
          ? this.assembly.types[parameter.type.fqn]
          : undefined;

      if (parameterType) {
        const functionName = `${NAMESPACE}.${fnName(parameterType.fqn)}`;
        statements.push(
          ts.createExpressionStatement(
            ts.createCall(ts.createIdentifier(functionName), undefined, [
              ts.createIdentifier(parameter.name),
            ]),
          ),
        );
      }
    }

    return statements;
  }
}

function createWarningStatementForElement(
  element: spec.Callable | spec.Property,
  classType: spec.ClassType,
): ts.Statement[] {
  if (spec.isDeprecated(element)) {
    const elementName = (element as spec.Method | spec.Property).name;
    const fqn = elementName ? `${classType.fqn}#${elementName}` : classType.fqn;
    const message = element.docs?.deprecated ?? classType.docs?.deprecated;
    return [createWarningFunctionCall(fqn, message, undefined, true)];
  }
  return [];
}

/**
 * Inserts a list of statements in the correct position inside a block of statements.
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

function createEnumRequireStatement(typeLocation: string): ts.Statement {
  const { ext } = path.parse(typeLocation);
  const jsFileName = typeLocation.replace(ext, '.js');

  return createRequireStatement(LOCAL_ENUM_NAMESPACE, `./${jsFileName}`);
}

function createRequireStatement(
  name: string,
  importPath: string,
): ts.Statement {
  return ts.createVariableStatement(
    undefined,
    ts.createVariableDeclarationList(
      [
        ts.createVariableDeclaration(
          name,
          undefined,
          ts.createCall(ts.createIdentifier('require'), undefined, [
            ts.createLiteral(importPath),
          ]),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
}

/**
 * Returns a ready-to-used function name (including a `require`, if necessary)
 */
function importedFunctionName(
  typeName: string,
  assembly: Assembly,
  projectInfo: ProjectInfo,
) {
  const assemblies = projectInfo.dependencyClosure.concat(assembly);
  const { type, moduleName } = findType(typeName, assemblies);
  if (type) {
    return moduleName !== assembly.name
      ? `require("${moduleName}/${WARNINGSCODE_FILE_NAME}").${fnName(type.fqn)}`
      : fnName(type.fqn);
  }
  return undefined;
}

/**
 * Find the type and module name in an array of assemblies
 * matching a given type name
 */
function findType(typeName: string, assemblies: Assembly[]) {
  for (const asm of assemblies) {
    if (asm.metadata?.jsii?.compiledWithDeprecationWarnings) {
      const types = asm.types ?? {};
      for (const name of Object.keys(types)) {
        if (typeName === name) {
          return { type: types[name], moduleName: asm.name };
        }
      }
    }
  }
  return {};
}

function createTypeHandlerCall(
  functionName: string,
  parameter: string,
  collectionKind?: spec.CollectionKind,
): ts.Statement {
  switch (collectionKind) {
    case spec.CollectionKind.Array:
      return ts.createIf(
        ts.createBinary(
          ts.createIdentifier(parameter),
          ts.SyntaxKind.ExclamationEqualsToken,
          ts.createNull(),
        ),
        ts.createForOf(
          undefined,
          ts.createVariableDeclarationList(
            [ts.createVariableDeclaration(FOR_LOOP_ITEM_NAME)],
            ts.NodeFlags.Const,
          ),
          ts.createIdentifier(parameter),
          createTypeHandlerCall(functionName, FOR_LOOP_ITEM_NAME),
        ),
      );
    case spec.CollectionKind.Map:
      return ts.createIf(
        ts.createBinary(
          ts.createIdentifier(parameter),
          ts.SyntaxKind.ExclamationEqualsToken,
          ts.createNull(),
        ),
        ts.createForOf(
          undefined,
          ts.createVariableDeclarationList(
            [ts.createVariableDeclaration(FOR_LOOP_ITEM_NAME)],
            ts.NodeFlags.Const,
          ),
          ts.createCall(
            ts.createPropertyAccess(ts.createIdentifier('Object'), 'values'),
            undefined,
            [ts.createIdentifier(parameter)],
          ),
          createTypeHandlerCall(functionName, FOR_LOOP_ITEM_NAME),
        ),
      );
    case undefined:
      return ts.createIf(
        ts.createPrefix(
          ts.SyntaxKind.ExclamationToken,
          ts.createCall(
            ts.createPropertyAccess(
              ts.createIdentifier(VISITED_OBJECTS_SET_NAME),
              ts.createIdentifier('has'),
            ),
            undefined,
            [ts.createIdentifier(parameter)],
          ),
        ),
        ts.createExpressionStatement(
          ts.createCall(ts.createIdentifier(functionName), undefined, [
            ts.createIdentifier(parameter),
          ]),
        ),
      );
  }
}

/**
 * There is a chance an enum contains duplicates values with distinct keys,
 * with one of those keys being deprecated. This is a potential pattern to "rename" an enum.
 * In this case, we can't concretely determine if the deprecated member was used or not,
 * so in those cases we skip the warnings altogether, rather than erroneously warning for valid usage.
 * This create a statement to check if the enum value is a duplicate:
 *
 * if (Object.values(Foo).filter(x => x === p).length > 1) { return; }
 *
 * Note that we can't just check the assembly for these duplicates, due to:
 * https://github.com/aws/jsii/issues/2782
 */
function createDuplicateEnumValuesCheck(
  type: spec.TypeBase & spec.EnumType,
): ts.Statement {
  return ts.createIf(
    ts.createBinary(
      ts.createPropertyAccess(
        ts.createCall(
          ts.createPropertyAccess(
            ts.createCall(
              ts.createPropertyAccess(ts.createIdentifier('Object'), 'values'),
              undefined,
              [
                ts.createPropertyAccess(
                  ts.createIdentifier(LOCAL_ENUM_NAMESPACE),
                  type.name,
                ),
              ],
            ),
            ts.createIdentifier('filter'),
          ),
          undefined,
          [
            ts.createArrowFunction(
              undefined,
              undefined,
              [ts.createParameter(undefined, undefined, undefined, 'x')],
              undefined,
              ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
              ts.createBinary(
                ts.createIdentifier('x'),
                ts.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),
                ts.createIdentifier(PARAMETER_NAME),
              ),
            ),
          ],
        ),
        ts.createIdentifier('length'),
      ),
      ts.createToken(ts.SyntaxKind.GreaterThanToken),
      ts.createNumericLiteral('1'),
    ),
    ts.createReturn(),
  );
}

// We try-then-rethrow exceptions to avoid runtimes displaying an uncanny wall of text if the place
// where the error was thrown is webpacked. For example, jest somehow manages to capture the throw
// location and renders the source line (which may be the whole file) when bundled.
function wrapWithRethrow(
  statements: ts.Statement[],
  caller: ts.Expression,
): ts.Statement[] {
  if (statements.length === 0) {
    return statements;
  }
  return [
    ts.createTry(
      ts.createBlock(statements),
      ts.createCatchClause(
        ts.createVariableDeclaration('error'),
        ts.createBlock([
          // If this is a DeprecationError, trim its stack trace to surface level before re-throwing,
          // so we don't carry out possibly confusing frames from injected code. That can be toggled
          // off by setting JSII_DEBUG=1, so we can also diagnose in-injected code faults.
          ts.createIf(
            ts.createBinary(
              ts.createBinary(
                ts.createPropertyAccess(
                  ts.createPropertyAccess(
                    ts.createIdentifier('process'),
                    'env',
                  ),
                  'JSII_DEBUG',
                ),
                ts.SyntaxKind.ExclamationEqualsEqualsToken,
                ts.createLiteral('1'),
              ),
              ts.SyntaxKind.AmpersandAmpersandToken,
              ts.createBinary(
                ts.createPropertyAccess(ts.createIdentifier('error'), 'name'),
                ts.SyntaxKind.EqualsEqualsEqualsToken,
                ts.createLiteral(DEPRECATION_ERROR),
              ),
            ),
            ts.createBlock([
              ts.createExpressionStatement(
                ts.createCall(
                  ts.createPropertyAccess(
                    ts.createIdentifier('Error'),
                    'captureStackTrace',
                  ),
                  undefined,
                  [ts.createIdentifier('error'), caller],
                ),
              ),
            ]),
          ),
          ts.createThrow(ts.createIdentifier('error')),
        ]),
      ),
      undefined,
    ),
  ];
}

/**
 * Force a path to be UNIXy (use `/` as a separator)
 *
 * `path.join()` etc. will use the system-dependent path separator (either `/` or `\`
 * depending on your platform).
 *
 * However, if we actually emit the path-dependent separator to the `.js` files, then
 * files compiled with jsii on Windows cannot be used on any other platform. That seems
 * like an unnecessary restriction, especially since a `/` will work fine on Windows,
 * so make sure to always emit `/`.
 *
 * TSC itself always strictly emits `/` (or at least, emits the same what you put in).
 */
function unixPath(filePath: string) {
  if (path.sep === '\\') {
    return filePath.replace(/\\/g, '/');
  }
  return filePath;
}

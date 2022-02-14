// import { JsiiSymbol, simpleName, namespaceName } from '../jsii/jsii-utils';
// import { jsiiTargetParameter } from '../jsii/packages';
import * as ts from 'typescript';

import { analyzeObjectLiteral, determineJsiiType, JsiiType, ObjectLiteralStruct } from '../jsii/jsii-types';
import { OTree } from '../o-tree';
import { AstRenderer } from '../renderer';
import { isExported, isPublic, isReadOnly } from '../typescript/ast-utils';
import { ImportStatement } from '../typescript/imports';
import { determineReturnType, inferMapElementType } from '../typescript/types';
import { DefaultVisitor } from './default';
import { TargetLanguage } from './target-language';

interface GoLanguageContext {
  /**
   * Free floating symbols are made importable across packages by naming with a capital in Go.
   */
  isExported: boolean;

  /**
   * Whether type should be converted a pointer type
   */
  isPtr: boolean;

  /**
   * Whether context is within a struct declaration
   */
  isStruct: boolean;

  /**
   * Whether the context is within an interface delcaration.
   */
  isInterface: boolean;

  /**
   * Whether properties are being intialized within a `map` type
   */
  inMapLiteral: boolean;

  /**
   * Whether to dereference a value if it's a pointer type, for example as part of printing the value.
   */
  deref: boolean;

  /**
   * Wheter to wrap a literal in a pointer constructor ie: jsii.String.
   */
  wrapPtr: boolean;
}

enum DeclarationType {
  STRUCT,
  INTERFACE,
  FUNCTION,
  BUILTIN,
  UNKNOWN,
}

type GoRenderer = AstRenderer<GoLanguageContext>;

export class GoVisitor extends DefaultVisitor<GoLanguageContext> {
  /**
   * Translation version
   *
   * Bump this when you change something in the implementation to invalidate
   * existing cached translations.
   */
  public static readonly VERSION = '1';

  public readonly indentChar = '\t';

  public readonly language = TargetLanguage.GO;

  private readonly idMap = new Map<string, { readonly type: DeclarationType; readonly formatted: string }>();

  public readonly defaultContext: GoLanguageContext = {
    isExported: false,
    isPtr: false,
    isStruct: false,
    isInterface: false,
    inMapLiteral: false,
    deref: false,
    wrapPtr: false,
  };

  protected argumentList(args: readonly ts.Node[] | undefined, renderer: GoRenderer): OTree {
    return new OTree([], args ? renderer.convertAll(args) : [], {
      separator: ', ',
    });
  }

  public block(node: ts.Block, renderer: GoRenderer): OTree {
    return new OTree(['{'], renderer.convertAll(node.statements), {
      indent: 1,
      suffix: renderer.mirrorNewlineBefore(node.statements[0], '}'),
    });
  }

  public expressionStatement(node: ts.ExpressionStatement, renderer: GoRenderer): OTree {
    const inner = renderer.convert(node.expression);
    if (inner.isEmpty) {
      return inner;
    }
    return new OTree([inner], [], { canBreakLine: true });
  }

  public functionDeclaration(node: ts.FunctionDeclaration, renderer: GoRenderer): OTree {
    const funcName = renderer.updateContext({ isExported: isExported(node) }).convert(node.name);
    const retType = this.renderType(node, determineReturnType(renderer.typeChecker, node), true, '', renderer);

    const body = node.body?.statements ? renderer.convertAll(node.body.statements) : [];
    return new OTree(
      [
        'func ',
        funcName,
        '(',
        new OTree([], renderer.updateContext({ isPtr: true }).convertAll(node.parameters), {
          separator: ', ',
        }),
        ') ',
        retType,
      ],
      [
        new OTree(['{'], [this.defaultArgValues(node.parameters, renderer.updateContext({ wrapPtr: true })), ...body], {
          indent: 1,
          suffix: '\n}',
        }),
      ],
      {
        canBreakLine: true,
      },
    );
  }

  public identifier(node: ts.Identifier | ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, renderer: GoRenderer) {
    return new OTree([this.goName(node.text, renderer)]);
  }

  public newExpression(node: ts.NewExpression, renderer: GoRenderer): OTree {
    const { classNamespace, className } = determineClassName.call(this, node.expression);
    return new OTree(
      [
        ...(classNamespace ? [classNamespace, '.'] : []),
        'New', // Should this be "new" if the class is unexported?
        className,
        '(',
      ],
      renderer.updateContext({ wrapPtr: true }).convertAll(node.arguments ?? []),
      { canBreakLine: true, separator: ', ', suffix: ')' },
    );

    function determineClassName(this: GoVisitor, expr: ts.Expression): { classNamespace?: OTree; className: string } {
      if (ts.isIdentifier(expr)) {
        return { className: ucFirst(expr.text) };
      }
      if (ts.isPropertyAccessExpression(expr)) {
        if (ts.isIdentifier(expr.expression)) {
          return {
            className: ucFirst(expr.name.text),
            classNamespace: renderer.updateContext({ isExported: false }).convert(expr.expression),
          };
        }
        renderer.reportUnsupported(expr.expression, TargetLanguage.GO);
        return {
          className: ucFirst(expr.name.text),
          classNamespace: new OTree(['#error#']),
        };
      }
      renderer.reportUnsupported(expr, TargetLanguage.GO);
      return { className: expr.getText(expr.getSourceFile()) };
    }
  }

  public objectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: GoRenderer): OTree {
    const lit = analyzeObjectLiteral(renderer.typeChecker, node);

    switch (lit.kind) {
      case 'unknown':
        return this.unknownTypeObjectLiteralExpression(node, renderer);
      case 'struct':
      case 'local-struct':
        return this.knownStructObjectLiteralExpression(node, lit, renderer);
      case 'map':
        return this.keyValueObjectLiteralExpression(node, renderer);
    }
  }

  public propertyAssignment(node: ts.PropertyAssignment, renderer: GoRenderer): OTree {
    const name = renderer.convert(node.name);
    const key = renderer.currentContext.inMapLiteral ? ['"', name, '"'] : [name];
    // Struct member values are always pointers...
    return new OTree(
      [...key, ': ', renderer.updateContext({ isPtr: renderer.currentContext.isStruct }).convert(node.initializer)],
      [],
      {
        canBreakLine: true,
      },
    );
  }

  public token<A extends ts.SyntaxKind>(node: ts.Token<A>, renderer: GoRenderer): OTree {
    switch (node.kind) {
      case ts.SyntaxKind.FalseKeyword:
      case ts.SyntaxKind.TrueKeyword:
        if (renderer.currentContext.wrapPtr) {
          return new OTree(['jsii.Boolean(', node.getText(), ')']);
        }
        return new OTree([node.getText()]);

      case ts.SyntaxKind.NullKeyword:
      case ts.SyntaxKind.UndefinedKeyword:
        return new OTree(['nil']);
      default:
        return super.token(node, renderer);
    }
  }

  public unknownTypeObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: GoRenderer): OTree {
    return this.keyValueObjectLiteralExpression(node, renderer);
  }

  public keyValueObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: GoRenderer): OTree {
    const valueType = inferMapElementType(node.properties, renderer.typeChecker);

    return new OTree(
      [`map[string]`, this.renderType(node, valueType, true, `interface{}`, renderer), `{`],
      renderer.updateContext({ inMapLiteral: true, wrapPtr: true }).convertAll(node.properties),
      {
        suffix: '}',
        separator: ',',
        trailingSeparator: true,
        indent: 1,
      },
    );
  }

  public knownStructObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    structType: ObjectLiteralStruct,
    renderer: GoRenderer,
  ): OTree {
    return new OTree(
      ['&', this.goName(structType.type.symbol.name, renderer.updateContext({ isPtr: false })), '{'],
      renderer.updateContext({ isStruct: true }).convertAll(node.properties),
      {
        suffix: '}',
        separator: ',',
        trailingSeparator: true,
        indent: 1,
      },
    );
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, renderer: GoRenderer): OTree {
    const nodeName = renderer.convert(node.name);
    const typeNode = this.renderTypeNode(node.type, renderer.currentContext.isPtr, renderer);
    return new OTree([...(node.dotDotDotToken ? ['...'] : []), nodeName, ' ', typeNode]);
  }

  public printStatement(args: ts.NodeArray<ts.Expression>, renderer: GoRenderer): OTree {
    const renderedArgs = this.argumentList(args, renderer.updateContext({ deref: true }));
    // TODO: This might render illegal Go if there are > 1 arguments / it's not a string...
    return new OTree(['fmt.Println(', renderedArgs, ')']);
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, renderer: GoRenderer): OTree {
    return new OTree([
      renderer.convert(node.expression),
      '.',
      // Don't deref beyond the first level of access
      renderer.updateContext({ deref: false }).convert(node.name),
    ]);
  }

  public methodSignature(node: ts.MethodSignature, renderer: AstRenderer<GoLanguageContext>): OTree {
    const type = this.renderTypeNode(node.type, true, renderer);
    return new OTree(
      [
        renderer.updateContext({ isExported: renderer.currentContext.isExported && isPublic(node) }).convert(node.name),
        '(',
      ],
      renderer.convertAll(node.parameters),
      { suffix: `) ${type}`, canBreakLine: true },
    );
  }

  public propertySignature(node: ts.PropertySignature, renderer: GoRenderer): OTree {
    if (renderer.currentContext.isInterface) {
      const type = this.renderTypeNode(node.type, true, renderer);
      const getter = new OTree([
        renderer.updateContext({ isExported: renderer.currentContext.isExported && isPublic(node) }).convert(node.name),
        '() ',
        type,
      ]);
      if (isReadOnly(node)) {
        return getter;
      }
      const setter = new OTree([
        '\n',
        renderer.currentContext.isExported && isPublic(node) ? 'S' : 's',
        'et',
        renderer.updateContext({ isExported: true }).convert(node.name),
        '(value ',
        type,
        ')',
      ]);
      return new OTree([getter, setter]);
    }

    return new OTree([
      '\n',
      renderer.updateContext({ isExported: renderer.currentContext.isExported && isPublic(node) }).convert(node.name),
      ' ',
      this.renderTypeNode(node.type, renderer.currentContext.isPtr, renderer),
    ]);
  }

  public regularCallExpression(node: ts.CallExpression, renderer: GoRenderer): OTree {
    return new OTree([
      renderer.convert(node.expression),
      '(',
      this.argumentList(node.arguments, renderer.updateContext({ wrapPtr: true })),
      ')',
    ]);
  }

  public stringLiteral(node: ts.StringLiteral, renderer: GoRenderer): OTree {
    const text = JSON.stringify(node.text);

    return new OTree([`${renderer.currentContext.wrapPtr ? jsiiStr(text) : text}`]);
  }

  public numericLiteral(node: ts.NumericLiteral, renderer: GoRenderer): OTree {
    const text = `${node.text}`;

    return new OTree([`${renderer.currentContext.wrapPtr ? jsiiNum(text) : text}`]);
  }

  public structInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: GoRenderer): OTree {
    return new OTree(
      ['type ', renderer.updateContext({ isStruct: true }).convert(node.name), ' struct {'],
      renderer.updateContext({ isStruct: true, isPtr: true }).convertAll(node.members),
      { indent: 1, canBreakLine: true, separator: '\n', trailingSeparator: true, suffix: '}' },
    );
  }

  public regularInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: AstRenderer<GoLanguageContext>): OTree {
    const name = this.goName(node.name.text, renderer.updateContext({ isExported: isExported(node) }));
    return new OTree(
      [`type ${name} interface {`],
      renderer.updateContext({ isInterface: true, isExported: isExported(node) }).convertAll(node.members),
      { indent: 1, canBreakLine: true, separator: '\n', trailingSeparator: true, suffix: '}' },
    );
  }

  public ifStatement(node: ts.IfStatement, renderer: AstRenderer<GoLanguageContext>): OTree {
    const ifStmt = new OTree(['if ', renderer.convert(node.expression), ' '], [renderer.convert(node.thenStatement)], {
      canBreakLine: true,
    });
    if (!node.elseStatement) {
      return ifStmt;
    }
    const elseStmt = new OTree(['else '], [renderer.convert(node.elseStatement)], {
      canBreakLine: true,
    });

    return new OTree([], [ifStmt, elseStmt], {
      separator: ' ',
      canBreakLine: true,
    });
  }

  public importStatement(node: ImportStatement, renderer: AstRenderer<GoLanguageContext>): OTree {
    if (node.imports.import === 'full') {
      const packageName =
        node.moduleSymbol?.sourceAssembly?.packageJson.jsii?.targets?.go?.packageName ??
        this.goName(node.packageName, renderer);
      const moduleName = node.moduleSymbol?.sourceAssembly?.packageJson.jsii?.targets?.go?.moduleName
        ? `${node.moduleSymbol.sourceAssembly.packageJson.jsii.targets.go.moduleName}/${packageName}`
        : `github.com/aws-samples/dummy/${packageName}`;
      return new OTree(['import ', this.goName(node.imports.alias, renderer), ' "', moduleName, '"']);
    }

    renderer.reportUnsupported(node.node, TargetLanguage.GO);
    return new OTree([`import "${node.packageName}"`]);
  }

  public variableDeclaration(node: ts.VariableDeclaration, renderer: AstRenderer<GoLanguageContext>): OTree {
    if (!node.initializer) {
      return new OTree([
        'var ',
        renderer.updateContext({ isExported: isExported(node) }).convert(node.name),
        ' ',
        this.renderTypeNode(node.type, false, renderer) || 'interface{}',
      ]);
    }

    return new OTree([
      renderer.updateContext({ isExported: false }).convert(node.name),
      ' := ',
      renderer.convert(node.initializer),
    ]);
  }

  private defaultArgValues(params: ts.NodeArray<ts.ParameterDeclaration>, renderer: GoRenderer) {
    return new OTree(
      params.reduce((accum: OTree[], param) => {
        if (!param.initializer) {
          return accum;
        }

        const name = renderer.convert(param.name);
        return [
          ...accum,
          new OTree(['\n', 'if ', name, ' = nil {'], ['\n', name, ' = ', renderer.convert(param.initializer)], {
            indent: 1,
            suffix: '\n}',
          }),
        ];
      }, []),
    );
  }

  public mergeContext(old: GoLanguageContext, update: Partial<GoLanguageContext>): GoLanguageContext {
    return Object.assign({}, old, update);
  }

  private renderTypeNode(typeNode: ts.TypeNode | undefined, isPtr: boolean, renderer: GoRenderer): string {
    if (!typeNode) {
      return '';
    }
    return this.renderType(typeNode, renderer.typeOfType(typeNode), isPtr, renderer.textOf(typeNode), renderer);
  }

  private renderType(
    typeNode: ts.Node,
    type: ts.Type | undefined,
    isPtr: boolean,
    fallback: string,
    renderer: GoRenderer,
  ): string {
    if (type === undefined) {
      return fallback;
    }

    const jsiiType = determineJsiiType(renderer.typeChecker, type);

    const doRender = (jsiiType: JsiiType, isPtr: boolean): string => {
      const prefix = isPtr ? '*' : '';
      switch (jsiiType.kind) {
        case 'unknown':
          return fallback;
        case 'error':
          renderer.report(typeNode, jsiiType.message);
          return fallback;
        case 'map':
          return `map[string]${doRender(jsiiType.elementType, isPtr)}`;
        case 'list':
          return `[]${doRender(jsiiType.elementType, isPtr)}`;
        case 'namedType':
          return this.goName(jsiiType.name, renderer);
        case 'builtIn':
          switch (jsiiType.builtIn) {
            case 'boolean':
              return `${prefix}bool`;
            case 'number':
              return `${prefix}f64`;
            case 'string':
              return `${prefix}string`;
            case 'any':
              return 'interface{}';
            case 'void':
              return '';
          }
      }
    };

    return doRender(jsiiType, isPtr);
  }

  /**
   * Guess an item's go name based on it's TS name and context
   */
  private goName(input: string, renderer: GoRenderer) {
    let text = input.replace(/[^a-z0-9_]/gi, '');
    const prev = this.idMap.get(input);

    if (prev) {
      // If an identifier has been renamed go get it
      text = prev.formatted;
    } else if (renderer.currentContext.isExported) {
      // Uppercase exported and public symbols/members
      text = ucFirst(text);
    } else {
      // Lowercase unexported items that are capitalized in TS like structs/interfaces/classes
      text = lcFirst(text);
    }

    text = prefixReserved(text);

    if (text !== input) {
      this.idMap.set(input, { formatted: text, type: getDeclarationType(renderer.currentContext) });
    }

    if (
      renderer.currentContext.deref ||
      (renderer.currentContext.isPtr && prev && prev?.type !== DeclarationType.INTERFACE)
    ) {
      return `*${text}`;
    }
    return text;
  }
}

/**
 * Uppercase the first letter
 */
function ucFirst(x: string) {
  return x.substring(0, 1).toUpperCase() + x.substring(1);
}

/**
 * Lowercase the first letter
 */
function lcFirst(x: string) {
  return x.substring(0, 1).toLowerCase() + x.substring(1);
}

/**
 * Wrap a string literal in the jsii.String helper
 */
function jsiiStr(x: string) {
  return `jsii.String(${x})`;
}

/**
 * Wrap a string literal in the jsii.String helper
 */
function jsiiNum(x: string) {
  return `jsii.Number(${x})`;
}

/**
 * Prefix reserved word identifiers with _
 */
function prefixReserved(x: string) {
  if (['struct'].includes(x)) {
    return `${x}_`;
  }
  return x;
}

function getDeclarationType(ctx: GoLanguageContext) {
  if (ctx.isStruct) {
    return DeclarationType.STRUCT;
  }

  return DeclarationType.UNKNOWN;
}

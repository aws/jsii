// import { JsiiSymbol, simpleName, namespaceName } from '../jsii/jsii-utils';
// import { jsiiTargetParameter } from '../jsii/packages';
import * as ts from 'typescript';

import { analyzeObjectLiteral, determineJsiiType, JsiiType, ObjectLiteralStruct } from '../jsii/jsii-types';
import { OTree } from '../o-tree';
import { AstRenderer } from '../renderer';
import { isExported } from '../typescript/ast-utils';
import { determineReturnType, inferMapElementType } from '../typescript/types';
import { DefaultVisitor } from './default';
import { TargetLanguage } from './target-language';

interface GoLanguageContext {
  /**
   * Properties are made public by starting their name with a capital letter in Go.
   */
  isPublic: boolean;

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

  public readonly language = TargetLanguage.GO;

  private readonly idMap: Map<string, { type: DeclarationType; formatted: string }> = new Map();

  public readonly defaultContext = {
    isPublic: false,
    isExported: false,
    isPtr: false,
    isStruct: false,
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
    return new OTree(['\n{'], [...renderer.convertAll(node.statements)], {
      indent: 4,
      suffix: '\n}',
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
          indent: 4,
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
    return new OTree([...key, ': ', renderer.convert(node.initializer)], [], {
      canBreakLine: true,
    });
  }

  public unknownTypeObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: GoRenderer): OTree {
    return this.keyValueObjectLiteralExpression(node, renderer);
  }

  public keyValueObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: GoRenderer): OTree {
    const valueType = inferMapElementType(node.properties, renderer.typeChecker);

    return new OTree(
      [`map[string]`, this.renderType(node, valueType, renderer.currentContext.isPtr, `interface{}`, renderer), `{`],
      renderer.updateContext({ inMapLiteral: true }).convertAll(node.properties),
      {
        suffix: '}',
        separator: ', ',
        indent: 4,
      },
    );
  }

  public knownStructObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    structType: ObjectLiteralStruct,
    renderer: GoRenderer,
  ): OTree {
    return new OTree([this.goName(structType.type.symbol.name, renderer), '{'], renderer.convertAll(node.properties), {
      suffix: renderer.mirrorNewlineBefore(node.properties[0], '}', ' '),
      separator: ', ',
      indent: 4,
    });
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, renderer: GoRenderer): OTree {
    const nodeName = renderer.convert(node.name);
    const typeNode = this.renderTypeNode(node.type, renderer.currentContext.isPtr, renderer);
    return new OTree([...(node.dotDotDotToken ? ['...'] : []), nodeName, ' ', typeNode]);
  }

  public printStatement(args: ts.NodeArray<ts.Expression>, renderer: GoRenderer): OTree {
    const renderedArgs = this.argumentList(args, renderer.updateContext({ deref: true }));

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

  public propertySignature(node: ts.PropertySignature, renderer: GoRenderer): OTree {
    return new OTree([
      '\n',
      renderer.convert(node.name),
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
    const text = `"${node.text}"`;

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
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
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
            indent: 4,
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
          }
      }
    };

    return doRender(jsiiType, isPtr);
  }

  /**
   * Guess an item's go name based on it's TS name and context
   */
  private goName(input: string, renderer: GoRenderer) {
    let text = input;
    const prev = this.idMap.get(input);
    const deref =
      renderer.currentContext.deref ||
      (renderer.currentContext.isPtr && prev && prev?.type !== DeclarationType.INTERFACE);

    if (prev) {
      // If an identifier has been renamed go get it
      text = prev.formatted;
    } else if (renderer.currentContext.isPublic || renderer.currentContext.isExported) {
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

    const prefix = deref ? '*' : '';
    return `${prefix}${text}`;
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

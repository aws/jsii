import ts = require('typescript');
import { DefaultVisitor } from './default';
import { AstRenderer } from '../renderer';
import { OTree } from '../o-tree';
import { getNonUndefinedTypeFromUnion, builtInTypeName, typeContainsUndefined, parameterAcceptsUndefined, mapElementType } from '../typescript/types';
import { flat } from '../util';

interface CSharpLanguageContext {
  readonly currentClassName?: string;
  readonly propertyOrMethod: boolean;
  readonly inStructInterface: boolean;
  readonly inKeyValueList: boolean;
}

type CSharpRenderer = AstRenderer<CSharpLanguageContext>;

export class CSharpVisitor extends DefaultVisitor<CSharpLanguageContext> {
  readonly defaultContext = { propertyOrMethod: false, inStructInterface: false, inKeyValueList: false };

  public mergeContext(old: CSharpLanguageContext, update: Partial<CSharpLanguageContext>): CSharpLanguageContext {
    return Object.assign({}, old, update);
  }

  public identifier(node: ts.Identifier, renderer: CSharpRenderer) {
    let text = node.text;

    // Uppercase methods and properties, leave the rest as-is
    if (renderer.currentContext.propertyOrMethod) {
      text = text.substr(0, 1).toUpperCase() + text.substr(1);
    }

    return new OTree([text]);
  }

  public functionDeclaration(node: ts.FunctionDeclaration, renderer: CSharpRenderer): OTree {
    return this.functionLike(node, renderer);
  }

  public constructorDeclaration(node: ts.ConstructorDeclaration, renderer: CSharpRenderer): OTree {
    return this.functionLike(node, renderer, { isConstructor: true });
  }

  public methodDeclaration(node: ts.MethodDeclaration, renderer: CSharpRenderer): OTree {
    return this.functionLike(node, renderer);
  }

  // tslint:disable-next-line:max-line-length
  public functionLike(node: ts.FunctionLikeDeclarationBase, renderer: CSharpRenderer, opts: { isConstructor?: boolean } = {}): OTree {
    const methodName = opts.isConstructor ? renderer.currentContext.currentClassName || 'MyClass' : renderer.updateContext({ propertyOrMethod: true }).convert(node.name);
    const returnType = opts.isConstructor ? '' : this.renderTypeNode(node.type, false, renderer);

    const ret = new OTree([
      'public ',
      returnType,
      ' ',
      methodName,
      '(',
      new OTree([], renderer.convertAll(node.parameters), { separator: ', ' }),
      ') ',
    ], [renderer.convert(node.body)], {
      canBreakLine: true
    });

    return ret;
  }

  public printStatement(args: ts.NodeArray<ts.Expression>, renderer: CSharpRenderer) {
    return new OTree([
      'Console.WriteLine',
      '($"',
      new OTree([], args.map(a => new OTree(['{', renderer.convert(a), '}'])), { separator: ' ' }),
      '")']);
  }

  public expressionStatement(node: ts.ExpressionStatement, renderer: CSharpRenderer): OTree {
    return new OTree([renderer.convert(node.expression), ';'], [], { canBreakLine: true });
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, renderer: CSharpRenderer): OTree {
    const objectExpression = renderer.textOf(node.expression) === 'this' ? [] : [renderer.updateContext({ propertyOrMethod: false }).convert(node.expression), '.'];
    return new OTree([...objectExpression, renderer.updateContext({ propertyOrMethod: true }).convert(node.name)]);
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, renderer: CSharpRenderer): OTree {
    return new OTree([
      this.renderTypeNode(node.type, node.questionToken !== undefined, renderer),
      ' ',
      renderer.convert(node.name),
      ...parameterAcceptsUndefined(node, node.type && renderer.typeOfType(node.type)) ? ['=', node.initializer ? renderer.convert(node.initializer) : 'null'] : []
    ]);
  }

  public propertySignature(node: ts.PropertySignature, renderer: CSharpRenderer): OTree {
    return new OTree([
      'public ',
      this.renderTypeNode(node.type, node.questionToken !== undefined, renderer),
      ' ',
      renderer.updateContext({ propertyOrMethod: true }).convert(node.name),
      ';',
    ], [], { canBreakLine: true });
  }

  /**
   * Do some work on property accesses to translate common JavaScript-isms to language-specific idioms
   */
  public regularCallExpression(node: ts.CallExpression, renderer: CSharpRenderer): OTree {
    const functionText = renderer.textOf(node.expression);
    if (functionText === 'console.log' || functionText === 'console.error') { return this.printStatement(node.arguments, renderer); }

    return new OTree([
      renderer.updateContext({ propertyOrMethod: true }).convert(node.expression),
      '(',
      new OTree([], renderer.convertAll(node.arguments), { separator: ', ' }),
      ')']);
  }

  public classDeclaration(node: ts.ClassDeclaration, renderer: CSharpRenderer): OTree {
    return new OTree(
      [
        'class ',
        renderer.convert(node.name),
        ...this.classHeritage(node, renderer),
        '\n{',
      ],
      renderer.convertAll(node.members),
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
  }

  public structInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: CSharpRenderer): OTree {
    return new OTree([
      'class ',
      renderer.convert(node.name),
      ...this.classHeritage(node, renderer),
      '\n{',
    ],
    renderer.updateContext({ inStructInterface: true }).convertAll(node.members),
    {
      indent: 4,
      canBreakLine: true,
      suffix: '\n}'
    });
  }

  public regularInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: CSharpRenderer): OTree {
    return new OTree([
      'interface ',
      renderer.convert(node.name),
      ...this.classHeritage(node, renderer),
      '\n{',
    ],
    renderer.convertAll(node.members),
    {
      indent: 4,
      canBreakLine: true,
      suffix: '\n}'
    });
  }

  public block(node: ts.Block, children: CSharpRenderer): OTree {
    return new OTree(['\n{'], [...children.convertAll(node.statements)], {
      indent: 4,
      suffix: '\n}',
    });
  }

  public unknownTypeObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: CSharpRenderer): OTree {
    return new OTree(['new Struct { '], renderer.convertAll(node.properties), { suffix: ' }', separator: ', ', indent: 4 });
  }

  public knownStructObjectLiteralExpression(node: ts.ObjectLiteralExpression, structType: ts.Type, renderer: CSharpRenderer): OTree {
    return new OTree(['new ', structType.symbol.name, ' { '], renderer.convertAll(node.properties), { suffix: ' }', separator: ', ', indent: 4 });
  }

  public keyValueObjectLiteralExpression(node: ts.ObjectLiteralExpression, valueType: ts.Type | undefined, renderer: CSharpRenderer): OTree {
    return new OTree([
      'new Dictionary<string, ',
      valueType ? this.renderType(node, valueType, false, renderer) : 'object',
      '> { '], renderer.updateContext({ inKeyValueList: true }).convertAll(node.properties), { suffix: ' }', separator: ', ', indent: 4, });
  }

  public shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, renderer: CSharpRenderer): OTree {
    return this.renderPropertyAssignment(node.name, node.name, renderer);
  }

  public propertyAssignment(node: ts.PropertyAssignment, renderer: CSharpRenderer): OTree {
    return this.renderPropertyAssignment(node.name, node.initializer, renderer);
  }

  public renderPropertyAssignment(key: ts.Node, value: ts.Node, renderer: CSharpRenderer): OTree {
    if (renderer.currentContext.inKeyValueList) {
      return new OTree(['{ "', renderer.updateContext({ propertyOrMethod: false }).convert(key), '", ', renderer.updateContext({ inKeyValueList: false }).convert(value), ' }'], [], { canBreakLine: true });
    } else {
      return new OTree([renderer.updateContext({ propertyOrMethod: true }).convert(key), ' = ', renderer.convert(value)], [], { canBreakLine: true });
    }
  }

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, renderer: CSharpRenderer): OTree {
    return new OTree(['new [] { '], renderer.convertAll(node.elements), {
      separator: ', ',
      suffix: ' }',
      indent: 4,
    });
  }

  private renderTypeNode(typeNode: ts.TypeNode | undefined, questionMark: boolean, renderer: CSharpRenderer): string {
    if (!typeNode) { return 'void'; }
    return this.renderType(typeNode, renderer.typeOfType(typeNode), questionMark, renderer);
  }

  private renderType(typeNode: ts.Node, type: ts.Type, questionMark: boolean, renderer: CSharpRenderer): string {
    const nonUnionType = getNonUndefinedTypeFromUnion(type);
    if (!nonUnionType) {
      renderer.report(typeNode, 'Type unions in examples are not supported');
      return '...';
    }

    const mappedTo = mapElementType(nonUnionType);
    if (mappedTo) {
      return `IDictionary<string, ${this.renderType(typeNode, mappedTo, questionMark, renderer)}>`;
    }

    return typeNameFromType(nonUnionType) + (typeContainsUndefined(type) || questionMark ? '?' : '');
  }

  private classHeritage(node: ts.ClassDeclaration | ts.InterfaceDeclaration, renderer: CSharpRenderer) {
    const heritage = flat(Array.from(node.heritageClauses || []).map(h => Array.from(h.types))).map(t => renderer.convert(t.expression));

    return heritage.length > 0 ? [' : ', new OTree([], heritage, { separator: ', ' })] : [];
  }
}

function typeNameFromType(type: ts.Type): string {
  // User-defined or aliased type
  if (type.aliasSymbol) { return type.aliasSymbol.name; }
  if (type.symbol) { return type.symbol.name; }

  // Built-in type (?)
  return csharpTypeName(builtInTypeName(type));
}

function csharpTypeName(jsTypeName: string | undefined): string {
  if (jsTypeName === undefined) { return '???'; }
  switch (jsTypeName) {
    case 'number': return 'int';
    case 'any': return 'object';
  }
  return jsTypeName;
}
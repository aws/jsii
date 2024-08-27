import * as ts from 'typescript';

import { determineJsiiType, JsiiType, ObjectLiteralStruct } from '../jsii/jsii-types';
import { JsiiSymbol, simpleName, namespaceName } from '../jsii/jsii-utils';
import { jsiiTargetParameter } from '../jsii/packages';
import { OTree, NO_SYNTAX } from '../o-tree';
import { AstRenderer, nimpl } from '../renderer';
import {
  matchAst,
  nodeOfType,
  quoteStringLiteral,
  visibility,
  isReadOnly,
  findSuperCall,
  privatePropertyNames,
  findEnclosingClassDeclaration,
} from '../typescript/ast-utils';
import { ImportStatement } from '../typescript/imports';
import {
  typeContainsUndefined,
  parameterAcceptsUndefined,
  inferMapElementType,
  determineReturnType,
} from '../typescript/types';
import { flat, fmap } from '../util';
import { DefaultVisitor } from './default';
import { TargetLanguage } from './target-language';

interface CSharpLanguageContext {
  /**
   * Used to capitalize member accesses
   */
  readonly propertyOrMethod: boolean;

  /**
   * So we know how to render property signatures
   */
  readonly inStructInterface: boolean;

  /**
   * So we know how to render property signatures
   */
  readonly inRegularInterface: boolean;

  /**
   * So we know how to render property assignments
   */
  readonly inKeyValueList: boolean;

  /**
   * Whether a string literal is currently in the position of having to render as an identifier (LHS in property assignment)
   */
  readonly stringAsIdentifier: boolean;

  /**
   * Whether an identifier literal is currently in the position of having to render as a string (LHS in property assignment)
   */
  readonly identifierAsString: boolean;

  /**
   * When parsing an object literal and no type information is available, prefer parsing it as a struct to parsing it as a map
   */
  readonly preferObjectLiteralAsStruct: boolean;

  /**
   * When encountering these properties, render them as lowercase instead of uppercase
   */
  readonly privatePropertyNames: string[];
}

type CSharpRenderer = AstRenderer<CSharpLanguageContext>;

export class CSharpVisitor extends DefaultVisitor<CSharpLanguageContext> {
  /**
   * Translation version
   *
   * Bump this when you change something in the implementation to invalidate
   * existing cached translations.
   */
  public static readonly VERSION = '1';

  public readonly language = TargetLanguage.CSHARP;

  public readonly defaultContext = {
    propertyOrMethod: false,
    inStructInterface: false,
    inRegularInterface: false,
    inKeyValueList: false,
    stringAsIdentifier: false,
    identifierAsString: false,
    preferObjectLiteralAsStruct: true,
    privatePropertyNames: [],
  };

  /**
   * Aliases for modules
   *
   * If these are encountered in the LHS of a property access, they will be dropped.
   */
  private readonly dropPropertyAccesses = new Set<string>();

  /**
   * Already imported modules so we don't emit duplicate imports
   */
  private readonly alreadyImportedNamespaces = new Set<string>();

  /**
   * A map to undo import renames
   *
   * We will always reference the original name in the translation.
   *
   * Maps a local-name to a C# name.
   */
  private readonly renamedSymbols = new Map<string, string>();

  public mergeContext(old: CSharpLanguageContext, update: Partial<CSharpLanguageContext>): CSharpLanguageContext {
    return Object.assign({}, old, update);
  }

  public identifier(
    node: ts.Identifier | ts.StringLiteral | ts.NoSubstitutionTemplateLiteral,
    renderer: CSharpRenderer,
  ) {
    let text = node.text;

    if (renderer.currentContext.identifierAsString) {
      return new OTree([JSON.stringify(text)]);
    }

    // Uppercase methods and properties, leave the rest as-is
    if (renderer.currentContext.propertyOrMethod && !renderer.currentContext.privatePropertyNames.includes(text)) {
      text = ucFirst(text);
    }

    return new OTree([text]);
  }

  public importStatement(importStatement: ImportStatement, context: CSharpRenderer): OTree {
    const guessedNamespace = guessDotnetNamespace(importStatement.packageName);
    const namespace = fmap(importStatement.moduleSymbol, findDotnetName) ?? guessedNamespace;

    if (importStatement.imports.import === 'full') {
      this.dropPropertyAccesses.add(importStatement.imports.sourceName);
      this.alreadyImportedNamespaces.add(namespace);
      return new OTree([`using ${namespace};`], [], { canBreakLine: true });
    }
    if (importStatement.imports.import === 'selective') {
      const statements = new Array<string>();

      for (const el of importStatement.imports.elements) {
        const dotnetNs = fmap(el.importedSymbol, findDotnetName) ?? `${guessedNamespace}.${ucFirst(el.sourceName)}`;

        // If this is an alias, we only honor it if it's NOT for sure a module
        // (could be an alias import of a class or enum).
        if (el.alias && el.importedSymbol?.symbolType !== 'module') {
          this.renamedSymbols.set(el.alias, simpleName(dotnetNs));
          statements.push(`using ${ucFirst(el.alias)} = ${dotnetNs};`);
          continue;
        }

        // If we are importing a module directly, drop the occurrences of that
        // identifier further down (turn `mod.MyClass` into `MyClass`).
        if (el.importedSymbol?.symbolType === 'module') {
          this.dropPropertyAccesses.add(el.alias ?? el.sourceName);
        }

        // Output an import statement for the containing namespace
        const importableNamespace = el.importedSymbol?.symbolType === 'module' ? dotnetNs : namespaceName(dotnetNs);
        if (this.alreadyImportedNamespaces.has(importableNamespace)) {
          continue;
        }

        this.alreadyImportedNamespaces.add(importableNamespace);
        statements.push(`using ${importableNamespace};`);
      }

      return new OTree([], statements, { canBreakLine: true, separator: '\n' });
    }

    return nimpl(importStatement.node, context);
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

  public methodSignature(node: ts.MethodSignature, renderer: CSharpRenderer): OTree {
    return new OTree(
      [
        this.renderTypeNode(node.type, false, renderer),
        ' ',
        renderer.updateContext({ propertyOrMethod: true }).convert(node.name),
        '(',
        new OTree([], renderer.convertAll(node.parameters), {
          separator: ', ',
        }),
        ');',
      ],
      [],
      { canBreakLine: true },
    );
  }

  // tslint:disable-next-line:max-line-length
  public functionLike(
    node: ts.FunctionLikeDeclaration | ts.ConstructorDeclaration | ts.MethodDeclaration,
    renderer: CSharpRenderer,
    opts: { isConstructor?: boolean } = {},
  ): OTree {
    const methodName = opts.isConstructor
      ? (findEnclosingClassDeclaration(node)?.name?.text ?? 'MyClass')
      : renderer.updateContext({ propertyOrMethod: true }).convert(node.name);

    const retType = determineReturnType(renderer.typeChecker, node);
    const returnType = opts.isConstructor ? '' : this.renderType(node, retType, false, 'void', renderer);

    const baseConstructorCall = new Array<string | OTree>();
    if (opts.isConstructor) {
      const superCall = findSuperCall(node.body, renderer);
      if (superCall) {
        baseConstructorCall.push(': base(', this.argumentList(superCall.arguments, renderer), ') ');
      }
    }

    const ret = new OTree(
      [
        visibility(node),
        ' ',
        returnType,
        returnType ? ' ' : '',
        methodName,
        '(',
        new OTree([], renderer.convertAll(node.parameters), {
          separator: ', ',
        }),
        ') ',
        ...baseConstructorCall,
      ],
      [renderer.convert(node.body)],
      {
        canBreakLine: true,
      },
    );

    return ret;
  }

  public propertyDeclaration(node: ts.PropertyDeclaration, renderer: CSharpRenderer): OTree {
    const vis = visibility(node);
    const propertyOrMethod = vis !== 'private'; // Capitalize non-private fields

    if (vis === 'private' || node.initializer) {
      // Emit member field
      return new OTree(
        [
          vis,
          isReadOnly(node) ? ' readonly' : '',
          ' ',
          this.renderTypeNode(node.type, node.questionToken !== undefined, renderer),
          ' ',
          renderer.updateContext({ propertyOrMethod }).convert(node.name),
          ...(node.initializer ? [' = ', renderer.convert(node.initializer)] : []),
          ';',
        ],
        [],
        { canBreakLine: true },
      );
    }

    // Emit property. No functional difference but slightly more idiomatic
    return new OTree(
      [
        vis,
        ' ',
        this.renderTypeNode(node.type, node.questionToken !== undefined, renderer),
        ' ',
        renderer.updateContext({ propertyOrMethod }).convert(node.name),
        ' ',
        isReadOnly(node) ? '{ get; }' : '{ get; set; }',
      ],
      [],
      { canBreakLine: true },
    );
  }

  public printStatement(args: ts.NodeArray<ts.Expression>, renderer: CSharpRenderer) {
    const renderedArgs =
      args.length === 1
        ? renderer.convertAll(args)
        : [
            '$"',
            new OTree(
              [],
              args.map((a) => new OTree(['{', renderer.convert(a), '}'])),
              { separator: ' ' },
            ),
            '"',
          ];

    return new OTree(['Console.WriteLine(', ...renderedArgs, ')']);
  }

  public superCallExpression(_node: ts.CallExpression, _renderer: CSharpRenderer): OTree {
    // super() call rendered as part of the constructor already
    return NO_SYNTAX;
  }

  public stringLiteral(node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, renderer: CSharpRenderer): OTree {
    if (renderer.currentContext.stringAsIdentifier) {
      return this.identifier(node, renderer);
    }
    if (node.text.includes('\n')) {
      // Multi-line string literals (@"string") in C# do not do escaping. Only " needs to be doubled.
      return new OTree(['@"', node.text.replace(/"/g, '""'), '"']);
    }
    return new OTree([JSON.stringify(node.text)]);
  }

  public expressionStatement(node: ts.ExpressionStatement, renderer: CSharpRenderer): OTree {
    const inner = renderer.convert(node.expression);
    if (inner.isEmpty) {
      return inner;
    }
    return new OTree([inner, ';'], [], { canBreakLine: true });
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, renderer: CSharpRenderer): OTree {
    const lhs = renderer.textOf(node.expression);

    // Suppress the LHS of the dot operator if it's "this." (not necessary in C#)
    // or if it's an imported module reference (C# has namespace-wide imports).
    const objectExpression =
      lhs === 'this' || this.dropPropertyAccesses.has(lhs)
        ? []
        : [renderer.updateContext({ propertyOrMethod: false }).convert(node.expression), '.'];

    return new OTree([...objectExpression, renderer.updateContext({ propertyOrMethod: true }).convert(node.name)]);
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, renderer: CSharpRenderer): OTree {
    return new OTree([
      ...(node.dotDotDotToken ? ['params '] : []), // Varargs. Render with 'params' keyword
      this.renderTypeNode(node.type, node.questionToken !== undefined, renderer),
      ' ',
      renderer.convert(node.name),
      ...(parameterAcceptsUndefined(node, node.type && renderer.typeOfType(node.type))
        ? ['=', node.initializer ? renderer.convert(node.initializer) : 'null']
        : []),
    ]);
  }

  public propertySignature(node: ts.PropertySignature, renderer: CSharpRenderer): OTree {
    const canSet = renderer.currentContext.inStructInterface || !isReadOnly(node);

    return new OTree(
      [
        !renderer.currentContext.inRegularInterface ? `${visibility(node)} ` : NO_SYNTAX,
        this.renderTypeNode(node.type, node.questionToken !== undefined, renderer),
        ' ',
        renderer.updateContext({ propertyOrMethod: true }).convert(node.name),
        ' ',
        canSet ? '{ get; set; }' : '{ get; }',
      ],
      [],
      { canBreakLine: true },
    );
  }

  /**
   * Do some work on property accesses to translate common JavaScript-isms to language-specific idioms
   */
  public regularCallExpression(node: ts.CallExpression, renderer: CSharpRenderer): OTree {
    return new OTree([
      renderer.updateContext({ propertyOrMethod: true }).convert(node.expression),
      '(',
      this.argumentList(node.arguments, renderer),
      ')',
    ]);
  }

  public classDeclaration(node: ts.ClassDeclaration, renderer: CSharpRenderer): OTree {
    return new OTree(
      ['class ', renderer.convert(node.name), ...this.classHeritage(node, renderer), '\n{'],
      renderer
        .updateContext({
          privatePropertyNames: privatePropertyNames(node.members, renderer),
        })
        .convertAll(node.members),
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
  }

  public structInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: CSharpRenderer): OTree {
    return new OTree(
      ['class ', renderer.convert(node.name), ...this.classHeritage(node, renderer), '\n{'],
      renderer.updateContext({ inStructInterface: true }).convertAll(node.members),
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
  }

  public regularInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: CSharpRenderer): OTree {
    return new OTree(
      ['interface ', renderer.convert(node.name), ...this.classHeritage(node, renderer), '\n{'],
      renderer.updateContext({ inRegularInterface: true }).convertAll(node.members),
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
  }

  public block(node: ts.Block, children: CSharpRenderer): OTree {
    return new OTree(['\n{'], [...children.convertAll(node.statements)], {
      indent: 4,
      suffix: '\n}',
    });
  }

  public unknownTypeObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: CSharpRenderer): OTree {
    if (renderer.currentContext.preferObjectLiteralAsStruct) {
      // Type information missing and from context we prefer a struct
      return new OTree(['new Struct { '], renderer.convertAll(node.properties), {
        suffix: renderer.mirrorNewlineBefore(node.properties[0], '}', ' '),
        separator: ', ',
        indent: 4,
      });
    }
    // Type information missing and from context we prefer a map
    return this.keyValueObjectLiteralExpression(node, renderer);
  }

  public knownStructObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    structType: ObjectLiteralStruct,
    renderer: CSharpRenderer,
  ): OTree {
    return new OTree(['new ', structType.type.symbol.name, ' { '], renderer.convertAll(node.properties), {
      suffix: renderer.mirrorNewlineBefore(node.properties[0], '}', ' '),
      separator: ', ',
      indent: 4,
    });
  }

  public keyValueObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: CSharpRenderer): OTree {
    // Try to infer an element type from the elements
    const valueType = inferMapElementType(node.properties, renderer.typeChecker);

    return new OTree(
      ['new Dictionary<string, ', this.renderType(node, valueType, false, 'object', renderer), '> { '],
      renderer.updateContext({ inKeyValueList: true }).convertAll(node.properties),
      {
        suffix: renderer.mirrorNewlineBefore(node.properties[0], '}', ' '),
        separator: ', ',
        indent: 4,
      },
    );
  }

  public shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, renderer: CSharpRenderer): OTree {
    return this.renderPropertyAssignment(node.name, node.name, renderer);
  }

  public propertyAssignment(node: ts.PropertyAssignment, renderer: CSharpRenderer): OTree {
    return this.renderPropertyAssignment(node.name, node.initializer, renderer);
  }

  public renderPropertyAssignment(key: ts.Node, value: ts.Node, renderer: CSharpRenderer): OTree {
    if (renderer.currentContext.inKeyValueList) {
      return new OTree(
        [
          '{ ',
          renderer
            .updateContext({
              propertyOrMethod: false,
              identifierAsString: !ts.isComputedPropertyName(key),
            })
            .convert(key),
          ', ',
          renderer.updateContext({ inKeyValueList: false }).convert(value),
          ' }',
        ],
        [],
        { canBreakLine: true },
      );
    }
    return new OTree(
      [
        renderer.updateContext({ propertyOrMethod: true, stringAsIdentifier: true }).convert(key),
        ' = ',
        renderer.convert(value),
      ],
      [],
      { canBreakLine: true },
    );
  }

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, renderer: CSharpRenderer): OTree {
    return new OTree(['new [] { '], renderer.convertAll(node.elements), {
      separator: ', ',
      suffix: ' }',
      indent: 4,
    });
  }

  public ifStatement(node: ts.IfStatement, renderer: CSharpRenderer): OTree {
    const ifStmt = new OTree(
      ['if (', renderer.convert(node.expression), ') '],
      [renderer.convert(node.thenStatement)],
      { canBreakLine: true },
    );
    const elseStmt = node.elseStatement
      ? new OTree(['else '], [renderer.convert(node.elseStatement)], {
          canBreakLine: true,
        })
      : undefined;

    return elseStmt
      ? new OTree([], [ifStmt, elseStmt], {
          separator: '\n',
          canBreakLine: true,
        })
      : ifStmt;
  }

  public forOfStatement(node: ts.ForOfStatement, renderer: CSharpRenderer): OTree {
    // This is what a "for (const x of ...)" looks like in the AST
    let variableName = '???';

    matchAst(
      node.initializer,
      nodeOfType(ts.SyntaxKind.VariableDeclarationList, nodeOfType('var', ts.SyntaxKind.VariableDeclaration)),
      (bindings) => {
        variableName = renderer.textOf(bindings.var.name);
      },
    );

    return new OTree(
      ['for (var ', variableName, ' in ', renderer.convert(node.expression), ') '],
      [renderer.convert(node.statement)],
      { canBreakLine: true },
    );
  }

  public asExpression(node: ts.AsExpression, context: CSharpRenderer): OTree {
    return new OTree(['(', this.renderTypeNode(node.type, false, context), ')', context.convert(node.expression)]);
  }

  public variableDeclaration(node: ts.VariableDeclaration, renderer: CSharpRenderer): OTree {
    let typeOrVar = 'var';

    const fallback = node.type?.getText() ?? 'var';
    const type =
      (node.type && renderer.typeOfType(node.type)) ??
      (node.initializer && renderer.typeOfExpression(node.initializer));

    const varType = this.renderType(node, type, false, fallback, renderer);
    // If there is an initializer, and the value isn't "IDictionary<...", we always use var, as this is the
    // recommendation from Roslyn.
    if (varType !== 'object' && (varType.startsWith('IDictionary<') || node.initializer == null)) {
      typeOrVar = varType;
    }

    if (!node.initializer) {
      return new OTree([typeOrVar, ' ', renderer.convert(node.name), ';']);
    }

    return new OTree(
      [
        typeOrVar,
        ' ',
        renderer.convert(node.name),
        ' = ',
        renderer.updateContext({ preferObjectLiteralAsStruct: false }).convert(node.initializer),
        ';',
      ],
      undefined,
      { canBreakLine: true },
    );
  }

  public templateExpression(node: ts.TemplateExpression, context: CSharpRenderer): OTree {
    // If this is a multi-line string literal, we need not quote much, as @"string" literals in C#
    // do not perform any quoting. The literal quotes in the text however must be doubled.
    const isMultiLine =
      !!node.head.rawText?.includes('\n') || node.templateSpans.some((span) => span.literal.rawText?.includes('\n'));

    const parts = new Array<string>();
    if (node.head.rawText) {
      parts.push(isMultiLine ? node.head.rawText.replace(/"/g, '""') : quoteStringLiteral(node.head.rawText));
    }
    for (const span of node.templateSpans) {
      parts.push(`{${context.textOf(span.expression)}}`);
      if (span.literal.rawText) {
        parts.push(isMultiLine ? span.literal.rawText.replace(/"/g, '""') : quoteStringLiteral(span.literal.rawText));
      }
    }

    return new OTree([isMultiLine ? '$@"' : '$"', ...parts, '"']);
  }

  protected argumentList(args: readonly ts.Node[] | undefined, renderer: CSharpRenderer): OTree {
    return new OTree([], args ? renderer.updateContext({ preferObjectLiteralAsStruct: true }).convertAll(args) : [], {
      separator: ', ',
    });
  }

  private renderTypeNode(typeNode: ts.TypeNode | undefined, questionMark: boolean, renderer: CSharpRenderer): string {
    if (!typeNode) {
      return 'void';
    }
    return this.renderType(typeNode, renderer.typeOfType(typeNode), questionMark, renderer.textOf(typeNode), renderer);
  }

  private renderType(
    typeNode: ts.Node,
    type: ts.Type | undefined,
    questionMark: boolean,
    fallback: string,
    renderer: CSharpRenderer,
  ): string {
    if (type === undefined) {
      return fallback;
    }

    const renderedType = doRender(determineJsiiType(renderer.typeChecker, type));

    const suffix = questionMark || typeContainsUndefined(type) ? '?' : '';

    return renderedType + suffix;

    // eslint-disable-next-line consistent-return
    function doRender(jsiiType: JsiiType): string {
      switch (jsiiType.kind) {
        case 'unknown':
          return fallback;
        case 'error':
          renderer.report(typeNode, jsiiType.message);
          return fallback;
        case 'map':
          return `IDictionary<string, ${doRender(jsiiType.elementType)}>`;
        case 'list':
          return `${doRender(jsiiType.elementType)}[]`;
        case 'namedType':
          return jsiiType.name;
        case 'builtIn':
          switch (jsiiType.builtIn) {
            case 'boolean':
              return 'boolean';
            case 'number':
              return 'int';
            case 'string':
              return 'string';
            case 'any':
              return 'object';
            case 'void':
              return 'void';
          }
      }
    }
  }

  private classHeritage(node: ts.ClassDeclaration | ts.InterfaceDeclaration, renderer: CSharpRenderer) {
    const heritage = flat(Array.from(node.heritageClauses ?? []).map((h) => Array.from(h.types))).map((t) =>
      renderer.convert(t.expression),
    );

    return heritage.length > 0 ? [' : ', new OTree([], heritage, { separator: ', ' })] : [];
  }
}

/**
 * Uppercase the first letter
 */
function ucFirst(x: string) {
  return x.slice(0, 1).toUpperCase() + x.slice(1);
}

/**
 * Find the Java name of a module or type
 */
function findDotnetName(jsiiSymbol: JsiiSymbol): string | undefined {
  if (!jsiiSymbol.sourceAssembly?.assembly) {
    // Don't have accurate info, just guess
    return jsiiSymbol.symbolType !== 'module' ? simpleName(jsiiSymbol.fqn) : guessDotnetNamespace(jsiiSymbol.fqn);
  }

  const asm = jsiiSymbol.sourceAssembly?.assembly;
  return recurse(jsiiSymbol.fqn);

  function recurse(fqn: string): string {
    if (fqn === asm.name) {
      return jsiiTargetParameter(asm, 'dotnet.namespace') ?? guessDotnetNamespace(fqn);
    }
    if (asm.submodules?.[fqn]) {
      const modName = jsiiTargetParameter(asm.submodules[fqn], 'dotnet.namespace');
      if (modName) {
        return modName;
      }
    }

    return `${recurse(namespaceName(fqn))}.${ucFirst(simpleName(jsiiSymbol.fqn))}`;
  }
}

function guessDotnetNamespace(ref: string) {
  return ref
    .split(/[^a-zA-Z0-9]+/g)
    .filter((s) => s !== '')
    .map(ucFirst)
    .join('.');
}

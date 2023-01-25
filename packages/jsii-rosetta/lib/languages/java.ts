import * as ts from 'typescript';

import { determineJsiiType, JsiiType, analyzeObjectLiteral, ObjectLiteralStruct } from '../jsii/jsii-types';
import { JsiiSymbol, simpleName, namespaceName } from '../jsii/jsii-utils';
import { jsiiTargetParameter } from '../jsii/packages';
import { TargetLanguage } from '../languages/target-language';
import { OTree, NO_SYNTAX } from '../o-tree';
import { AstRenderer } from '../renderer';
import { SubmoduleReference } from '../submodule-reference';
import { isReadOnly, matchAst, nodeOfType, quoteStringLiteral, visibility } from '../typescript/ast-utils';
import { ImportStatement } from '../typescript/imports';
import { isEnumAccess, isStaticReadonlyAccess, determineReturnType } from '../typescript/types';
import { fmap, setExtend } from '../util';
import { DefaultVisitor } from './default';

interface JavaContext {
  /**
   * Whether to ignore the left-hand part of a property access expression.
   *
   * Used to strip out TypeScript namespace prefixes from 'extends' and 'new' clauses,
   * EVEN if the source doesn't compile.
   *
   * @default false
   */
  readonly discardPropertyAccess?: boolean;

  /**
   * Whether a property access ('sth.b') should be substituted by a getter ('sth.getB()').
   * Not true for 'new' expressions and calls to methods on objects.
   *
   * @default true
   */
  readonly convertPropertyToGetter?: boolean;

  /**
   * Set when we are in the middle translating a type (= class, interface or enum) declaration.
   */
  readonly insideTypeDeclaration?: InsideTypeDeclaration;

  /**
   * True if we are in the middle of a `new` expression that has an object literal as its last argument -
   * in that case, we render a ClassName.Builder.create(...).prop(...).build() expression instead.
   *
   * @default false
   */
  readonly inNewExprWithObjectLiteralAsLastArg?: boolean;

  /**
   * True when, from the context,
   * we are supposed to render a JavaScript object literal as a Map in Java.
   *
   * @default false
   */
  readonly inKeyValueList?: boolean;

  /**
   * Used when rendering a JavaScript object literal that is _not_ for a struct -
   * we render that as a Map in Java.
   *
   * @default false
   */
  readonly identifierAsString?: boolean;

  /**
   * Used when rendering a JavaScript object literal that is for a struct -
   * maps to a Builder in Java.
   *
   * @default false
   */
  readonly stringLiteralAsIdentifier?: boolean;

  /**
   * Used to denote that a type is being rendered in a position where a generic
   * type parameter is expected, so only reference types are valid (not
   * primitives).
   *
   * @default false
   */
  readonly requiresReferenceType?: boolean;
}

/**
 * Values saved when we are translating a type declaration.
 */
interface InsideTypeDeclaration {
  /**
   * The name of the type.
   * Needed to correctly generate the constructor.
   */
  readonly typeName: ts.Node | undefined;

  /**
   * Is this an interface (true) or a class (unset/false)
   */
  readonly isInterface?: boolean;
}

type JavaRenderer = AstRenderer<JavaContext>;

export class JavaVisitor extends DefaultVisitor<JavaContext> {
  /**
   * Translation version
   *
   * Bump this when you change something in the implementation to invalidate
   * existing cached translations.
   */
  public static readonly VERSION = '1';

  /**
   * Aliases for modules
   *
   * If these are encountered in the LHS of a property access, they will be dropped.
   */
  private readonly dropPropertyAccesses = new Set<string>();

  public readonly language = TargetLanguage.JAVA;
  public readonly defaultContext = {};

  public mergeContext(old: JavaContext, update: Partial<JavaContext>): JavaContext {
    return Object.assign({}, old, update);
  }

  public importStatement(importStatement: ImportStatement): OTree {
    const guessedNamespace = guessJavaNamespaceName(importStatement.packageName);
    if (importStatement.imports.import === 'full') {
      this.dropPropertyAccesses.add(importStatement.imports.sourceName);
      const namespace = fmap(importStatement.moduleSymbol, findJavaName) ?? guessedNamespace;

      return new OTree([`import ${namespace}.*;`], [], { canBreakLine: true });
    }

    const imports = importStatement.imports.elements.map((e) => {
      const fqn = fmap(e.importedSymbol, findJavaName) ?? `${guessedNamespace}.${e.sourceName}`;

      // If there is no imported symbol, we check if there is anything looking like a type name in
      // the source name (that is, any segment that starts with an upper case letter), and if none
      // is found, assume this refers to a namespace/module.
      return (e.importedSymbol?.symbolType == null &&
        !e.sourceName.split('.').some((segment) => /^[A-Z]/.test(segment))) ||
        e.importedSymbol?.symbolType === 'module'
        ? `import ${fqn}.*;`
        : `import ${fqn};`;
    });

    const localNames = importStatement.imports.elements
      .filter((el) => el.importedSymbol?.symbolType === 'module')
      .map((el) => el.alias ?? el.sourceName);
    setExtend(this.dropPropertyAccesses, localNames);

    return new OTree([], imports, { canBreakLine: true, separator: '\n' });
  }

  public classDeclaration(node: ts.ClassDeclaration, renderer: JavaRenderer): OTree {
    return this.renderClassDeclaration(node, renderer);
  }

  public structInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: JavaRenderer): OTree {
    // Render structs as simple Java classes with getters, and setters that return `this`.
    // This is a compromise between brevity
    // (rendering a full inner static Builder class, like JSII uses, would be quite verbose)
    // and ease of use
    // (fluent setters allow us to mirror JavaScript object literals more closely than classic,
    // void-returning setters would).

    return this.renderClassDeclaration(node, renderer);
  }

  public regularInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        'public ',
        'interface ',
        renderer.convert(node.name),
        ...this.typeHeritage(node, renderer.updateContext({ discardPropertyAccess: true })),
        ' {',
      ],
      renderer
        .updateContext({
          insideTypeDeclaration: { typeName: node.name, isInterface: true },
        })
        .convertAll(node.members),
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
  }

  public propertySignature(node: ts.PropertySignature, renderer: JavaRenderer): OTree {
    const propertyType = this.renderTypeNode(node.type, renderer, 'Object');
    const propertyName = renderer.convert(node.name);

    const isClass = !renderer.currentContext.insideTypeDeclaration?.isInterface;
    const blockSep = isClass ? ' ' : ';';

    const field = isClass
      ? new OTree([], ['private ', propertyType, ' ', propertyName, ';'], {
          canBreakLine: true,
        })
      : NO_SYNTAX;

    const getter = new OTree(
      [],
      [
        isClass ? 'public ' : NO_SYNTAX,
        propertyType,
        ' ',
        `get${capitalize(renderer.textOf(node.name))}()${blockSep}`,
        isClass ? this.renderBlock([new OTree(['\n'], ['return this.', propertyName, ';'])]) : NO_SYNTAX,
      ],
      {
        canBreakLine: true,
      },
    );

    const hasSetter = isClass || !isReadOnly(node);

    const setter = hasSetter
      ? new OTree(
          [],
          [
            isClass ? 'public ' : NO_SYNTAX,
            renderer.convert(renderer.currentContext.insideTypeDeclaration!.typeName),
            ' ',
            propertyName, // don't prefix the setter with `set` - makes it more aligned with JSII builders
            '(',
            propertyType,
            ' ',
            propertyName,
            `)${blockSep}`,
            isClass
              ? this.renderBlock([
                  new OTree(['\n'], ['this.', propertyName, ' = ', propertyName, ';']),
                  new OTree(['\n'], ['return this;']),
                ])
              : NO_SYNTAX,
          ],
          {
            canBreakLine: true,
          },
        )
      : NO_SYNTAX;

    return new OTree([], [field, getter, setter], {
      canBreakLine: true,
      separator: '\n',
    });
  }

  public propertyDeclaration(node: ts.PropertyDeclaration, renderer: JavaRenderer): OTree {
    const vis = visibility(node);

    return new OTree(
      [
        vis,
        isReadOnly(node) ? ' final' : '',
        ' ',
        this.renderTypeNode(node.type, renderer, 'Object'),
        ' ',
        renderer.convert(node.name),
        ';',
      ],
      [],
      {
        canBreakLine: true,
      },
    );
  }

  public constructorDeclaration(node: ts.ConstructorDeclaration, renderer: JavaRenderer): OTree {
    return this.renderProcedure(node, renderer, renderer.currentContext.insideTypeDeclaration!.typeName, undefined);
  }

  public methodDeclaration(node: ts.MethodDeclaration, renderer: JavaRenderer): OTree {
    const retType = determineReturnType(renderer.typeChecker, node);
    return this.renderProcedure(node, renderer, node.name, this.renderType(node, retType, renderer, 'void'));
  }

  public functionDeclaration(node: ts.FunctionDeclaration, renderer: JavaRenderer): OTree {
    const retType = determineReturnType(renderer.typeChecker, node);
    return this.renderProcedure(node, renderer, node.name, this.renderType(node, retType, renderer, 'void'));
  }

  public methodSignature(node: ts.MethodSignature, renderer: JavaRenderer): OTree {
    return new OTree(
      [
        this.renderTypeNode(node.type, renderer, 'void'),
        ' ',
        renderer.convert(node.name),
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

  public parameterDeclaration(node: ts.ParameterDeclaration, renderer: JavaRenderer): OTree {
    let renderedType = this.renderTypeNode(node.type, renderer);
    if (node.dotDotDotToken && renderedType.endsWith('[]')) {
      // Varargs. In Java, render this as `Element...` (instead of `Element[]` which is what we'll have gotten).
      renderedType = `${renderedType.slice(0, -2)}...`;
    }

    return new OTree([renderedType, ' ', renderer.convert(node.name)]);
  }

  public block(node: ts.Block, renderer: JavaRenderer): OTree {
    return this.renderBlock(renderer.convertAll(node.statements));
  }

  public variableDeclaration(node: ts.VariableDeclaration, renderer: JavaRenderer): OTree {
    let fallback = 'Object';
    if (node.type) {
      fallback = node.type.getText();
    }
    const type =
      (node.type && renderer.typeOfType(node.type)) ||
      (node.initializer && renderer.typeOfExpression(node.initializer));

    const renderedType = type ? this.renderType(node, type, renderer, fallback) : fallback;

    if (!node.initializer) {
      return new OTree([renderedType, ' ', renderer.convert(node.name), ';'], []);
    }

    return new OTree(
      [
        renderedType,
        ' ',
        renderer.convert(node.name),
        ...(node.initializer ? [' = ', renderer.convert(node.initializer)] : []),
        ';',
      ],
      [],
      {
        canBreakLine: true,
      },
    );
  }

  public expressionStatement(node: ts.ExpressionStatement, renderer: JavaRenderer): OTree {
    const inner = renderer.convert(node.expression);
    return inner.isEmpty ? inner : new OTree([inner, ';'], [], { canBreakLine: true });
  }

  public ifStatement(node: ts.IfStatement, renderer: JavaRenderer): OTree {
    const ifStmt = new OTree(
      ['if (', renderer.convert(node.expression), ') '],
      [renderer.convert(node.thenStatement)],
      {
        canBreakLine: true,
      },
    );
    const elseStmt = node.elseStatement
      ? new OTree(['else '], [renderer.convert(node.elseStatement)], {
          canBreakLine: true,
        })
      : undefined;

    return elseStmt
      ? new OTree([], [ifStmt, elseStmt], {
          separator: ' ',
          canBreakLine: true,
        })
      : ifStmt;
  }

  public forOfStatement(node: ts.ForOfStatement, renderer: JavaRenderer): OTree {
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
      ['for (Object ', variableName, ' : ', renderer.convert(node.expression), ') '],
      [renderer.convert(node.statement)],
      {
        canBreakLine: true,
      },
    );
  }

  public printStatement(args: ts.NodeArray<ts.Expression>, renderer: JavaRenderer) {
    return new OTree([
      'System.out.println(',
      args.length === 1 ? renderer.convert(args[0]) : new OTree([], renderer.convertAll(args), { separator: ' + ' }),
      ')',
    ]);
  }

  public templateExpression(node: ts.TemplateExpression, renderer: JavaRenderer): OTree {
    let template = '';
    const parameters = new Array<OTree>();

    if (node.head.rawText) {
      template += node.head.rawText;
    }

    for (const span of node.templateSpans) {
      template += '%s';
      parameters.push(
        renderer
          .updateContext({
            convertPropertyToGetter: true,
            identifierAsString: false,
          })
          .convert(span.expression),
      );
      if (span.literal.rawText) {
        template += span.literal.rawText;
      }
    }

    if (parameters.length === 0) {
      return new OTree([JSON.stringify(quoteStringLiteral(template))]);
    }

    return new OTree([
      'String.format(',
      `"${quoteStringLiteral(template)
        // Java does not have multiline string literals, so we must replace literal newlines with %n
        .replace(/\n/g, '%n')}"`,
      ...parameters.reduce((list, element) => list.concat(', ', element), new Array<string | OTree>()),
      ')',
    ]);
  }

  public asExpression(node: ts.AsExpression, renderer: JavaRenderer): OTree {
    return new OTree(['(', this.renderTypeNode(node.type, renderer, 'Object'), ')', renderer.convert(node.expression)]);
  }

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, renderer: JavaRenderer): OTree {
    return new OTree(['List.of('], renderer.convertAll(node.elements), {
      separator: ', ',
      suffix: ')',
      indent: 4,
    });
  }

  public regularCallExpression(node: ts.CallExpression, renderer: JavaRenderer): OTree {
    return new OTree([
      renderer.updateContext({ convertPropertyToGetter: false }).convert(node.expression),
      '(',
      this.argumentList(node.arguments, renderer),
      ')',
    ]);
  }

  public newExpression(node: ts.NewExpression, renderer: JavaRenderer): OTree {
    const argsLength = node.arguments ? node.arguments.length : 0;
    const lastArg = argsLength > 0 ? node.arguments![argsLength - 1] : undefined;

    // We render the ClassName.Builder.create(...) expression
    // if the last argument is an object literal, and either a known struct (because
    // those are the jsii rules) or an unknown type (because the example didn't
    // compile but most of the target examples will intend this to be a struct).

    const structArgument = lastArg && ts.isObjectLiteralExpression(lastArg) ? lastArg : undefined;
    let renderBuilder = false;
    if (lastArg && ts.isObjectLiteralExpression(lastArg)) {
      const analysis = analyzeObjectLiteral(renderer.typeChecker, lastArg);
      renderBuilder = analysis.kind === 'struct' || analysis.kind === 'unknown';
    }

    const className = renderer
      .updateContext({
        discardPropertyAccess: true,
        convertPropertyToGetter: false,
      })
      .convert(node.expression);

    if (renderBuilder) {
      const initialArguments = node.arguments!.slice(0, argsLength - 1);
      return new OTree(
        [],
        [
          className,
          '.Builder.create(',
          this.argumentList(initialArguments, renderer),
          ')',
          ...renderer.convertAll(structArgument!.properties),
          new OTree([renderer.mirrorNewlineBefore(structArgument!.properties[0])], ['.build()']),
        ],
        { canBreakLine: true, indent: 8 },
      );
    }

    return new OTree([], ['new ', className, '(', this.argumentList(node.arguments, renderer), ')'], {
      canBreakLine: true,
    });
  }

  public unknownTypeObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: JavaRenderer): OTree {
    return renderer.currentContext.inNewExprWithObjectLiteralAsLastArg
      ? this.renderObjectLiteralAsBuilder(node, renderer)
      : this.keyValueObjectLiteralExpression(node, renderer);
  }

  public keyValueObjectLiteralExpression(node: ts.ObjectLiteralExpression, renderer: JavaRenderer): OTree {
    return new OTree(['Map.of('], renderer.updateContext({ inKeyValueList: true }).convertAll(node.properties), {
      suffix: ')',
      separator: ', ',
      indent: 8,
    });
  }

  public knownStructObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    structType: ObjectLiteralStruct,
    renderer: JavaRenderer,
  ): OTree {
    // Special case: we're rendering an object literal, but the containing constructor
    // has already started the builder: we don't have to create a new instance,
    // all we have to do is pile on arguments.
    if (renderer.currentContext.inNewExprWithObjectLiteralAsLastArg) {
      return new OTree([], renderer.convertAll(node.properties), { indent: 8 });
    }

    // Jsii-generated classes have builders, classes we generated in the course of
    // this example do not.
    const hasBuilder = structType.kind !== 'local-struct';

    return new OTree(
      hasBuilder ? [structType.type.symbol.name, '.builder()'] : ['new ', structType.type.symbol.name, '()'],
      [
        ...renderer.convertAll(node.properties),
        new OTree([renderer.mirrorNewlineBefore(node.properties[0])], [hasBuilder ? '.build()' : '']),
      ],
      {
        indent: 8,
      },
    );
  }

  public propertyAssignment(node: ts.PropertyAssignment, renderer: JavaRenderer): OTree {
    return renderer.currentContext.inKeyValueList
      ? this.singlePropertyInJavaScriptObjectLiteralToJavaMap(node.name, node.initializer, renderer)
      : this.singlePropertyInJavaScriptObjectLiteralToFluentSetters(node.name, node.initializer, renderer);
  }

  public shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, renderer: JavaRenderer): OTree {
    return renderer.currentContext.inKeyValueList
      ? this.singlePropertyInJavaScriptObjectLiteralToJavaMap(node.name, node.name, renderer)
      : this.singlePropertyInJavaScriptObjectLiteralToFluentSetters(node.name, node.name, renderer);
  }

  public propertyAccessExpression(
    node: ts.PropertyAccessExpression,
    renderer: JavaRenderer,
    submoduleRef: SubmoduleReference | undefined,
  ): OTree {
    const rightHandSide = renderer.convert(node.name);
    // If a submodule access, then just render the name, we emitted a * import of the expression segment already.
    if (submoduleRef != null) {
      return rightHandSide;
    }

    let parts: Array<OTree | string | undefined>;

    const leftHandSide = renderer.textOf(node.expression);

    // Suppress the LHS of the dot operator if it matches an alias for a module import.
    if (this.dropPropertyAccesses.has(leftHandSide) || renderer.currentContext.discardPropertyAccess) {
      parts = [rightHandSide];
    } else if (leftHandSide === 'this') {
      // for 'this', assume this is a field, and access it directly
      parts = ['this', '.', rightHandSide];
    } else {
      let convertToGetter = renderer.currentContext.convertPropertyToGetter !== false;

      // See if we're not accessing an enum member or public static readonly property (const).
      if (isEnumAccess(renderer.typeChecker, node)) {
        convertToGetter = false;
      }
      if (isStaticReadonlyAccess(renderer.typeChecker, node)) {
        convertToGetter = false;
      }

      // add a 'get' prefix to the property name, and change the access to a method call, if required
      const renderedRightHandSide = convertToGetter ? `get${capitalize(node.name.text)}()` : rightHandSide;

      // strip any trailing ! from the left-hand side, as they're not meaningful in Java
      parts = [renderer.convert(node.expression), '.', renderedRightHandSide];
    }

    return new OTree(parts);
  }

  public stringLiteral(node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, renderer: JavaRenderer): OTree {
    if (renderer.currentContext.stringLiteralAsIdentifier) {
      return this.identifier(node, renderer);
    }
    // Java does not have multiline string literals, so we must replace literal newlines with \n
    return new OTree([JSON.stringify(node.text).replace(/\n/g, '\\n')]);
  }

  public identifier(
    node: ts.Identifier | ts.StringLiteral | ts.NoSubstitutionTemplateLiteral,
    renderer: JavaRenderer,
  ): OTree {
    const nodeText = node.text;
    return new OTree([renderer.currentContext.identifierAsString ? JSON.stringify(nodeText) : nodeText]);
  }

  private renderObjectLiteralAsBuilder(node: ts.ObjectLiteralExpression, renderer: JavaRenderer): OTree {
    return new OTree(
      [],
      [
        ...renderer.convertAll(node.properties),
        new OTree([renderer.mirrorNewlineBefore(node.properties[0])], ['.build()']),
      ],
      {
        indent: 8,
      },
    );
  }

  private singlePropertyInJavaScriptObjectLiteralToJavaMap(
    name: ts.Node,
    initializer: ts.Node,
    renderer: JavaRenderer,
  ): OTree {
    return new OTree(
      [],
      [
        renderer
          .updateContext({
            identifierAsString: !ts.isComputedPropertyName(name),
          })
          .convert(name),
        ', ',
        renderer.updateContext({ inKeyValueList: false }).convert(initializer),
      ],
      {
        canBreakLine: true,
      },
    );
  }

  private singlePropertyInJavaScriptObjectLiteralToFluentSetters(
    name: ts.Node,
    initializer: ts.Node,
    renderer: JavaRenderer,
  ): OTree {
    return new OTree(
      [],
      [
        '.',
        renderer.updateContext({ stringLiteralAsIdentifier: true }).convert(name),
        '(',
        renderer.updateContext({ inNewExprWithObjectLiteralAsLastArg: false }).convert(initializer),
        ')',
      ],
      {
        canBreakLine: true,
      },
    );
  }

  private renderClassDeclaration(node: ts.ClassDeclaration | ts.InterfaceDeclaration, renderer: JavaRenderer) {
    return new OTree(
      [
        'public ',
        'class ',
        renderer.convert(node.name),
        ...this.typeHeritage(node, renderer.updateContext({ discardPropertyAccess: true })),
        ' {',
      ],
      renderer.updateContext({ insideTypeDeclaration: { typeName: node.name } }).convertAll(node.members),
      {
        indent: 4,
        canBreakLine: true,
        suffix: '\n}',
      },
    );
  }

  private typeHeritage(
    node: ts.ClassDeclaration | ts.InterfaceDeclaration,
    renderer: JavaRenderer,
  ): Array<OTree | string | undefined> {
    return [
      ...this.extractSuperTypes(node, renderer, ts.SyntaxKind.ExtendsKeyword, 'extends'),
      ...this.extractSuperTypes(node, renderer, ts.SyntaxKind.ImplementsKeyword, 'implements'),
    ];
  }

  private extractSuperTypes(
    node: ts.ClassDeclaration | ts.InterfaceDeclaration,
    renderer: JavaRenderer,
    heritageKeyword: ts.SyntaxKind,
    outputKeyword: string,
  ): Array<OTree | string | undefined> {
    const heritageClause = (node.heritageClauses ?? []).find((hc) => hc.token === heritageKeyword);
    const superTypes = heritageClause ? heritageClause.types.map((t) => renderer.convert(t.expression)) : [];
    return superTypes.length > 0 ? [` ${outputKeyword} `, new OTree([], superTypes, { separator: ', ' })] : [];
  }

  private renderTypeNode(typeNode: ts.TypeNode | undefined, renderer: JavaRenderer, fallback?: string): string {
    fallback =
      fallback ??
      (typeNode
        ? lastElement(renderer.textOf(typeNode).split('.')) // remove any namespace prefixes
        : 'Object');

    if (!typeNode) {
      return fallback;
    }

    return this.renderType(typeNode, renderer.typeOfType(typeNode), renderer, fallback);
  }

  private renderType(owningNode: ts.Node, type: ts.Type | undefined, renderer: JavaRenderer, fallback: string): string {
    if (!type) {
      return fallback;
    }

    return doRender(determineJsiiType(renderer.typeChecker, type), false);

    // eslint-disable-next-line consistent-return
    function doRender(jsiiType: JsiiType, requiresReferenceType: boolean): string {
      switch (jsiiType.kind) {
        case 'unknown':
          return fallback;
        case 'error':
          renderer.report(owningNode, jsiiType.message);
          return fallback;
        case 'map':
          return `Map<String, ${doRender(jsiiType.elementType, true)}>`;
        case 'list':
          return `${doRender(jsiiType.elementType, true)}[]`;
        case 'namedType':
          return jsiiType.name;
        case 'builtIn':
          switch (jsiiType.builtIn) {
            case 'boolean':
              return requiresReferenceType ? 'Boolean' : 'boolean';
            case 'number':
              return 'Number';
            case 'string':
              return 'String';
            case 'any':
              return 'Object';
            default:
              return jsiiType.builtIn;
          }
      }
    }
  }

  private renderProcedure(
    node: ts.ConstructorDeclaration | ts.MethodDeclaration | ts.FunctionDeclaration,
    renderer: JavaRenderer,
    methodOrConstructorName: ts.Node | undefined,
    returnType: string | undefined,
  ): OTree {
    const overloads = new Array<OTree>();
    for (let i = 0; i < node.parameters.length; i++) {
      const param = node.parameters[i];
      if (!!param.questionToken || !!param.initializer) {
        // The parameter is either optional, or has a default -
        // render an overload that delegates to a version with one more parameter.
        // Note that we don't check that all parameters with indexes > i are also optional/have a default -
        // we assume the TypeScript compiler does that for us.

        // parameters up to but excluding the current one
        const parametersUpToIth = node.parameters.slice(0, i);
        // how should the call to the next overload look
        const callExpr = ts.isConstructorDeclaration(node) ? 'this' : renderer.convert(methodOrConstructorName);

        overloads.push(
          this.renderOverload(
            returnType,
            renderer,
            methodOrConstructorName,
            parametersUpToIth,
            // the body is the call to the next overload
            this.renderBlock([
              new OTree(
                ['\n', callExpr, '('],
                [
                  ...parametersUpToIth.map((param) => renderer.convert(param.name)),
                  param.initializer ? renderer.convert(param.initializer) : 'null',
                ],
                {
                  separator: ', ',
                  suffix: ');',
                },
              ),
            ]),
          ),
        );
      }
    }
    // render the primary overload
    overloads.push(
      this.renderOverload(returnType, renderer, methodOrConstructorName, node.parameters, renderer.convert(node.body)),
    );

    return new OTree([], overloads, {
      canBreakLine: true,
      separator: '\n\n',
    });
  }

  private renderOverload(
    returnType: string | undefined,
    renderer: JavaRenderer,
    methodOrConstructorName: ts.Node | undefined,
    parameters: ts.ParameterDeclaration[] | ts.NodeArray<ts.ParameterDeclaration>,
    body: OTree,
  ): OTree {
    return new OTree(
      [
        'public ',
        returnType ? `${returnType} ` : undefined,
        renderer.convert(methodOrConstructorName),
        '(',
        new OTree([], renderer.convertAll(parameters), { separator: ', ' }),
        ') ',
      ],
      [body],
      {
        canBreakLine: true,
      },
    );
  }

  private renderBlock(blockContents: OTree[]): OTree {
    return new OTree(['{'], blockContents, {
      indent: 4,
      suffix: '\n}',
    });
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function lastElement(strings: string[]): string {
  return strings[strings.length - 1];
}

/**
 * Find the Java name of a module or type
 */
function findJavaName(jsiiSymbol: JsiiSymbol): string | undefined {
  if (!jsiiSymbol.sourceAssembly?.assembly) {
    // Don't have accurate info, just guess
    return jsiiSymbol.symbolType !== 'module' ? simpleName(jsiiSymbol.fqn) : guessJavaNamespaceName(jsiiSymbol.fqn);
  }

  const asm = jsiiSymbol.sourceAssembly?.assembly;
  return recurse(jsiiSymbol.fqn);

  function recurse(fqn: string): string {
    if (fqn === asm.name) {
      return jsiiTargetParameter(asm, 'java.package') ?? guessJavaNamespaceName(fqn);
    }
    if (asm.submodules?.[fqn]) {
      const modName = jsiiTargetParameter(asm.submodules[fqn], 'java.package');
      if (modName) {
        return modName;
      }
    }

    const ns = namespaceName(fqn);
    const nsJavaName = recurse(ns);
    const leaf = simpleName(fqn);
    return `${nsJavaName}.${leaf}`;
  }
}

function guessJavaNamespaceName(packageName: string) {
  return packageName
    .split(/[^a-zA-Z0-9]+/g)
    .filter((s) => s !== '')
    .join('.');
}

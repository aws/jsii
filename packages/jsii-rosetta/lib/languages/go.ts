// import { JsiiSymbol, simpleName, namespaceName } from '../jsii/jsii-utils';
// import { jsiiTargetParameter } from '../jsii/packages';
import { AssertionError } from 'assert';
import * as ts from 'typescript';

import { analyzeObjectLiteral, determineJsiiType, JsiiType, ObjectLiteralStruct } from '../jsii/jsii-types';
import { lookupJsiiSymbolFromNode } from '../jsii/jsii-utils';
import { OTree } from '../o-tree';
import { AstRenderer } from '../renderer';
import { SubmoduleReference } from '../submodule-reference';
import { isExported, isPublic, isPrivate, isReadOnly, isStatic } from '../typescript/ast-utils';
import { analyzeImportDeclaration, ImportStatement } from '../typescript/imports';
import {
  determineReturnType,
  inferMapElementType,
  inferredTypeOfExpression,
  typeOfExpression,
} from '../typescript/types';
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
   * Whether this is the R-Value in an assignment expression to a pointer value.
   */
  isPtrAssignmentRValue: boolean;

  /**
   * Whether the current element is a parameter delcaration name.
   */
  isParameterName: boolean;

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

interface FormattedId {
  readonly type: DeclarationType;
  readonly formatted: string;
}
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

  private readonly idMap = new Map<ts.Symbol | string, FormattedId>();

  public readonly defaultContext: GoLanguageContext = {
    isExported: false,
    isPtr: false,
    isPtrAssignmentRValue: false,
    isStruct: false,
    isInterface: false,
    isParameterName: false,
    inMapLiteral: false,
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
    const returnType = determineReturnType(renderer.typeChecker, node);
    const goType = this.renderType(node.type ?? node, returnType?.symbol, returnType, true, '', renderer);

    const body = node.body?.statements ? renderer.convertAll(node.body.statements) : [];
    return new OTree(
      [
        'func ',
        funcName,
        '(',
        new OTree([], renderer.updateContext({ isPtr: true }).convertAll(node.parameters), {
          separator: ', ',
        }),
        ')',
        goType ? ' ' : '',
        goType,
      ],
      [
        new OTree(
          [' {'],
          [this.defaultArgValues(node.parameters, renderer.updateContext({ wrapPtr: true })), ...body],
          {
            indent: 1,
            suffix: '\n}',
          },
        ),
      ],
      {
        canBreakLine: true,
      },
    );
  }

  public identifier(node: ts.Identifier | ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, renderer: GoRenderer) {
    const symbol = renderer.typeChecker.getSymbolAtLocation(node);

    // If the identifier corresponds to a renamed imported symbol, we need to use the original symbol name, qualified
    // with the import package name, since Go does not allow generalized symbol aliasing (we *could* alias types, but
    // not static functions or constructors).
    const declaration = symbol?.valueDeclaration ?? symbol?.declarations?.[0];
    if (declaration && ts.isImportSpecifier(declaration)) {
      const importInfo = analyzeImportDeclaration(declaration.parent.parent.parent, renderer);
      const packageName =
        importInfo.moduleSymbol?.sourceAssembly?.packageJson.jsii?.targets?.go?.packageName ??
        this.goName(importInfo.packageName, renderer, undefined);

      const importedSymbol = declaration.propertyName
        ? renderer.typeChecker.getSymbolAtLocation(declaration.propertyName)
        : symbol;
      // Note: imported members are (by nature) always exported by the module they are imported from.
      return new OTree([
        packageName,
        '.',
        this.goName(
          (declaration.propertyName ?? declaration.name).text,
          renderer.updateContext({ isExported: true }),
          importedSymbol,
        ),
      ]);
    }

    return new OTree([this.goName(node.text, renderer, symbol)]);
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
        // Imported names are referred to by the original (i.e: exported) name, qualified with the source module's go
        // package name.
        const symbol = renderer.typeChecker.getSymbolAtLocation(expr);
        const declaration = symbol?.valueDeclaration ?? symbol?.declarations?.[0];
        if (declaration && ts.isImportSpecifier(declaration)) {
          const importInfo = analyzeImportDeclaration(declaration.parent.parent.parent, renderer);
          const packageName =
            importInfo.moduleSymbol?.sourceAssembly?.packageJson.jsii?.targets?.go?.packageName ??
            this.goName(importInfo.packageName, renderer, undefined);

          return {
            classNamespace: new OTree([packageName]),
            className: this.goName(
              (declaration.propertyName ?? declaration.name).text,
              renderer.updateContext({ isExported: true }),
              symbol,
            ),
          };
        }

        return { className: ucFirst(expr.text) };
      }
      if (ts.isPropertyAccessExpression(expr)) {
        if (ts.isIdentifier(expr.expression)) {
          return {
            className: ucFirst(expr.name.text),
            classNamespace: renderer.updateContext({ isExported: false }).convert(expr.expression),
          };
        } else if (
          ts.isPropertyAccessExpression(expr.expression) &&
          renderer.submoduleReferences.has(expr.expression)
        ) {
          const submodule = renderer.submoduleReferences.get(expr.expression)!;
          return {
            className: ucFirst(expr.name.text),
            classNamespace: renderer.updateContext({ isExported: false }).convert(submodule.lastNode),
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

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, renderer: AstRenderer<GoLanguageContext>): OTree {
    const arrayType =
      inferredTypeOfExpression(renderer.typeChecker, node) ?? renderer.typeChecker.getTypeAtLocation(node);
    const [elementType] = renderer.typeChecker.getTypeArguments(arrayType as ts.TypeReference);
    const typeName = elementType
      ? this.renderType(node, elementType.symbol, elementType, true, 'interface{}', renderer)
      : 'interface{}';

    return new OTree(['[]', typeName, '{'], renderer.convertAll(node.elements), {
      separator: ',',
      trailingSeparator: true,
      suffix: '}',
      indent: 1,
    });
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
    const key =
      ts.isStringLiteralLike(node.name) || ts.isIdentifier(node.name)
        ? renderer.currentContext.inMapLiteral
          ? JSON.stringify(node.name.text)
          : this.goName(node.name.text, renderer, renderer.typeChecker.getSymbolAtLocation(node.name))
        : renderer.convert(node.name);
    return new OTree(
      [
        key,
        ': ',
        renderer
          .updateContext({
            // Reset isExported, as this was intended for the key name translation...
            isExported: undefined,
            // Struct member values are always pointers...
            isPtr: renderer.currentContext.isStruct,
            wrapPtr: renderer.currentContext.isStruct || renderer.currentContext.inMapLiteral,
          })
          .convert(node.initializer),
      ],
      [],
      {
        canBreakLine: true,
      },
    );
  }

  public shorthandPropertyAssignment(
    node: ts.ShorthandPropertyAssignment,
    renderer: AstRenderer<GoLanguageContext>,
  ): OTree {
    const key =
      ts.isStringLiteralLike(node.name) || ts.isIdentifier(node.name)
        ? renderer.currentContext.inMapLiteral
          ? JSON.stringify(node.name.text)
          : this.goName(node.name.text, renderer, renderer.typeChecker.getSymbolAtLocation(node.name))
        : renderer.convert(node.name);

    const rawValue = renderer.updateContext({ wrapPtr: true, isStruct: false }).convert(node.name);
    const value = isPointerValue(renderer.typeChecker, node.name)
      ? rawValue
      : wrapPtrExpression(renderer.typeChecker, node.name, rawValue);

    return new OTree([key, ': ', value], [], { canBreakLine: true });
  }

  public templateExpression(node: ts.TemplateExpression, renderer: AstRenderer<GoLanguageContext>): OTree {
    let template = '';
    const parameters = new Array<OTree>();

    if (node.head.rawText) {
      template += node.head.rawText;
    }

    for (const span of node.templateSpans) {
      template += '%v';
      parameters.push(renderer.convert(span.expression));
      if (span.literal.rawText) {
        template += span.literal.rawText;
      }
    }

    if (parameters.length === 0) {
      return new OTree([JSON.stringify(template)]);
    }

    return new OTree(
      ['fmt.Sprintf('],
      [
        JSON.stringify(template),
        ...parameters.reduce((list, element) => list.concat(', ', element), new Array<string | OTree>()),
      ],
      {
        canBreakLine: true,
        suffix: ')',
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
      [`map[string]`, this.renderType(node, valueType?.symbol, valueType, true, `interface{}`, renderer), `{`],
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
    const isExported = structType.kind === 'struct';
    return new OTree(
      [
        '&',
        this.goName(
          structType.type.symbol.name,
          renderer.updateContext({ isExported, isPtr: false }),
          structType.type.symbol,
        ),
        '{',
      ],
      renderer.updateContext({ isExported, isStruct: true }).convertAll(node.properties),
      {
        suffix: '}',
        separator: ',',
        trailingSeparator: true,
        indent: 1,
      },
    );
  }

  public asExpression(node: ts.AsExpression, renderer: AstRenderer<GoLanguageContext>): OTree {
    const jsiiType = determineJsiiType(renderer.typeChecker, renderer.typeChecker.getTypeFromTypeNode(node.type));
    switch (jsiiType.kind) {
      case 'builtIn':
        switch (jsiiType.builtIn) {
          case 'boolean':
            return new OTree(['bool(', renderer.convert(node.expression), ')'], [], { canBreakLine: true });
          case 'number':
            return new OTree(['f64(', renderer.convert(node.expression), ')'], [], { canBreakLine: true });
          case 'string':
            return new OTree(['string(', renderer.convert(node.expression), ')'], [], { canBreakLine: true });
          case 'any':
          case 'void':
            // Just return the value as-is... Everything is compatible with `interface{}`.
            return renderer.convert(node.expression);
        }
        // To make linter understand there is no fall-through here...
        throw new AssertionError({ message: 'unreachable' });
      default:
        return new OTree(
          [renderer.convert(node.expression), '.(', this.renderTypeNode(node.type, false, renderer), ')'],
          [],
          { canBreakLine: true },
        );
    }
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, renderer: GoRenderer): OTree {
    const nodeName = renderer.updateContext({ isParameterName: true, isPtr: false }).convert(node.name);
    const nodeType = node.dotDotDotToken ? (node.type as ts.ArrayTypeNode | undefined)?.elementType : node.type;
    const typeNode = this.renderTypeNode(nodeType, true, renderer);
    return new OTree([...(node.dotDotDotToken ? ['...'] : []), nodeName, ' ', typeNode]);
  }

  public printStatement(args: ts.NodeArray<ts.Expression>, renderer: GoRenderer): OTree {
    const renderedArgs = this.argumentList(args, renderer);
    return new OTree(['fmt.Println(', renderedArgs, ')']);
  }

  public propertyAccessExpression(
    node: ts.PropertyAccessExpression,
    renderer: GoRenderer,
    submoduleReference?: SubmoduleReference,
  ): OTree {
    if (submoduleReference != null) {
      return new OTree([
        renderer
          .updateContext({ isExported: false, isPtr: false, wrapPtr: false })
          .convert(submoduleReference.lastNode),
      ]);
    }

    const expressionType = typeOfExpression(renderer.typeChecker, node.expression);
    const valueSymbol = renderer.typeChecker.getSymbolAtLocation(node.name);

    const isStaticMember = valueSymbol?.valueDeclaration != null && isStatic(valueSymbol.valueDeclaration);
    const isClassStaticPropertyAccess =
      isStaticMember &&
      expressionType?.symbol?.valueDeclaration != null &&
      ts.isClassDeclaration(expressionType.symbol.valueDeclaration) &&
      (ts.isPropertyDeclaration(valueSymbol.valueDeclaration) || ts.isAccessor(valueSymbol.valueDeclaration));
    const isClassStaticMethodAccess =
      isStaticMember && !isClassStaticPropertyAccess && ts.isMethodDeclaration(valueSymbol.valueDeclaration);

    // When the expression has an unknown type (unresolved symbol), and has an upper-case first
    // letter, we assume it's a type name... In such cases, what comes after can be considered a
    // static member access. Note that the expression might be further qualified, so we check using
    // a regex that checks for the last "."-delimited segment if there's dots in there...
    const expressionLooksLikeTypeReference =
      expressionType.symbol == null &&
      /(?:\.|^)[A-Z][^.(]*$/.exec(node.expression.getText(node.expression.getSourceFile())) != null;

    // Whether the node is an enum member reference.
    const isEnumMember =
      expressionType?.symbol?.valueDeclaration != null && ts.isEnumDeclaration(expressionType.symbol.valueDeclaration);

    const jsiiSymbol = lookupJsiiSymbolFromNode(renderer.typeChecker, node.name);
    const isExportedTypeName = jsiiSymbol != null && jsiiSymbol.symbolType !== 'module';

    const delimiter =
      isEnumMember || isClassStaticPropertyAccess || isClassStaticMethodAccess || expressionLooksLikeTypeReference
        ? '_'
        : '.';

    return new OTree([
      renderer.convert(node.expression),
      delimiter,
      renderer
        .updateContext({
          isExported:
            isClassStaticPropertyAccess ||
            isClassStaticMethodAccess ||
            expressionLooksLikeTypeReference ||
            isEnumMember ||
            isExportedTypeName,
        })
        .convert(node.name),
      ...(isClassStaticPropertyAccess
        ? ['()']
        : // If the parent's not a call-like expression, and it's an inferred static property access, we need to put call
        // parentheses at the end, as static properties are accessed via synthetic readers.
        expressionLooksLikeTypeReference && findUp(node, ts.isCallLikeExpression) == null
        ? ['()']
        : []),
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

  public propertyDeclaration(node: ts.PropertyDeclaration, renderer: AstRenderer<GoLanguageContext>): OTree {
    return new OTree(
      [
        renderer
          .updateContext({ isExported: (renderer.currentContext.isExported && isPublic(node)) || isStatic(node) })
          .convert(node.name),
        ' ',
        this.renderTypeNode(node.type, true, renderer),
      ],
      [],
      { canBreakLine: true },
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
        renderer.currentContext.isExported && isPublic(node) ? 'Set' : 'set',
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

  public returnStatement(node: ts.ReturnStatement, renderer: AstRenderer<GoLanguageContext>): OTree {
    return new OTree(['return ', renderer.updateContext({ wrapPtr: true }).convert(node.expression)], [], {
      canBreakLine: true,
    });
  }

  public binaryExpression(node: ts.BinaryExpression, renderer: AstRenderer<GoLanguageContext>): OTree {
    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const symbol = symbolFor(renderer.typeChecker, node.left);
      return new OTree([
        renderer.convert(node.left),
        ' = ',
        renderer
          .updateContext({
            isPtrAssignmentRValue:
              symbol?.valueDeclaration &&
              (ts.isParameter(symbol.valueDeclaration) || ts.isPropertyDeclaration(symbol.valueDeclaration)),
          })
          .convert(node.right),
      ]);
    }

    const output = super.binaryExpression(node, renderer.updateContext({ wrapPtr: false, isPtr: false }));
    if (!renderer.currentContext.wrapPtr) {
      return output;
    }
    return wrapPtrExpression(renderer.typeChecker, node, output);
  }

  public stringLiteral(node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, renderer: GoRenderer): OTree {
    // Go supports backtick-delimited multi-line string literals, similar/same as JavaScript no-substitution templates.
    // We only use this trick if the literal includes actual new line characters (otherwise it just looks weird in go).
    const text =
      ts.isNoSubstitutionTemplateLiteral(node) && /[\n\r]/m.test(node.text)
        ? node.getText(node.getSourceFile())
        : JSON.stringify(node.text);

    return new OTree([`${renderer.currentContext.wrapPtr ? jsiiStr(text) : text}`]);
  }

  public numericLiteral(node: ts.NumericLiteral, renderer: GoRenderer): OTree {
    const text = `${node.text}`;

    return new OTree([`${renderer.currentContext.wrapPtr ? jsiiNum(text) : text}`]);
  }

  public classDeclaration(node: ts.ClassDeclaration, renderer: AstRenderer<GoLanguageContext>): OTree {
    const className = node.name
      ? renderer.updateContext({ isExported: isExported(node) }).convert(node.name)
      : 'anonymous';

    const extendsClause = node.heritageClauses?.find((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword);
    const base = extendsClause && this.renderTypeNode(extendsClause.types[0], false, renderer);

    const properties = node.members
      .filter(ts.isPropertyDeclaration)
      .map((prop) => renderer.updateContext({ isStruct: true, isPtr: true }).convert(prop));

    const struct = new OTree(['type ', className, ' struct {'], [...(base ? ['\n', base] : []), ...properties], {
      canBreakLine: true,
      suffix: properties.length > 0 ? renderer.mirrorNewlineBefore(node.members[0], '}') : '\n}',
      indent: 1,
    });

    const methods = [
      node.members.length > 0
        ? // Ensure there is a blank line between thre struct and the first member, but don't put two if there's already
          // one as part of the first member's leading trivia.
          new OTree(['\n\n'], [], { renderOnce: `ws-${node.members[0].getFullStart()}` })
        : '',
      ...renderer.convertAll(
        node.members.filter((member) => !ts.isPropertyDeclaration(member) || (isExported(node) && !isPrivate(member))),
      ),
    ];

    return new OTree([struct], methods, { canBreakLine: true });
  }

  public structInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: GoRenderer): OTree {
    const bases =
      node.heritageClauses?.flatMap((hc) => hc.types).map((t) => this.renderTypeNode(t, false, renderer)) ?? [];
    return new OTree(
      ['type ', renderer.updateContext({ isStruct: true }).convert(node.name), ' struct {'],
      [...bases, ...renderer.updateContext({ isStruct: true, isPtr: true }).convertAll(node.members)],
      { indent: 1, canBreakLine: true, separator: '\n', trailingSeparator: true, suffix: '}' },
    );
  }

  public regularInterfaceDeclaration(node: ts.InterfaceDeclaration, renderer: AstRenderer<GoLanguageContext>): OTree {
    if (node.members.length === 0) {
      // Erase empty interfaces as they have no bearing in Go
      return new OTree([]);
    }

    const symbol = renderer.typeChecker.getSymbolAtLocation(node.name);
    const name = this.goName(node.name.text, renderer.updateContext({ isExported: isExported(node) }), symbol);
    return new OTree(
      [`type ${name} interface {`],
      renderer.updateContext({ isInterface: true, isExported: isExported(node) }).convertAll(node.members),
      { indent: 1, canBreakLine: true, separator: '\n', trailingSeparator: true, suffix: '}' },
    );
  }

  public constructorDeclaration(node: ts.ConstructorDeclaration, renderer: AstRenderer<GoLanguageContext>): OTree {
    const className = node.parent.name
      ? this.goName(
          node.parent.name.text,
          renderer.updateContext({ isExported: isExported(node.parent) }),
          renderer.typeChecker.getSymbolAtLocation(node.parent.name),
        )
      : 'anonymous';

    const defaultArgValues = this.defaultArgValues(node.parameters, renderer);

    return new OTree(
      [
        'func ',
        isExported(node.parent) ? 'New' : 'new',
        ucFirst(className),
        '(',
        new OTree([], renderer.convertAll(node.parameters), { separator: ', ' }),
        ') *',
        className,
        ' {',
        new OTree([], [defaultArgValues, '\nthis := &', className, '{}'], {
          indent: 1,
        }),
      ],
      node.body ? renderer.convertAll(node.body.statements) : [],
      { canBreakLine: true, suffix: '\n\treturn this\n}', indent: 1 },
    );
  }

  public superCallExpression(node: ts.CallExpression, renderer: AstRenderer<GoLanguageContext>): OTree {
    // We're on a `super` call, so we must be extending a base class.
    const base = findUp(node, ts.isConstructorDeclaration)!.parent.heritageClauses!.find(
      (clause) => clause.token === ts.SyntaxKind.ExtendsKeyword,
    )!.types[0].expression;
    const baseConstructor = ts.isPropertyAccessExpression(base)
      ? new OTree([
          renderer.convert(base.expression),
          '.New',
          ucFirst(this.goName(base.name.text, renderer, renderer.typeChecker.getSymbolAtLocation(base.name))),
        ])
      : ts.isIdentifier(base)
      ? `new${ucFirst(this.goName(base.text, renderer, renderer.typeChecker.getSymbolAtLocation(base)))}`
      : (function () {
          renderer.reportUnsupported(node, TargetLanguage.GO);
          return renderer.convert(base);
        })();

    return new OTree(
      [
        baseConstructor,
        '_Override(this, ',
        this.argumentList(node.arguments, renderer.updateContext({ wrapPtr: true, isPtr: true })),
        ')',
      ],
      [],
      {
        canBreakLine: true,
      },
    );
  }

  public methodDeclaration(node: ts.MethodDeclaration, renderer: AstRenderer<GoLanguageContext>): OTree {
    if (ts.isObjectLiteralExpression(node.parent)) {
      return super.methodDeclaration(node, renderer);
    }

    const className = node.parent.name
      ? this.goName(
          node.parent.name.text,
          renderer.updateContext({ isExported: isExported(node.parent) }),
          renderer.typeChecker.getSymbolAtLocation(node.parent.name),
        )
      : 'anonymous';

    const returnType = determineReturnType(renderer.typeChecker, node);
    const goReturnType =
      returnType && this.renderType(node.type ?? node, returnType.symbol, returnType, true, 'interface{}', renderer);

    return new OTree(
      [
        'func (this *',
        className,
        ') ',
        renderer.updateContext({ isExported: renderer.currentContext.isExported && isPublic(node) }).convert(node.name),
        '(',
        new OTree([], renderer.convertAll(node.parameters), { separator: ', ' }),
        ') ',
        goReturnType,
        goReturnType ? ' ' : '',
        '{',
      ],
      [
        this.defaultArgValues(node.parameters, renderer),
        ...(node.body ? renderer.convertAll(node.body.statements) : []),
      ],
      { canBreakLine: true, suffix: node.body && node.body.statements.length > 0 ? '\n}' : '}', indent: 1 },
    );
  }

  public ifStatement(node: ts.IfStatement, renderer: AstRenderer<GoLanguageContext>): OTree {
    const [ifPrefix, ifSuffix, ifIndent] = ts.isBlock(node.thenStatement) ? [' '] : [' {\n', '\n}', 1];
    const ifStmt = new OTree(
      ['if ', renderer.convert(node.expression)],
      [ifPrefix, renderer.convert(node.thenStatement)],
      {
        canBreakLine: true,
        suffix: ifSuffix,
        indent: ifIndent,
      },
    );
    if (!node.elseStatement) {
      return ifStmt;
    }

    const [elsePrefix, elseSuffix, elseIndent] = ts.isBlock(node.elseStatement) ? [' '] : [' {\n', '\n}', 1];
    const elseStmt = new OTree(['else'], [elsePrefix, renderer.convert(node.elseStatement)], {
      canBreakLine: true,
      suffix: elseSuffix,
      indent: elseIndent,
    });

    return new OTree([], [ifStmt, elseStmt], {
      separator: ' ',
      canBreakLine: true,
    });
  }

  public forOfStatement(node: ts.ForOfStatement, renderer: AstRenderer<GoLanguageContext>): OTree {
    const [prefix, suffix, indent] = ts.isBlock(node.statement) ? [' '] : [' {\n', '\n}', 1];
    return new OTree(
      ['for _, ', nameOf(node.initializer), ' := range ', renderer.convert(node.expression)],
      [prefix, renderer.convert(node.statement)],
      { canBreakLine: true, suffix, indent },
    );

    function nameOf(decl: ts.ForInitializer | ts.Declaration): string | OTree {
      if (ts.isVariableDeclarationList(decl)) {
        if (decl.declarations.length !== 1) {
          renderer.reportUnsupported(decl.declarations[1], TargetLanguage.GO);
        }
        return nameOf(decl.declarations[0]);
      }
      if (ts.isVariableDeclaration(decl)) {
        return decl.name.getText(decl.name.getSourceFile());
      }
      renderer.reportUnsupported(decl, TargetLanguage.GO);
      return renderer.convert(decl);
    }
  }

  public importStatement(node: ImportStatement, renderer: AstRenderer<GoLanguageContext>): OTree {
    const packageName =
      node.moduleSymbol?.sourceAssembly?.packageJson.jsii?.targets?.go?.packageName ??
      node.packageName
        // Special case namespaced npm package names, so they are mangled the same way pacmak does.
        .replace(/@([a-z0-9_-]+)\/([a-z0-9_-])/, '$1$2')
        .split('/')
        .map((txt) => this.goName(txt, renderer, undefined))
        .filter((txt) => txt !== '')
        .join('/');
    const moduleName = node.moduleSymbol?.sourceAssembly?.packageJson.jsii?.targets?.go?.moduleName
      ? `${node.moduleSymbol.sourceAssembly.packageJson.jsii.targets.go.moduleName}/${packageName}`
      : `github.com/aws-samples/dummy/${packageName}`;

    if (node.imports.import === 'full') {
      // We don't emit the alias if it matches the last path segment (conventionally this is the package name)
      const maybeAlias = node.imports.alias ? `${this.goName(node.imports.alias, renderer, undefined)} ` : '';

      return new OTree([`import ${maybeAlias}${JSON.stringify(moduleName)}`], undefined, { canBreakLine: true });
    }

    if (node.imports.elements.length === 0) {
      // This is a blank import (for side-effects only)
      return new OTree([`import _ ${JSON.stringify(moduleName)}`], undefined, { canBreakLine: true });
    }

    return new OTree([`import ${JSON.stringify(moduleName)}`], undefined, { canBreakLine: true });
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

        const name = renderer.updateContext({ isPtr: true }).convert(param.name);
        return [
          ...accum,
          new OTree(
            ['\n', 'if ', name, ' == nil {'],
            ['\n', name, ' = ', renderer.updateContext({ wrapPtr: true }).convert(param.initializer)],
            {
              indent: 1,
              suffix: '\n}',
            },
          ),
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
    return this.renderType(
      typeNode,
      renderer.typeChecker.getTypeFromTypeNode(typeNode).symbol,
      renderer.typeOfType(typeNode),
      isPtr,
      renderer.textOf(typeNode),
      renderer,
    );
  }

  private renderType(
    typeNode: ts.Node,
    typeSymbol: ts.Symbol | undefined,
    type: ts.Type | undefined,
    isPtr: boolean,
    fallback: string,
    renderer: GoRenderer,
  ): string {
    if (type === undefined) {
      return fallback;
    }

    const jsiiType = determineJsiiType(renderer.typeChecker, type);

    const doRender = (jsiiType: JsiiType, isPtr: boolean, typeSymbol: ts.Symbol | undefined): string => {
      const prefix = isPtr ? '*' : '';
      switch (jsiiType.kind) {
        case 'unknown':
          return fallback;
        case 'error':
          renderer.report(typeNode, jsiiType.message);
          return fallback;
        case 'map':
          return `map[string]${doRender(jsiiType.elementType, true, jsiiType.elementTypeSymbol)}`;
        case 'list':
          return `[]${doRender(jsiiType.elementType, true, jsiiType.elementTypeSymbol)}`;
        case 'namedType':
          return this.goName(jsiiType.name, renderer, typeSymbol);
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

    return doRender(jsiiType, isPtr, typeSymbol);
  }

  /**
   * Guess an item's go name based on it's TS name and context
   */
  private goName(input: string, renderer: GoRenderer, symbol: ts.Symbol | undefined) {
    let text = input.replace(/[^a-z0-9_]/gi, '');
    const prev = this.idMap.get(symbol ?? input) ?? this.idMap.get(input);

    if (prev) {
      // If an identifier has been renamed go get it
      text = prev.formatted;
    } else if (renderer.currentContext.isExported && !renderer.currentContext.inMapLiteral) {
      // Uppercase exported and public symbols/members
      text = ucFirst(text);
    } else if (!renderer.currentContext.inMapLiteral) {
      // Lowercase unexported items that are capitalized in TS like structs/interfaces/classes
      text = lcFirst(text);
    }

    text = prefixReserved(text);

    if (text !== input && prev == null) {
      this.idMap.set(symbol ?? input, { formatted: text, type: getDeclarationType(renderer.currentContext) });
    }

    if (
      // Non-pointer references to parameters need to be de-referenced
      (!renderer.currentContext.isPtr &&
        !renderer.currentContext.isParameterName &&
        symbol?.valueDeclaration?.kind === ts.SyntaxKind.Parameter &&
        !renderer.currentContext.isPtrAssignmentRValue) ||
      // Pointer reference to non-interfaces are prefixed with *
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

function wrapPtrExpression(typeChecker: ts.TypeChecker, node: ts.Expression, unwrapped: OTree): OTree {
  const type = typeOfExpression(typeChecker, node);
  const jsiiType = determineJsiiType(typeChecker, type);
  if (jsiiType.kind !== 'builtIn') {
    return unwrapped;
  }
  switch (jsiiType.builtIn) {
    case 'boolean':
      return new OTree(['jsii.Boolean(', unwrapped, ')']);
    case 'number':
      return new OTree(['jsii.Number(', unwrapped, ')']);
    case 'string':
      return new OTree(['jsii.String(', unwrapped, ')']);
    case 'any':
    case 'void':
      return unwrapped;
  }
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

function findUp<T extends ts.Node>(node: ts.Node, predicate: (node: ts.Node) => node is T): T | undefined {
  if (predicate(node)) {
    return node;
  }
  if (node.parent == null) {
    return undefined;
  }
  return findUp(node.parent, predicate);
}

function symbolFor(typeChecker: ts.TypeChecker, node: ts.Node): ts.Symbol | undefined {
  if (ts.isIdentifier(node)) {
    return typeChecker.getSymbolAtLocation(node);
  }
  if (ts.isPropertyAccessExpression(node)) {
    return typeChecker.getSymbolAtLocation(node.name);
  }
  // I don't know 🤷🏻‍♂️
  return undefined;
}

/**
 * Checks whether the provided node corresponds to a pointer-value.
 *
 * NOTE: This currently only checkes for parameter declarations. This is
 * presently used only to determine whether a variable reference needs to be
 * wrapped or not (i.e: "jsii.String(varStr)"), and parameter references are the
 * only "always pointer" values possible in that particular context.
 *
 * @param typeChecker a TypeChecker to use to resolve the node's symbol.
 * @param node        the node to be checked.
 *
 * @returns true if the node corresponds to a pointer-value.
 */
function isPointerValue(typeChecker: ts.TypeChecker, node: ts.Node): boolean {
  const symbol = typeChecker.getSymbolAtLocation(node);
  if (symbol == null) {
    // Can't find symbol, assuming it's a pointer...
    return true;
  }

  const declaration = symbol.valueDeclaration;
  if (declaration == null) {
    // Doesn't have declaration, assuming it's a pointer...
    return true;
  }

  // Now check if this is known pointer kind or not....
  return ts.isParameter(node);
}

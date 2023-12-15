import * as ts from 'typescript';

import { analyzeObjectLiteral, ObjectLiteralStruct } from '../jsii/jsii-types';
import { isNamedLikeStruct, isJsiiProtocolType } from '../jsii/jsii-utils';
import { OTree, NO_SYNTAX } from '../o-tree';
import { AstRenderer, AstHandler, nimpl, CommentSyntax } from '../renderer';
import { SubmoduleReference } from '../submodule-reference';
import { voidExpressionString } from '../typescript/ast-utils';
import { ImportStatement } from '../typescript/imports';
import { inferredTypeOfExpression } from '../typescript/types';

import { TargetLanguage } from '.';

/**
 * A basic visitor that applies for most curly-braces-based languages
 */
export abstract class DefaultVisitor<C> implements AstHandler<C> {
  public abstract readonly defaultContext: C;
  public abstract readonly language: TargetLanguage;

  public abstract mergeContext(old: C, update: C): C;

  protected statementTerminator = ';';

  public commentRange(comment: CommentSyntax, _context: AstRenderer<C>): OTree {
    return new OTree([comment.isTrailing ? ' ' : '', comment.text, comment.hasTrailingNewLine ? '\n' : '']);
  }

  public sourceFile(node: ts.SourceFile, context: AstRenderer<C>): OTree {
    return new OTree(context.convertAll(node.statements));
  }

  public jsDoc(_node: ts.JSDoc, _context: AstRenderer<C>): OTree {
    // Already handled by other doc handlers
    return new OTree([]);
  }

  public importStatement(node: ImportStatement, context: AstRenderer<C>): OTree {
    return this.notImplemented(node.node, context);
  }

  public functionDeclaration(node: ts.FunctionDeclaration, children: AstRenderer<C>): OTree {
    return this.notImplemented(node, children);
  }

  public stringLiteral(node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, _renderer: AstRenderer<C>): OTree {
    return new OTree([JSON.stringify(node.text)]);
  }

  public numericLiteral(node: ts.NumericLiteral, _children: AstRenderer<C>): OTree {
    return new OTree([node.text]);
  }

  public identifier(node: ts.Identifier, _children: AstRenderer<C>): OTree {
    return new OTree([node.text]);
  }

  public block(node: ts.Block, children: AstRenderer<C>): OTree {
    return new OTree(['{'], ['\n', ...children.convertAll(node.statements)], {
      indent: 4,
      suffix: '}',
    });
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, children: AstRenderer<C>): OTree {
    return this.notImplemented(node, children);
  }

  public returnStatement(node: ts.ReturnStatement, children: AstRenderer<C>): OTree {
    return new OTree(['return ', children.convert(node.expression), this.statementTerminator], [], {
      canBreakLine: true,
    });
  }

  public binaryExpression(node: ts.BinaryExpression, context: AstRenderer<C>): OTree {
    const operator = context.textOf(node.operatorToken);
    if (operator === '??') {
      context.reportUnsupported(node.operatorToken, undefined);
    }
    const operatorToken = this.translateBinaryOperator(operator);
    return new OTree([context.convert(node.left), ' ', operatorToken, ' ', context.convert(node.right)]);
  }

  public prefixUnaryExpression(node: ts.PrefixUnaryExpression, context: AstRenderer<C>): OTree {
    return new OTree([this.translateUnaryOperator(node.operator), context.convert(node.operand)]);
  }

  public translateUnaryOperator(operator: ts.PrefixUnaryOperator) {
    return UNARY_OPS[operator];
  }

  public translateBinaryOperator(operator: string) {
    if (operator === '===') {
      return '==';
    }
    return operator;
  }

  public ifStatement(node: ts.IfStatement, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public propertyAccessExpression(
    node: ts.PropertyAccessExpression,
    context: AstRenderer<C>,
    _submoduleReference: SubmoduleReference | undefined,
  ): OTree {
    return new OTree([context.convert(node.expression), '.', context.convert(node.name)]);
  }

  /**
   * Do some work on property accesses to translate common JavaScript-isms to language-specific idioms
   */
  public callExpression(node: ts.CallExpression, context: AstRenderer<C>): OTree {
    const functionText = context.textOf(node.expression);
    if (functionText === 'console.log' || functionText === 'console.error') {
      return this.printStatement(node.arguments, context);
    }
    if (functionText === 'super') {
      return this.superCallExpression(node, context);
    }

    return this.regularCallExpression(node, context);
  }

  public awaitExpression(node: ts.AwaitExpression, context: AstRenderer<C>): OTree {
    return context.convert(node.expression);
  }

  public regularCallExpression(node: ts.CallExpression, context: AstRenderer<C>): OTree {
    return new OTree([context.convert(node.expression), '(', this.argumentList(node.arguments, context), ')']);
  }

  public superCallExpression(node: ts.CallExpression, context: AstRenderer<C>): OTree {
    return this.regularCallExpression(node, context);
  }

  public printStatement(args: ts.NodeArray<ts.Expression>, context: AstRenderer<C>) {
    return new OTree(['<PRINT>', '(', this.argumentList(args, context), ')']);
  }

  public expressionStatement(node: ts.ExpressionStatement, context: AstRenderer<C>): OTree {
    return new OTree([context.convert(node.expression)], [], {
      canBreakLine: true,
    });
  }

  public token<A extends ts.SyntaxKind>(node: ts.Token<A>, context: AstRenderer<C>): OTree {
    return new OTree([context.textOf(node)]);
  }

  /**
   * An object literal can render as one of three things:
   *
   * - Don't know the type (render as an unknown struct)
   * - Know the type:
   *     - It's a struct (render as known struct)
   *     - It's not a struct (render as key-value map)
   */
  public objectLiteralExpression(node: ts.ObjectLiteralExpression, context: AstRenderer<C>): OTree {
    // If any of the elements of the objectLiteralExpression are not a literal property
    // assignment, report them. We can't support those.
    const unsupported = node.properties.filter(
      (p) => !ts.isPropertyAssignment(p) && !ts.isShorthandPropertyAssignment(p),
    );
    for (const unsup of unsupported) {
      context.report(unsup, `Use of ${ts.SyntaxKind[unsup.kind]} in an object literal is not supported.`);
    }

    const anyMembersFunctions = node.properties.some((p) =>
      ts.isPropertyAssignment(p)
        ? isExpressionOfFunctionType(context.typeChecker, p.initializer)
        : ts.isShorthandPropertyAssignment(p)
          ? isExpressionOfFunctionType(context.typeChecker, p.name)
          : false,
    );

    const inferredType = inferredTypeOfExpression(context.typeChecker, node);
    if ((inferredType && isJsiiProtocolType(context.typeChecker, inferredType)) || anyMembersFunctions) {
      context.report(
        node,
        `You cannot use an object literal to make an instance of an interface. Define a class instead.`,
      );
    }

    const lit = analyzeObjectLiteral(context.typeChecker, node);

    switch (lit.kind) {
      case 'unknown':
        return this.unknownTypeObjectLiteralExpression(node, context);
      case 'struct':
      case 'local-struct':
        return this.knownStructObjectLiteralExpression(node, lit, context);
      case 'map':
        return this.keyValueObjectLiteralExpression(node, context);
    }
  }

  public unknownTypeObjectLiteralExpression(node: ts.ObjectLiteralExpression, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public knownStructObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    _structType: ObjectLiteralStruct,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public keyValueObjectLiteralExpression(node: ts.ObjectLiteralExpression, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public newExpression(node: ts.NewExpression, context: AstRenderer<C>): OTree {
    return new OTree(
      ['new ', context.convert(node.expression), '(', this.argumentList(node.arguments, context), ')'],
      [],
      { canBreakLine: true },
    );
  }

  public propertyAssignment(node: ts.PropertyAssignment, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public variableStatement(node: ts.VariableStatement, context: AstRenderer<C>): OTree {
    return new OTree([context.convert(node.declarationList)], [], {
      canBreakLine: true,
    });
  }

  public variableDeclarationList(node: ts.VariableDeclarationList, context: AstRenderer<C>): OTree {
    return new OTree([], context.convertAll(node.declarations));
  }

  public variableDeclaration(node: ts.VariableDeclaration, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, context: AstRenderer<C>): OTree {
    return new OTree(['['], context.convertAll(node.elements), {
      separator: ', ',
      suffix: ']',
    });
  }

  public shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public forOfStatement(node: ts.ForOfStatement, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public classDeclaration(node: ts.ClassDeclaration, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public constructorDeclaration(node: ts.ConstructorDeclaration, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public propertyDeclaration(node: ts.PropertyDeclaration, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public computedPropertyName(node: ts.Expression, context: AstRenderer<C>): OTree {
    return context.convert(node);
  }

  public methodDeclaration(node: ts.MethodDeclaration, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public interfaceDeclaration(node: ts.InterfaceDeclaration, context: AstRenderer<C>): OTree {
    if (isNamedLikeStruct(context.textOf(node.name))) {
      return this.structInterfaceDeclaration(node, context);
    }
    return this.regularInterfaceDeclaration(node, context);
  }

  public structInterfaceDeclaration(node: ts.InterfaceDeclaration, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public regularInterfaceDeclaration(node: ts.InterfaceDeclaration, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public propertySignature(node: ts.PropertySignature, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public methodSignature(node: ts.MethodSignature, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public asExpression(node: ts.AsExpression, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public spreadElement(node: ts.SpreadElement, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public spreadAssignment(node: ts.SpreadAssignment, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public ellipsis(_node: ts.SpreadElement | ts.SpreadAssignment, _context: AstRenderer<C>): OTree {
    return new OTree(['...']);
  }

  public templateExpression(node: ts.TemplateExpression, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public elementAccessExpression(node: ts.ElementAccessExpression, context: AstRenderer<C>): OTree {
    const expression = context.convert(node.expression);
    const index = context.convert(node.argumentExpression);

    return new OTree([expression, '[', index, ']']);
  }

  public nonNullExpression(node: ts.NonNullExpression, context: AstRenderer<C>): OTree {
    // We default we drop the non-null assertion
    return context.convert(node.expression);
  }

  public parenthesizedExpression(node: ts.ParenthesizedExpression, context: AstRenderer<C>): OTree {
    return new OTree(['(', context.convert(node.expression), ')']);
  }

  public maskingVoidExpression(node: ts.VoidExpression, context: AstRenderer<C>): OTree {
    // Don't render anything by default when nodes are masked
    const arg = voidExpressionString(node);
    if (arg === 'block') {
      return this.commentRange(
        {
          pos: context.getPosition(node).start,
          text: '\n// ...',
          kind: ts.SyntaxKind.SingleLineCommentTrivia,
          hasTrailingNewLine: false,
        },
        context,
      );
    }
    if (arg === '...') {
      return new OTree(['...']);
    }
    return NO_SYNTAX;
  }

  protected argumentList(args: readonly ts.Node[] | undefined, context: AstRenderer<C>): OTree {
    return new OTree([], args ? context.convertAll(args) : [], {
      separator: ', ',
    });
  }

  private notImplemented(node: ts.Node, context: AstRenderer<C>) {
    context.reportUnsupported(node, this.language);
    return nimpl(node, context);
  }
}

const UNARY_OPS: { [op in ts.PrefixUnaryOperator]: string } = {
  [ts.SyntaxKind.PlusPlusToken]: '++',
  [ts.SyntaxKind.MinusMinusToken]: '--',
  [ts.SyntaxKind.PlusToken]: '+',
  [ts.SyntaxKind.MinusToken]: '-',
  [ts.SyntaxKind.TildeToken]: '~',
  [ts.SyntaxKind.ExclamationToken]: '!',
};

/**
 * Whether the given expression evaluates to a value that is of type "function"
 *
 * Examples of function types:
 *
 * ```ts
 * // GIVEN
 * function someFunction() { }
 *
 * // THEN
 * const x = someFunction; // <- function type
 * const y = () => 42; // <- function type
 * const z = x; // <- function type
 * Array.isArray; // <- function type
 * ```
 */
function isExpressionOfFunctionType(typeChecker: ts.TypeChecker, expr: ts.Expression) {
  const type = typeChecker.getTypeAtLocation(expr).getNonNullableType();
  return type.getCallSignatures().length > 0;
}

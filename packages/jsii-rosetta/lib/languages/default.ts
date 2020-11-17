import * as ts from 'typescript';

import { isStructInterface, isStructType } from '../jsii/jsii-utils';
import { OTree, NO_SYNTAX } from '../o-tree';
import { AstRenderer, AstHandler, nimpl, CommentSyntax } from '../renderer';
import { voidExpressionString } from '../typescript/ast-utils';
import { ImportStatement } from '../typescript/imports';
import { mapElementType, typeWithoutUndefinedUnion } from '../typescript/types';

import { TargetLanguage } from '.';

/**
 * A basic visitor that applies for most curly-braces-based languages
 */
export abstract class DefaultVisitor<C> implements AstHandler<C> {
  public abstract readonly defaultContext: C;
  public abstract readonly language: TargetLanguage;

  public abstract mergeContext(old: C, update: C): C;

  public commentRange(comment: CommentSyntax, _context: AstRenderer<C>): OTree {
    return new OTree([comment.text, comment.hasTrailingNewLine ? '\n' : '']);
  }

  public sourceFile(node: ts.SourceFile, context: AstRenderer<C>): OTree {
    return new OTree(context.convertAll(node.statements));
  }

  public jsDoc(_node: ts.JSDoc, _context: AstRenderer<C>): OTree {
    // Already handled by other doc handlers
    return new OTree([]);
  }

  public importStatement(
    node: ImportStatement,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node.node, context);
  }

  public functionDeclaration(
    node: ts.FunctionDeclaration,
    children: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, children);
  }

  public stringLiteral(
    node: ts.StringLiteral,
    _children: AstRenderer<C>,
  ): OTree {
    return new OTree([JSON.stringify(node.text)]);
  }

  public noSubstitutionTemplateLiteral(
    node: ts.NoSubstitutionTemplateLiteral,
    _context: AstRenderer<C>,
  ): OTree {
    return new OTree([JSON.stringify(node.text)]);
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

  public parameterDeclaration(
    node: ts.ParameterDeclaration,
    children: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, children);
  }

  public returnStatement(
    node: ts.ReturnStatement,
    children: AstRenderer<C>,
  ): OTree {
    return new OTree(['return ', children.convert(node.expression)]);
  }

  public binaryExpression(
    node: ts.BinaryExpression,
    context: AstRenderer<C>,
  ): OTree {
    return new OTree([
      context.convert(node.left),
      ' ',
      context.textOf(node.operatorToken),
      ' ',
      context.convert(node.right),
    ]);
  }

  public prefixUnaryExpression(
    node: ts.PrefixUnaryExpression,
    context: AstRenderer<C>,
  ): OTree {
    return new OTree([UNARY_OPS[node.operator], context.convert(node.operand)]);
  }

  public ifStatement(node: ts.IfStatement, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public propertyAccessExpression(
    node: ts.PropertyAccessExpression,
    context: AstRenderer<C>,
  ): OTree {
    return new OTree([
      context.convert(node.expression),
      '.',
      context.convert(node.name),
    ]);
  }

  /**
   * Do some work on property accesses to translate common JavaScript-isms to language-specific idioms
   */
  public callExpression(
    node: ts.CallExpression,
    context: AstRenderer<C>,
  ): OTree {
    const functionText = context.textOf(node.expression);
    if (functionText === 'console.log' || functionText === 'console.error') {
      return this.printStatement(node.arguments, context);
    }
    if (functionText === 'super') {
      return this.superCallExpression(node, context);
    }

    return this.regularCallExpression(node, context);
  }

  public regularCallExpression(
    node: ts.CallExpression,
    context: AstRenderer<C>,
  ): OTree {
    return new OTree([
      context.convert(node.expression),
      '(',
      this.argumentList(node.arguments, context),
      ')',
    ]);
  }

  public superCallExpression(
    node: ts.CallExpression,
    context: AstRenderer<C>,
  ): OTree {
    return this.regularCallExpression(node, context);
  }

  public printStatement(
    args: ts.NodeArray<ts.Expression>,
    context: AstRenderer<C>,
  ) {
    return new OTree(['<PRINT>', '(', this.argumentList(args, context), ')']);
  }

  public expressionStatement(
    node: ts.ExpressionStatement,
    context: AstRenderer<C>,
  ): OTree {
    return new OTree([context.convert(node.expression)], [], {
      canBreakLine: true,
    });
  }

  public token<A extends ts.SyntaxKind>(
    node: ts.Token<A>,
    context: AstRenderer<C>,
  ): OTree {
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
  public objectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    context: AstRenderer<C>,
  ): OTree {
    const type = typeWithoutUndefinedUnion(
      context.inferredTypeOfExpression(node),
    );

    const isUnknownType = !type || !type.symbol;
    const isKnownStruct = type && isStructType(type);

    if (isUnknownType) {
      return this.unknownTypeObjectLiteralExpression(node, context);
    }
    if (isKnownStruct) {
      return this.knownStructObjectLiteralExpression(node, type!, context);
    }
    return this.keyValueObjectLiteralExpression(
      node,
      type && mapElementType(type, context),
      context,
    );
  }

  public unknownTypeObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public knownStructObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    _structType: ts.Type,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public keyValueObjectLiteralExpression(
    node: ts.ObjectLiteralExpression,
    _valueType: ts.Type | undefined,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public newExpression(node: ts.NewExpression, context: AstRenderer<C>): OTree {
    return new OTree(
      [
        'new ',
        context.convert(node.expression),
        '(',
        this.argumentList(node.arguments, context),
        ')',
      ],
      [],
      { canBreakLine: true },
    );
  }

  public propertyAssignment(
    node: ts.PropertyAssignment,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public variableStatement(
    node: ts.VariableStatement,
    context: AstRenderer<C>,
  ): OTree {
    return new OTree([context.convert(node.declarationList)], [], {
      canBreakLine: true,
    });
  }

  public variableDeclarationList(
    node: ts.VariableDeclarationList,
    context: AstRenderer<C>,
  ): OTree {
    return new OTree([], context.convertAll(node.declarations));
  }

  public variableDeclaration(
    node: ts.VariableDeclaration,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public arrayLiteralExpression(
    node: ts.ArrayLiteralExpression,
    context: AstRenderer<C>,
  ): OTree {
    return new OTree(['['], context.convertAll(node.elements), {
      separator: ', ',
      suffix: ']',
    });
  }

  public shorthandPropertyAssignment(
    node: ts.ShorthandPropertyAssignment,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public forOfStatement(
    node: ts.ForOfStatement,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public classDeclaration(
    node: ts.ClassDeclaration,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public constructorDeclaration(
    node: ts.ConstructorDeclaration,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public propertyDeclaration(
    node: ts.PropertyDeclaration,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public computedPropertyName(
    node: ts.Expression,
    context: AstRenderer<C>,
  ): OTree {
    return context.convert(node);
  }

  public methodDeclaration(
    node: ts.MethodDeclaration,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public interfaceDeclaration(
    node: ts.InterfaceDeclaration,
    context: AstRenderer<C>,
  ): OTree {
    if (isStructInterface(context.textOf(node.name))) {
      return this.structInterfaceDeclaration(node, context);
    }
    return this.regularInterfaceDeclaration(node, context);
  }

  public structInterfaceDeclaration(
    node: ts.InterfaceDeclaration,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public regularInterfaceDeclaration(
    node: ts.InterfaceDeclaration,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public propertySignature(
    node: ts.PropertySignature,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public methodSignature(
    node: ts.MethodSignature,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public asExpression(node: ts.AsExpression, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public spreadElement(node: ts.SpreadElement, context: AstRenderer<C>): OTree {
    return this.notImplemented(node, context);
  }

  public spreadAssignment(
    node: ts.SpreadAssignment,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public ellipsis(
    _node: ts.SpreadElement | ts.SpreadAssignment,
    _context: AstRenderer<C>,
  ): OTree {
    return new OTree(['...']);
  }

  public templateExpression(
    node: ts.TemplateExpression,
    context: AstRenderer<C>,
  ): OTree {
    return this.notImplemented(node, context);
  }

  public nonNullExpression(
    node: ts.NonNullExpression,
    context: AstRenderer<C>,
  ): OTree {
    // We default we drop the non-null assertion
    return context.convert(node.expression);
  }

  public parenthesizedExpression(
    node: ts.ParenthesizedExpression,
    context: AstRenderer<C>,
  ): OTree {
    return new OTree(['(', context.convert(node.expression), ')']);
  }

  public maskingVoidExpression(
    node: ts.VoidExpression,
    context: AstRenderer<C>,
  ): OTree {
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

  protected argumentList(
    args: readonly ts.Node[] | undefined,
    context: AstRenderer<C>,
  ): OTree {
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
  [ts.SyntaxKind.ExclamationToken]: '~',
};

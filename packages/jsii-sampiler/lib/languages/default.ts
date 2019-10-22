import ts = require('typescript');
import { AstConverter, AstHandler, nimpl } from "../converter";
import { OTree } from '../o-tree';
import { ImportStatement } from '../typescript/imports';

/**
 * A basic visitor that applies for most curly-braces-based languages
 */
export abstract class DefaultVisitor<C> implements AstHandler<C> {
  public abstract readonly defaultContext: C;

  public abstract mergeContext(old: C, update: C): C;

  public commentRange(node: ts.CommentRange, context: AstConverter<C>): OTree {
    return new OTree([
      context.textAt(node.pos, node.end),
      node.hasTrailingNewLine ? '\n' : ''
    ]);
  }

  public sourceFile(node: ts.SourceFile, context: AstConverter<C>): OTree {
    return new OTree(context.convertAll(node.statements));
  }

  public jsDoc(_node: ts.JSDoc, _context: AstConverter<C>): OTree {
    // Already handled by other doc handlers
    return new OTree([]);
  }

  public importStatement(node: ImportStatement, context: AstConverter<C>): OTree {
    return this.notImplemented(node.node, context);
  }

  public functionDeclaration(node: ts.FunctionDeclaration, children: AstConverter<C>): OTree {
    return this.notImplemented(node, children);
  }

  public stringLiteral(node: ts.StringLiteral, _children: AstConverter<C>): OTree {
    return new OTree([JSON.stringify(node.text)]);
  }

  public noSubstitutionTemplateLiteral(node: ts.NoSubstitutionTemplateLiteral, _context: AstConverter<C>): OTree {
    return new OTree([JSON.stringify(node.text)]);
  }

  public identifier(node: ts.Identifier, _children: AstConverter<C>): OTree {
    return new OTree([node.text]);
  }

  public block(node: ts.Block, children: AstConverter<C>): OTree {
    return new OTree(['{'], ['\n', ...children.convertAll(node.statements)], {
      indent: 4,
      suffix: '}',
    });
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, children: AstConverter<C>): OTree {
    return this.notImplemented(node, children);
  }

  public returnStatement(node: ts.ReturnStatement, children: AstConverter<C>): OTree {
    return new OTree(['return ', children.convert(node.expression)]);
  }

  public binaryExpression(node: ts.BinaryExpression, context: AstConverter<C>): OTree {
    return new OTree([
      context.convert(node.left),
      ' ',
      context.textOf(node.operatorToken),
      ' ',
      context.convert(node.right)
    ]);
  }

  public prefixUnaryExpression(node: ts.PrefixUnaryExpression, context: AstConverter<C>): OTree {

    return new OTree([
      UNARY_OPS[node.operator],
      context.convert(node.operand)
    ]);
  }

  public ifStatement(node: ts.IfStatement, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, context: AstConverter<C>): OTree {
    return new OTree([context.convert(node.expression), '.', context.convert(node.name)]);
  }

  public callExpression(node: ts.CallExpression, context: AstConverter<C>): OTree {
    return new OTree([
      context.convert(node.expression),
      '(',
      new OTree([], context.convertAll(node.arguments), { separator: ', ' }),
      ')']);
  }

  public expressionStatement(node: ts.ExpressionStatement, context: AstConverter<C>): OTree {
    return new OTree([context.convert(node.expression)], [], { canBreakLine: true });
  }

  public token<A extends ts.SyntaxKind>(node: ts.Token<A>, context: AstConverter<C>): OTree {
    return new OTree([context.textOf(node)]);
  }

  public objectLiteralExpression(node: ts.ObjectLiteralExpression, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public newExpression(node: ts.NewExpression, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public propertyAssignment(node: ts.PropertyAssignment, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public variableStatement(node: ts.VariableStatement, context: AstConverter<C>): OTree {
    return new OTree([context.convert(node.declarationList)], [], { canBreakLine: true });
  }

  public variableDeclarationList(node: ts.VariableDeclarationList, context: AstConverter<C>): OTree {
    return new OTree([], context.convertAll(node.declarations));
  }

  public variableDeclaration(node: ts.VariableDeclaration, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, context: AstConverter<C>): OTree {
    return new OTree(['['], context.convertAll(node.elements), {
      separator: ', ',
      suffix: ']',
    });
  }

  public shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public forOfStatement(node: ts.ForOfStatement, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public classDeclaration(node: ts.ClassDeclaration, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public constructorDeclaration(node: ts.ConstructorDeclaration, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public propertyDeclaration(node: ts.PropertyDeclaration, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public methodDeclaration(node: ts.MethodDeclaration, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public interfaceDeclaration(node: ts.InterfaceDeclaration, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public propertySignature(node: ts.PropertySignature, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public asExpression(node: ts.AsExpression, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public spreadElement(node: ts.SpreadElement, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public spreadAssignment(node: ts.SpreadAssignment, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public ellipsis(_node: ts.SpreadElement | ts.SpreadAssignment, _context: AstConverter<C>): OTree {
    return new OTree(['...']);
  }

  public templateExpression(node: ts.TemplateExpression, context: AstConverter<C>): OTree {
    return this.notImplemented(node, context);
  }

  public nonNullExpression(node: ts.NonNullExpression, context: AstConverter<C>): OTree {
    // We default we drop the non-null assertion
    return context.convert(node.expression);
  }

  public parenthesizedExpression(node: ts.ParenthesizedExpression, context: AstConverter<C>): OTree {
    return new OTree(['(', context.convert(node.expression), ')']);
  }

  public maskingVoidExpression(_node: ts.VoidExpression, _context: AstConverter<C>): OTree {
    // Don't render anything by default when nodes are masked
    return new OTree([]);
  }

  private notImplemented(node: ts.Node, context: AstConverter<C>) {
    context.reportUnsupported(node);
    return nimpl(node, context);
  }
}

const UNARY_OPS: {[op in ts.PrefixUnaryOperator]: string} = {
  [ts.SyntaxKind.PlusPlusToken]: '++',
  [ts.SyntaxKind.MinusMinusToken]: '--',
  [ts.SyntaxKind.PlusToken]: '+',
  [ts.SyntaxKind.MinusToken]: '-',
  [ts.SyntaxKind.TildeToken]: '~',
  [ts.SyntaxKind.ExclamationToken]: '~',
};

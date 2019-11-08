import ts = require('typescript');
import { AstConverter, AstHandler, nimpl } from "../converter";
import { OTree } from '../o-tree';
import { ImportStatement } from '../typescript/imports';

export class VisualizeAstVisitor implements AstHandler<void> {
  public readonly defaultContext: void = undefined;

  constructor(private readonly includeHandlerNames?: boolean) {
  }

  public mergeContext(_old: void, _update: void): void {
    return undefined;
  }

  public commentRange(node: ts.CommentRange, context: AstConverter<void>): OTree {
    return new OTree(['(Comment', context.textAt(node.pos, node.end)], [], { suffix: ')' });
  }

  public jsDoc(_node: ts.JSDoc, _context: AstConverter<void>): OTree {
    // Already handled by other doc handlers
    return new OTree([]);
  }

  public sourceFile(node: ts.SourceFile, context: AstConverter<void>): OTree {
    return new OTree(context.convertAll(node.statements));
  }

  public importStatement(node: ImportStatement, context: AstConverter<void>): OTree {
    return this.defaultNode('importStatement', node.node, context);
  }

  public functionDeclaration(node: ts.FunctionDeclaration, children: AstConverter<void>): OTree {
    return this.defaultNode('functionDeclaration', node, children);
  }

  public stringLiteral(node: ts.StringLiteral, children: AstConverter<void>): OTree {
    return this.defaultNode('stringLiteral', node, children);
  }

  public identifier(node: ts.Identifier, children: AstConverter<void>): OTree {
    return this.defaultNode('identifier', node, children);
  }

  public block(node: ts.Block, children: AstConverter<void>): OTree {
    return this.defaultNode('block', node, children);
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, children: AstConverter<void>): OTree {
    return this.defaultNode('parameterDeclaration', node, children);
  }

  public returnStatement(node: ts.ReturnStatement, children: AstConverter<void>): OTree {
    return this.defaultNode('returnStatement', node, children);
  }

  public binaryExpression(node: ts.BinaryExpression, children: AstConverter<void>): OTree {
    return this.defaultNode('binaryExpression', node, children);
  }

  public ifStatement(node: ts.IfStatement, context: AstConverter<void>): OTree {
    return this.defaultNode('ifStatement', node, context);
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('propertyAccessExpression', node, context);
  }

  public callExpression(node: ts.CallExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('callExpression', node, context);
  }

  public expressionStatement(node: ts.ExpressionStatement, context: AstConverter<void>): OTree {
    return this.defaultNode('expressionStatement', node, context);
  }

  public token<A extends ts.SyntaxKind>(node: ts.Token<A>, context: AstConverter<void>): OTree {
    return this.defaultNode('token', node, context);
  }

  public objectLiteralExpression(node: ts.ObjectLiteralExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('objectLiteralExpression', node, context);
  }

  public newExpression(node: ts.NewExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('newExpression', node, context);
  }

  public propertyAssignment(node: ts.PropertyAssignment, context: AstConverter<void>): OTree {
    return this.defaultNode('propertyAssignment', node, context);
  }

  public variableStatement(node: ts.VariableStatement, context: AstConverter<void>): OTree {
    return this.defaultNode('variableStatement', node, context);
  }

  public variableDeclarationList(node: ts.VariableDeclarationList, context: AstConverter<void>): OTree {
    return this.defaultNode('variableDeclarationList', node, context);
  }

  public variableDeclaration(node: ts.VariableDeclaration, context: AstConverter<void>): OTree {
    return this.defaultNode('variableDeclaration', node, context);
  }

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('arrayLiteralExpression', node, context);
  }

  public shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, context: AstConverter<void>): OTree {
    return this.defaultNode('shorthandPropertyAssignment', node, context);
  }

  public forOfStatement(node: ts.ForOfStatement, context: AstConverter<void>): OTree {
    return this.defaultNode('forOfStatement', node, context);
  }

  public classDeclaration(node: ts.ClassDeclaration, context: AstConverter<void>): OTree {
    return this.defaultNode('classDeclaration', node, context);
  }

  public constructorDeclaration(node: ts.ConstructorDeclaration, context: AstConverter<void>): OTree {
    return this.defaultNode('constructorDeclaration', node, context);
  }

  public propertyDeclaration(node: ts.PropertyDeclaration, context: AstConverter<void>): OTree {
    return this.defaultNode('propertyDeclaration', node, context);
  }

  public methodDeclaration(node: ts.MethodDeclaration, context: AstConverter<void>): OTree {
    return this.defaultNode('methodDeclaration', node, context);
  }

  public interfaceDeclaration(node: ts.InterfaceDeclaration, context: AstConverter<void>): OTree {
    return this.defaultNode('interfaceDeclaration', node, context);
  }

  public propertySignature(node: ts.PropertySignature, context: AstConverter<void>): OTree {
    return this.defaultNode('propertySignature', node, context);
  }

  public asExpression(node: ts.AsExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('asExpression', node, context);
  }

  public prefixUnaryExpression(node: ts.PrefixUnaryExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('prefixUnaryExpression', node, context);
  }

  public spreadElement(node: ts.SpreadElement, context: AstConverter<void>): OTree {
    return this.defaultNode('spreadElement', node, context);
  }

  public spreadAssignment(node: ts.SpreadAssignment, context: AstConverter<void>): OTree {
    return this.defaultNode('spreadAssignment', node, context);
  }

  public ellipsis(node: ts.SpreadAssignment | ts.SpreadElement, context: AstConverter<void>): OTree {
    return this.defaultNode('ellipsis', node, context);
  }

  public templateExpression(node: ts.TemplateExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('templateExpression', node, context);
  }

  public nonNullExpression(node: ts.NonNullExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('nonNullExpression', node, context);
  }

  public parenthesizedExpression(node: ts.ParenthesizedExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('parenthesizedExpression', node, context);
  }

  public maskingVoidExpression(node: ts.VoidExpression, context: AstConverter<void>): OTree {
    return this.defaultNode('maskingVoidExpression', node, context);
  }

  public noSubstitutionTemplateLiteral(node: ts.NoSubstitutionTemplateLiteral, context: AstConverter<void>): OTree {
    return this.defaultNode('noSubstitutionTemplateLiteral', node, context);
  }

  private defaultNode(handlerName: string, node: ts.Node, context: AstConverter<void>): OTree {
    return nimpl(node, context, {
      additionalInfo: this.includeHandlerNames ? handlerName : ''
    });
  }
}
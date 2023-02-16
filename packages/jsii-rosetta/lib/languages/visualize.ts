import * as ts from 'typescript';

import { OTree } from '../o-tree';
import { AstRenderer, AstHandler, nimpl, CommentSyntax } from '../renderer';
import { ImportStatement } from '../typescript/imports';
import { TargetLanguage } from './target-language';

export class VisualizeAstVisitor implements AstHandler<void> {
  public readonly language = TargetLanguage.VISUALIZE;
  public readonly defaultContext: void = undefined;

  public constructor(private readonly includeHandlerNames?: boolean) {}

  public mergeContext(_old: any, _update: any): any {
    return undefined;
  }

  public commentRange(node: CommentSyntax, _context: AstRenderer<void>): OTree {
    return new OTree(['(Comment', node.text], [], { suffix: ')' });
  }

  public jsDoc(_node: ts.JSDoc, _context: AstRenderer<void>): OTree {
    // Already handled by other doc handlers
    return new OTree([]);
  }

  public sourceFile(node: ts.SourceFile, context: AstRenderer<void>): OTree {
    return new OTree(context.convertAll(node.statements));
  }

  public importStatement(node: ImportStatement, context: AstRenderer<void>): OTree {
    return this.defaultNode('importStatement', node.node, context);
  }

  public functionDeclaration(node: ts.FunctionDeclaration, children: AstRenderer<void>): OTree {
    return this.defaultNode('functionDeclaration', node, children);
  }

  public stringLiteral(node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, children: AstRenderer<void>): OTree {
    return this.defaultNode('stringLiteral', node, children);
  }

  public numericLiteral(node: ts.NumericLiteral, children: AstRenderer<void>): OTree {
    return this.defaultNode('numericLiteral', node, children);
  }

  public identifier(node: ts.Identifier, children: AstRenderer<void>): OTree {
    return this.defaultNode('identifier', node, children);
  }

  public block(node: ts.Block, children: AstRenderer<void>): OTree {
    return this.defaultNode('block', node, children);
  }

  public parameterDeclaration(node: ts.ParameterDeclaration, children: AstRenderer<void>): OTree {
    return this.defaultNode('parameterDeclaration', node, children);
  }

  public returnStatement(node: ts.ReturnStatement, children: AstRenderer<void>): OTree {
    return this.defaultNode('returnStatement', node, children);
  }

  public binaryExpression(node: ts.BinaryExpression, children: AstRenderer<void>): OTree {
    return this.defaultNode('binaryExpression', node, children);
  }

  public ifStatement(node: ts.IfStatement, context: AstRenderer<void>): OTree {
    return this.defaultNode('ifStatement', node, context);
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('propertyAccessExpression', node, context);
  }

  public callExpression(node: ts.CallExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('callExpression', node, context);
  }

  public expressionStatement(node: ts.ExpressionStatement, context: AstRenderer<void>): OTree {
    return this.defaultNode('expressionStatement', node, context);
  }

  public token<A extends ts.SyntaxKind>(node: ts.Token<A>, context: AstRenderer<void>): OTree {
    return this.defaultNode('token', node, context);
  }

  public objectLiteralExpression(node: ts.ObjectLiteralExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('objectLiteralExpression', node, context);
  }

  public newExpression(node: ts.NewExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('newExpression', node, context);
  }

  public awaitExpression(node: ts.AwaitExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('await', node, context);
  }

  public propertyAssignment(node: ts.PropertyAssignment, context: AstRenderer<void>): OTree {
    return this.defaultNode('propertyAssignment', node, context);
  }

  public variableStatement(node: ts.VariableStatement, context: AstRenderer<void>): OTree {
    return this.defaultNode('variableStatement', node, context);
  }

  public variableDeclarationList(node: ts.VariableDeclarationList, context: AstRenderer<void>): OTree {
    return this.defaultNode('variableDeclarationList', node, context);
  }

  public variableDeclaration(node: ts.VariableDeclaration, context: AstRenderer<void>): OTree {
    return this.defaultNode('variableDeclaration', node, context);
  }

  public arrayLiteralExpression(node: ts.ArrayLiteralExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('arrayLiteralExpression', node, context);
  }

  public shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, context: AstRenderer<void>): OTree {
    return this.defaultNode('shorthandPropertyAssignment', node, context);
  }

  public forOfStatement(node: ts.ForOfStatement, context: AstRenderer<void>): OTree {
    return this.defaultNode('forOfStatement', node, context);
  }

  public classDeclaration(node: ts.ClassDeclaration, context: AstRenderer<void>): OTree {
    return this.defaultNode('classDeclaration', node, context);
  }

  public constructorDeclaration(node: ts.ConstructorDeclaration, context: AstRenderer<void>): OTree {
    return this.defaultNode('constructorDeclaration', node, context);
  }

  public propertyDeclaration(node: ts.PropertyDeclaration, context: AstRenderer<void>): OTree {
    return this.defaultNode('propertyDeclaration', node, context);
  }

  public computedPropertyName(node: ts.Expression, context: AstRenderer<void>): OTree {
    return this.defaultNode('computedPropertyName', node, context);
  }

  public methodDeclaration(node: ts.MethodDeclaration, context: AstRenderer<void>): OTree {
    return this.defaultNode('methodDeclaration', node, context);
  }

  public interfaceDeclaration(node: ts.InterfaceDeclaration, context: AstRenderer<void>): OTree {
    return this.defaultNode('interfaceDeclaration', node, context);
  }

  public propertySignature(node: ts.PropertySignature, context: AstRenderer<void>): OTree {
    return this.defaultNode('propertySignature', node, context);
  }

  public methodSignature(node: ts.MethodSignature, context: AstRenderer<void>): OTree {
    return this.defaultNode('methodSignature', node, context);
  }

  public asExpression(node: ts.AsExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('asExpression', node, context);
  }

  public prefixUnaryExpression(node: ts.PrefixUnaryExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('prefixUnaryExpression', node, context);
  }

  public spreadElement(node: ts.SpreadElement, context: AstRenderer<void>): OTree {
    return this.defaultNode('spreadElement', node, context);
  }

  public spreadAssignment(node: ts.SpreadAssignment, context: AstRenderer<void>): OTree {
    return this.defaultNode('spreadAssignment', node, context);
  }

  public ellipsis(node: ts.SpreadAssignment | ts.SpreadElement, context: AstRenderer<void>): OTree {
    return this.defaultNode('ellipsis', node, context);
  }

  public templateExpression(node: ts.TemplateExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('templateExpression', node, context);
  }

  public elementAccessExpression(node: ts.ElementAccessExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('elementAccessExpression', node, context);
  }

  public nonNullExpression(node: ts.NonNullExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('nonNullExpression', node, context);
  }

  public parenthesizedExpression(node: ts.ParenthesizedExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('parenthesizedExpression', node, context);
  }

  public maskingVoidExpression(node: ts.VoidExpression, context: AstRenderer<void>): OTree {
    return this.defaultNode('maskingVoidExpression', node, context);
  }

  private defaultNode(handlerName: string, node: ts.Node, context: AstRenderer<void>): OTree {
    return nimpl(node, context, {
      additionalInfo: this.includeHandlerNames ? handlerName : '',
    });
  }
}

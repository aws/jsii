using System;
using System.Collections.Generic;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.Interface
{
    public class InterfaceProxyMethodGenerator : MethodGeneratorBase<InterfaceType>
    {
        public InterfaceProxyMethodGenerator(InterfaceType type, Method method, ISymbolMap symbols, INamespaceSet namespaces)
            : base(type, method, symbols, namespaces)
        {
            if (!method.IsAbstract)
            {
                throw new ArgumentException("Interface methods must be abstract", nameof(method));
            }

            if (method.IsProtected)
            {
                throw new ArgumentException("Protected methods are not allowed on interfaces", nameof(method));
            }

            if (method.IsStatic)
            {
                throw new ArgumentException(
                    $"Method {type.Name}.{method.Name} is marked as static, but interfaces must not contain static members.",
                    nameof(method)
                );
            }
        }

        protected override IEnumerable<SyntaxKind> GetModifierKeywords()
        {
            yield return SyntaxKind.PublicKeyword;
        }

        protected override BlockSyntax GetBody()
        {
            if (Method.Returns == null)
            {
                return SF.Block(SF.ExpressionStatement(CreateInvocationExpression()));
            }

            return SF.Block(SF.ReturnStatement(CreateInvocationExpression()));
        }

        protected override bool HasSemicolon => false;
    }
}

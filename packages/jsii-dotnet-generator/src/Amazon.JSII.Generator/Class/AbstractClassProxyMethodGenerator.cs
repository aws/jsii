using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.Class
{
    public class AbstractClassProxyMethodGenerator : ClassMethodGenerator
    {
        public AbstractClassProxyMethodGenerator(ClassType type, Method method, ISymbolMap symbols,
            INamespaceSet namespaces) : base(type, method, symbols, namespaces)
        {
        }

        protected override IEnumerable<SyntaxKind> GetModifierKeywords()
        {
            yield return Method.IsProtected ? SyntaxKind.ProtectedKeyword : SyntaxKind.PublicKeyword;
            
            // Type is the abstract class, so we need to check it as well as ancestors.
            if (IsDefinedOnAncestor || Type.Methods.Any(m => m.Name == Method.Name))
            {
                yield return SyntaxKind.OverrideKeyword;
            }
            else
            {
                yield return SyntaxKind.VirtualKeyword;
            }
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
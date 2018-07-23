using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace AWS.Jsii.Generator.Class
{
    public class ClassMethodGenerator : MethodGeneratorBase<ClassType>
    {
        public ClassMethodGenerator(ClassType type, Method method, ISymbolMap symbols, INamespaceSet namespaces)
            : base(type, method, symbols, namespaces)
        {
        }

        bool IsDefinedOnAncestor
        {
            get
            {
                string[] objectMethods = new[]
                {
                    "ToString",
                    "GetHashCode",
                    "Equals",
                };

                if (objectMethods.Contains(NameUtils.ConvertMethodName(Method.Name)))
                {
                    return true;
                }

                return Type.AnyAncestor(Symbols, t => t.Methods?.Any(m => m.Name == Method.Name) == true);
            }
        }

        protected override IEnumerable<SyntaxKind> GetModifierKeywords()
        {
            yield return Method.IsProtected ? SyntaxKind.ProtectedKeyword : SyntaxKind.PublicKeyword;

            if (Method.IsStatic == true)
            {
                yield return SyntaxKind.StaticKeyword;
                yield break;
            }

            if (Method.IsAbstract)
            {
                if (IsDefinedOnAncestor)
                {
                    yield return SyntaxKind.OverrideKeyword;
                }

                yield return SyntaxKind.AbstractKeyword;
            }
            else
            {
                // All Jsii methods are implicitly virtual.
                yield return IsDefinedOnAncestor ? SyntaxKind.OverrideKeyword : SyntaxKind.VirtualKeyword;
            }
        }

        protected override BlockSyntax GetBody()
        {
            if (Method.IsAbstract)
            {
                return null;
            }

            if (Method.Returns == null)
            {
                return SF.Block(SF.ExpressionStatement(CreateInvocationExpression()));
            }

            return SF.Block(SF.ReturnStatement(CreateInvocationExpression()));
        }

        protected override bool HasSemicolon => Method.IsAbstract;
    }
}

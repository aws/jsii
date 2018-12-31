using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.Class
{
    public class ClassPropertyGenerator : PropertyGeneratorBase<ClassType>
    {
        public ClassPropertyGenerator(ClassType type, Property property, ISymbolMap symbols, INamespaceSet namespaces)
            : base(type, property, symbols, namespaces)
        {
        }

        protected bool IsDefinedOnAncestor => Type.AnyAncestor(Symbols, t => t.Properties?.Any(p => p.Name == Property.Name) == true);

        protected override IEnumerable<SyntaxKind> GetModifierKeywords()
        {
            yield return Property.IsProtected == true ? SyntaxKind.ProtectedKeyword : SyntaxKind.PublicKeyword;

            if (Property.IsStatic())
            {
                yield return SyntaxKind.StaticKeyword;
                yield break;
            }

            yield return IsDefinedOnAncestor ? SyntaxKind.OverrideKeyword : SyntaxKind.VirtualKeyword;
        }

        protected override SyntaxToken GetIdentifier()
        {
            return Symbols.GetNameSyntaxToken(Type, Property);
        }

        protected override IEnumerable<AccessorDeclarationSyntax> GetAccessors()
        {
            if (Property.IsConstant == true)
            {
                yield return SF.AccessorDeclaration(
                    SyntaxKind.GetAccessorDeclaration,
                    SF.List<AttributeListSyntax>(),
                    SF.TokenList(),
                    SF.Token(SyntaxKind.GetKeyword),
                    null,
                    null,
                    SF.Token(SyntaxKind.SemicolonToken)
                );
            }
            else
            {
                yield return SF.AccessorDeclaration(
                    SyntaxKind.GetAccessorDeclaration,
                    SF.List<AttributeListSyntax>(),
                    SF.TokenList(),
                    SF.ParseToken("get"),
                    null,
                    SF.ArrowExpressionClause
                    (
                        SF.ParseToken("=>"),
                        CreateGetPropertyInvocationExpression()
                    ),
                    SF.ParseToken(";")
                );
            }

            if (!Property.IsImmutable())
            {
                yield return SF.AccessorDeclaration(
                    SyntaxKind.SetAccessorDeclaration,
                    SF.List<AttributeListSyntax>(),
                    SF.TokenList(),
                    SF.ParseToken("set"),
                    null,
                    SF.ArrowExpressionClause
                    (
                        SF.ParseToken("=>"),
                        CreateSetPropertyInvocationExpression()
                    ),
                    SF.ParseToken(";")
                );
            }
        }
    }
}

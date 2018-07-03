using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace AWS.Jsii.Generator.Class
{
    public class ClassPropertyGenerator : PropertyGeneratorBase<ClassType>
    {
        public ClassPropertyGenerator(ClassType type, Property property, ISymbolMap symbols, INamespaceSet namespaces)
            : base(type, property, symbols, namespaces)
        {
        }

        bool IsDefinedOnAncestor => Type.AnyAncestor(Symbols, t => t.Properties?.Any(p => p.Name == Property.Name) == true);

        protected override IEnumerable<SyntaxKind> GetModifierKeywords()
        {
            yield return Property.IsProtected == true ? SyntaxKind.ProtectedKeyword : SyntaxKind.PublicKeyword;
            yield return IsDefinedOnAncestor ? SyntaxKind.OverrideKeyword : SyntaxKind.VirtualKeyword;
        }

        protected override SyntaxToken GetIdentifier()
        {
            return Symbols.GetNameSyntaxToken(Type, Property);
        }

        protected override IEnumerable<AccessorDeclarationSyntax> GetAccessors()
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
                    GetGetPropertyInvocation()
                ),
                SF.ParseToken(";")
            );

            if (Property.IsImmutable != true)
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
                        GetSetPropertyInvocation()
                    ),
                    SF.ParseToken(";")
                );
            }
        }
    }
}

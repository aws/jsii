using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace AWS.Jsii.Generator.Interface
{
    public class InterfaceDefaultPropertyGenerator : PropertyGeneratorBase<InterfaceType>
    {
        public InterfaceDefaultPropertyGenerator(InterfaceType type, Property property, ISymbolMap symbols, INamespaceSet namespaces)
            : base(type, property, symbols, namespaces)
        {
        }

        protected override IEnumerable<SyntaxKind> GetModifierKeywords()
        {
            yield return Property.IsProtected == true ? SyntaxKind.ProtectedKeyword : SyntaxKind.PublicKeyword;
        }

        protected override SyntaxToken GetIdentifier()
        {
            return Symbols.GetNameSyntaxToken(Type, Property);
        }

        protected override bool IsOverride => true;

        protected override IEnumerable<AccessorDeclarationSyntax> GetAccessors()
        {
            yield return SF.AccessorDeclaration(
                SyntaxKind.GetAccessorDeclaration,
                SF.List<AttributeListSyntax>(),
                SF.TokenList(),
                SF.ParseToken("get"),
                (BlockSyntax)null,
                SF.ParseToken(";")
            );

            if (Property.IsImmutable != true)
            {
                yield return SF.AccessorDeclaration(
                   SyntaxKind.SetAccessorDeclaration,
                   SF.List<AttributeListSyntax>(),
                   SF.TokenList(),
                   SF.ParseToken("set"),
                   (BlockSyntax)null,
                   SF.ParseToken(";")
               );
            }
        }
    }
}

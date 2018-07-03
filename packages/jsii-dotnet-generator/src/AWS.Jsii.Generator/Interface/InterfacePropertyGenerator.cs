using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace AWS.Jsii.Generator.Interface
{
    public class InterfacePropertyGenerator : PropertyGeneratorBase<InterfaceType>
    {
        public InterfacePropertyGenerator(InterfaceType type, Property property, ISymbolMap symbols, INamespaceSet namespaces)
            : base(type, property, symbols, namespaces)
        {
        }

        protected override IEnumerable<SyntaxKind> GetModifierKeywords()
        {
            yield break;
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

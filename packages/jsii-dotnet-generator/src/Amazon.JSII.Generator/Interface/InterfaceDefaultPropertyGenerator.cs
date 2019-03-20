using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.Interface
{
    public class InterfaceDefaultPropertyGenerator : PropertyGeneratorBase<InterfaceType>
    {
        public InterfaceDefaultPropertyGenerator(InterfaceType type, Property property, ISymbolMap symbols, INamespaceSet namespaces)
            : base(type, property, symbols, namespaces)
        {
            if (property.IsAbstract != true)
            {
                throw new ArgumentException("Interface properties must be abstract", nameof(property));
            }

            if (property.IsProtected == true)
            {
                throw new ArgumentException("Protected properties are not allowed on interfaces", nameof(property));
            }

            if (property.IsStatic())
            {
                throw new ArgumentException(
                    $"Property {type.Name}.{property.Name} is marked as static, but interfaces must not contain static members.",
                    nameof(property)
                );
            }
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

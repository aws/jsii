using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Generic;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.Interface
{
    public class InterfaceDefaultGenerator : TypeGeneratorBase<InterfaceType>
    {
        public InterfaceDefaultGenerator(string package, InterfaceType type, ISymbolMap symbols, INamespaceSet namespaces = null)
            : base(package, type, symbols, namespaces)
        {
        }

        protected override MemberDeclarationSyntax CreateType()
        {
            return SF.ClassDeclaration
            (
                SF.List<AttributeListSyntax>(new [] {
                    SF.AttributeList(SF.SeparatedList(new [] {
                        SF.Attribute(SF.ParseName("JsiiByValue"))
                    }))
                }),
                SF.TokenList(SF.Token(SyntaxKind.PublicKeyword)),
                Symbols.GetInterfaceDefaultNameSyntaxToken(Type),
                null,
                SF.BaseList(SF.SeparatedList(CreateBaseTypes())),
                SF.List<TypeParameterConstraintClauseSyntax>(),
                SF.List(CreateMembers())
            );

            IEnumerable<BaseTypeSyntax> CreateBaseTypes()
            {
                yield return SF.SimpleBaseType(Symbols.GetNameSyntax(Type, disambiguate: true));
            }

            IEnumerable<MemberDeclarationSyntax> CreateMembers()
            {
                return CreateProperties();
            }
        }

        IEnumerable<MemberDeclarationSyntax> CreateProperties()
        {
            foreach (Property property in Type.GetAllProperties(Symbols))
            {
                InterfaceDefaultPropertyGenerator generator = new InterfaceDefaultPropertyGenerator(Type, property, Symbols, Namespaces);
                yield return generator.CreateProperty();
            }
        }
    }
}

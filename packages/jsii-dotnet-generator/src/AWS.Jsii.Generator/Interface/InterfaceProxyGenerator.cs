using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace AWS.Jsii.Generator.Interface
{
    public class InterfaceProxyGenerator : TypeGeneratorBase<InterfaceType>
    {
        public InterfaceProxyGenerator(string package, InterfaceType type, ISymbolMap symbols, INamespaceSet namespaces = null)
            : base(package, type, symbols, namespaces)
        {
        }

        protected override MemberDeclarationSyntax CreateType()
        {
            return SF.ClassDeclaration
            (
                CreateAttributes(),
                SF.TokenList(SF.Token(SyntaxKind.InternalKeyword)),
                GetProxyTypeNameSyntax(),
                null,
                CreateBaseList(),
                SF.List<TypeParameterConstraintClauseSyntax>(),
                SF.List(CreateMembers())
            );

            SyntaxList<AttributeListSyntax> CreateAttributes()
            {
                SyntaxToken packageLiteral = SF.Literal(Package);
                SyntaxToken fullyQualifiedNameLiteral = SF.Literal(Type.FullyQualifiedName);

                return SF.List(new[] {
                    SF.AttributeList(SF.SeparatedList(new[] {
                        SF.Attribute(
                            SF.ParseName("JsiiInterfaceProxy"),
                            SF.ParseAttributeArgumentList($"({packageLiteral}, {fullyQualifiedNameLiteral})")
                        )
                    }))
                });
            }

            BaseListSyntax CreateBaseList()
            {
                return SF.BaseList(SF.SeparatedList(GetBaseTypes()));

                IEnumerable<BaseTypeSyntax> GetBaseTypes()
                {
                    yield return SF.SimpleBaseType(SF.ParseTypeName("DeputyBase"));

                    Namespaces.Add(Type);
                    yield return SF.SimpleBaseType(Symbols.GetNameSyntax(Type, disambiguate: true));
                }
            }

            IEnumerable<MemberDeclarationSyntax> CreateMembers()
            {
                return CreateConstructors()
                    .Concat(CreateProperties())
                    .Concat(CreateMethods());
            }
        }

        SyntaxToken GetProxyTypeNameSyntax()
        {
            return SF.Identifier(Symbols.GetInterfaceProxyName(Type));
        }

        IEnumerable<MemberDeclarationSyntax> CreateConstructors()
        {
            yield return SF.ConstructorDeclaration
            (
                SF.List<AttributeListSyntax>(),

                // Only AWS.Jsii.Runtime should create interface proxies,
                // so we make the constructor private.
                SF.TokenList(SF.Token(SyntaxKind.PrivateKeyword)),

                GetProxyTypeNameSyntax(),
                SF.ParseParameterList("(ByRefValue reference)"),
                SF.ConstructorInitializer
                (
                    SyntaxKind.BaseConstructorInitializer,
                    SF.ParseArgumentList("(reference)")
                ),
                SF.Block(),
                null
            );
        }

        IEnumerable<PropertyDeclarationSyntax> CreateProperties()
        {
            foreach (Property property in Type.GetAllProperties(Symbols))
            {
                InterfaceProxyPropertyGenerator generator = new InterfaceProxyPropertyGenerator(Type, property, Symbols, Namespaces);
                yield return generator.CreateProperty();
            }
        }

        IEnumerable<MemberDeclarationSyntax> CreateMethods()
        {
            foreach (Method method in Type.GetAllMethods(Symbols))
            {
                InterfaceProxyMethodGenerator generator = new InterfaceProxyMethodGenerator(Type, method, Symbols, Namespaces);
                yield return generator.CreateMethod();
            }
        }
    }
}

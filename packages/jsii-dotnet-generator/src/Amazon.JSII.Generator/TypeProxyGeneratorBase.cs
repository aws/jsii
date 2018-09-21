using System.Collections.Generic;
using System.Linq;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator
{
    public abstract class TypeProxyGeneratorBase<T> : TypeGeneratorBase<T> where T : Type
    {
        protected TypeProxyGeneratorBase(string package, T type, ISymbolMap symbols, INamespaceSet namespaces)
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
                var typeOfExpression = SF.TypeOfExpression(Symbols.GetNameSyntax(Type));
                var fullyQualifiedNameLiteral = SF.Literal(Type.FullyQualifiedName);

                return SF.List(new[]
                {
                    SF.AttributeList(SF.SeparatedList(new[]
                    {
                        SF.Attribute(
                            SF.ParseName("JsiiInterfaceProxy"),
                            SF.ParseAttributeArgumentList($"({typeOfExpression}, {fullyQualifiedNameLiteral})")
                        )
                    }))
                });
            }

            BaseListSyntax CreateBaseList()
            {
                return SF.BaseList(SF.SeparatedList(GetBaseTypes()));

                IEnumerable<BaseTypeSyntax> GetBaseTypes()
                {
                    if (IsImplementingInterface)
                    {
                        yield return SF.SimpleBaseType(SF.ParseTypeName("DeputyBase"));
                    }

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

        protected virtual IEnumerable<MemberDeclarationSyntax> CreateConstructors()
        {
            yield return SF.ConstructorDeclaration
            (
                SF.List<AttributeListSyntax>(),

                // Only Amazon.JSII.Runtime should create interface proxies,
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

        private bool IsImplementingInterface => Type is InterfaceType;

        protected abstract SyntaxToken GetProxyTypeNameSyntax();

        protected abstract IEnumerable<PropertyDeclarationSyntax> CreateProperties();

        protected abstract IEnumerable<MemberDeclarationSyntax> CreateMethods();
    }
}
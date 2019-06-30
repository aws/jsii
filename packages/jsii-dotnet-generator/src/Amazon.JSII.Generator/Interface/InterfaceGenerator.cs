using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.Interface
{
    public class InterfaceGenerator : TypeGeneratorBase<InterfaceType>
    {
        public InterfaceGenerator(string package, InterfaceType type, ISymbolMap symbols, INamespaceSet namespaces = null)
            : base(package, type, symbols, namespaces)
        {
        }

        protected override MemberDeclarationSyntax CreateType()
        {
            return SF.InterfaceDeclaration
            (
                CreateAttributes(),
                SF.TokenList(SF.Token(SyntaxKind.PublicKeyword)),
                Symbols.GetNameSyntaxToken(Type),
                null,
                CreateBaseList(),
                SF.List<TypeParameterConstraintClauseSyntax>(),
                SF.List(CreateMembers())
            );

            SyntaxList<AttributeListSyntax> CreateAttributes()
            {
                TypeOfExpressionSyntax typeOfExpression = SF.TypeOfExpression(Symbols.GetNameSyntax(Type));
                SyntaxToken fullyQualifiedNameLiteral = SF.Literal(Type.FullyQualifiedName);

                return SF.List(GetAttributeLists());

                IEnumerable<AttributeListSyntax> GetAttributeLists()
                {
                    yield return SF.AttributeList(SF.SeparatedList(new[] {
                        SF.Attribute(
                            SF.ParseName("JsiiInterface"),
                            SF.ParseAttributeArgumentList($"(nativeType: {typeOfExpression}, fullyQualifiedName: {fullyQualifiedNameLiteral})")
                        )
                    }));

                    if (Type.Docs?.Stability == Stability.Deprecated)
                    {
                        var argument = Type.Docs?.Deprecated != null ? SF.Literal(Type.Docs?.Deprecated).ToString() : "";
                        yield return SF.AttributeList(SF.SeparatedList(new[] {
                            SF.Attribute(
                                SF.ParseName("System.Obsolete"),
                                SF.ParseAttributeArgumentList($"({argument})")
                            )
                        }));
                    }
                }
            }

            BaseListSyntax CreateBaseList()
            {
                IEnumerable<BaseTypeSyntax> baseTypes = GetBaseTypes();

                return baseTypes?.Any() ?? false ? SF.BaseList(SF.SeparatedList(baseTypes)) : null;

                IEnumerable<BaseTypeSyntax> GetBaseTypes()
                {
                    foreach (string interfaceReference in Type.Interfaces ?? Enumerable.Empty<string>())
                    {
                        Namespaces.Add(Symbols.GetTypeFromFullyQualifiedName(interfaceReference));
                        yield return SF.SimpleBaseType(Symbols.GetNameSyntax(interfaceReference, disambiguate: true));
                    }
                }
            }

            IEnumerable<MemberDeclarationSyntax> CreateMembers()
            {
                return CreateProperties().Concat(CreateMethods());
            }
        }

        IEnumerable<MemberDeclarationSyntax> CreateMethods()
        {
            if (Type.Methods == null)
            {
                yield break;
            }

            foreach (Method method in Type.Methods)
            {
                if (method.IsAsync)
                {
                    throw new NotImplementedException();
                }

                InterfaceMethodGenerator generator = new InterfaceMethodGenerator(Type, method, Symbols, Namespaces);
                yield return generator.CreateMethod();
            }
        }

        IEnumerable<PropertyDeclarationSyntax> CreateProperties()
        {
            if (Type.Properties == null)
            {
                yield break;
            }

            foreach (Property property in Type.Properties)
            {
                InterfacePropertyGenerator generator = new InterfacePropertyGenerator(Type, property, Symbols, Namespaces);
                yield return generator.CreateProperty();
            }
        }
    }
}

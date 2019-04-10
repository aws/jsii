using Amazon.JSII.Generator.DocComment;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator
{
    public abstract class PropertyGeneratorBase<T>
        where T : JsonModel.Spec.Type
    {
        protected PropertyGeneratorBase(T type, Property property, ISymbolMap symbols, INamespaceSet namespaces)
        {
            Type = type ?? throw new ArgumentNullException(nameof(type));
            Property = property ?? throw new ArgumentNullException(nameof(property));
            Symbols = symbols ?? throw new ArgumentNullException(nameof(symbols));
            Namespaces = namespaces ?? throw new ArgumentNullException(nameof(namespaces));
        }

        protected T Type { get; }

        protected Property Property { get; }

        protected ISymbolMap Symbols { get; }

        protected INamespaceSet Namespaces { get; }

        public PropertyDeclarationSyntax CreateProperty()
        {
            PropertyDeclarationSyntax declaration = Property.IsConstant ?
                SF.PropertyDeclaration
                (
                    GetAttributeLists(),
                    GetModifierList(),
                    GetReturnType(),
                    GetExplicitInterfaceSpecifier(),
                    GetIdentifier(),
                    GetAccessorList(),
                    null,
                    GetInitializer(),
                    SF.Token(SyntaxKind.SemicolonToken)
                ) :
                SF.PropertyDeclaration
                (
                    GetAttributeLists(),
                    GetModifierList(),
                    GetReturnType(),
                    GetExplicitInterfaceSpecifier(),
                    GetIdentifier(),
                    GetAccessorList()
                );

            if (Property.Docs != null)
            {
                DocCommentGeneratorBase<Property> generator = new PropertyDocCommentGenerator(Property);
                SyntaxTriviaList trivia = SF.TriviaList(generator.CreateDocComment());

                declaration = declaration.WithLeadingTrivia(trivia);
            }

            return declaration;
        }

        protected abstract IEnumerable<SyntaxKind> GetModifierKeywords();

        protected abstract SyntaxToken GetIdentifier();

        protected abstract IEnumerable<AccessorDeclarationSyntax> GetAccessors();

        protected virtual bool IsOverride => false;

        protected InvocationExpressionSyntax CreateGetPropertyInvocationExpression()
        {
            return SF.InvocationExpression(
                CreateGetPropertyMethodIdentifier(),
                GetArgumentListSyntax()
            );

            SimpleNameSyntax CreateGetPropertyMethodIdentifier()
            {
                return SF.GenericName(
                    SF.Identifier(Property.IsStatic() ?
                        "GetStaticProperty" :
                        "GetInstanceProperty"
                    ),
                    SF.TypeArgumentList(
                        SF.Token(SyntaxKind.LessThanToken),
                        SF.SeparatedList(new[] { GetReturnType() }),
                        SF.Token(SyntaxKind.GreaterThanToken)
                    )
                );
            }

            ArgumentListSyntax GetArgumentListSyntax()
            {
                var arguments = GetArgumentExpressions().Select(e => SF.Argument(e));

                return SF.ArgumentList(SF.SeparatedList(arguments));

                IEnumerable<ExpressionSyntax> GetArgumentExpressions()
                {
                    if (Property.IsStatic())
                    {
                        yield return SF.TypeOfExpression(Symbols.GetNameSyntax(Type));
                    }
                }
            }
        }

        protected InvocationExpressionSyntax CreateSetPropertyInvocationExpression()
        {
            return SF.InvocationExpression(
                CreateGetPropertyMethodIdentifier(),
                GetArgumentListSyntax()
            );

            SimpleNameSyntax CreateGetPropertyMethodIdentifier()
            {
                return SF.IdentifierName(Property.IsStatic() ?
                    "SetStaticProperty" :
                    "SetInstanceProperty"
                );
            }

            ArgumentListSyntax GetArgumentListSyntax()
            {
                var arguments = GetArgumentExpressions().Select(e => SF.Argument(e));

                return SF.ArgumentList(SF.SeparatedList(arguments));

                IEnumerable<ExpressionSyntax> GetArgumentExpressions()
                {
                    if (Property.IsStatic())
                    {
                        yield return SF.TypeOfExpression(Symbols.GetNameSyntax(Type));
                    }

                    yield return SF.IdentifierName("value");
                }
            }
        }

        SyntaxTokenList GetModifierList()
        {
            return SF.TokenList(GetModifierKeywords().Select(k => SF.Token(k)));
        }

        private static readonly JsonSerializerSettings SerializerSettings = new JsonSerializerSettings
        {
            DefaultValueHandling = DefaultValueHandling.Ignore
        };
        
        SyntaxList<AttributeListSyntax> GetAttributeLists()
        {
            return SF.List(new[] { SF.AttributeList(SF.SeparatedList(GetAttributes())) });

            IEnumerable<AttributeSyntax> GetAttributes()
            {
                SyntaxToken nameLiteral = SF.Literal(Property.Name);
                SyntaxToken typeJsonLiteral = SF.Literal(JsonConvert.SerializeObject(Property.Type, SerializerSettings));
                SyntaxToken trueLiteral = SF.Token(SyntaxKind.TrueKeyword);

                string argumentList = $"name: {nameLiteral}, typeJson: {typeJsonLiteral}";
                if (Property.IsOptional)
                {
                    argumentList += $", isOptional: {trueLiteral}";
                }
                if (IsOverride)
                {
                    argumentList += $", isOverride: {trueLiteral}";
                }

                yield return SF.Attribute(
                    SF.ParseName("JsiiProperty"),
                    SF.ParseAttributeArgumentList($"({argumentList})")
                );
            }
        }

        TypeSyntax GetReturnType()
        {
            Namespaces.Add(Property.Type);
            return Symbols.GetTypeSyntax(Property.Type, Property.IsOptional);
        }

        ExplicitInterfaceSpecifierSyntax GetExplicitInterfaceSpecifier()
        {
            return null;
        }

        AccessorListSyntax GetAccessorList()
        {
            return SF.AccessorList(SF.List(GetAccessors()));
        }

        EqualsValueClauseSyntax GetInitializer()
        {
            return SF.EqualsValueClause(CreateGetPropertyInvocationExpression());
        }
    }
}

using AWS.Jsii.Generator.DocComment;
using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace AWS.Jsii.Generator
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
            PropertyDeclarationSyntax declaration = SF.PropertyDeclaration
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

        protected ExpressionSyntax GetGetPropertyInvocation()
        {
            return SF.ParseExpression($"GetProperty<{GetReturnType()}>()");
        }

        protected ExpressionSyntax GetSetPropertyInvocation()
        {
            return SF.ParseExpression($"SetProperty(value)");
        }

        SyntaxTokenList GetModifierList()
        {
            return SF.TokenList(GetModifierKeywords().Select(k => SF.Token(k)));
        }

        SyntaxList<AttributeListSyntax> GetAttributeLists()
        {
            return SF.List(new[] { SF.AttributeList(SF.SeparatedList(GetAttributes())) });

            IEnumerable<AttributeSyntax> GetAttributes()
            {
                SyntaxToken nameLiteral = SF.Literal(Property.Name);
                SyntaxToken typeJsonLiteral = SF.Literal(JsonConvert.SerializeObject(Property.Type));
                SyntaxToken trueLiteral = SF.Token(SyntaxKind.TrueKeyword);

                string argumentList = IsOverride ?
                    $"({nameLiteral}, {typeJsonLiteral}, {trueLiteral})" :
                    $"({nameLiteral}, {typeJsonLiteral})";

                yield return SF.Attribute(
                    SF.ParseName("JsiiProperty"),
                    SF.ParseAttributeArgumentList(argumentList)
                );
            }
        }

        TypeSyntax GetReturnType()
        {
            Namespaces.Add(Property.Type);
            return Symbols.GetTypeSyntax(Property.Type);
        }

        ExplicitInterfaceSpecifierSyntax GetExplicitInterfaceSpecifier()
        {
            return null;
        }

        AccessorListSyntax GetAccessorList()
        {
            return SF.AccessorList(SF.List(GetAccessors()));
        }
    }
}

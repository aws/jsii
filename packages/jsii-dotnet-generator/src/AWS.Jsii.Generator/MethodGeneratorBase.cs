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
    public abstract class MethodGeneratorBase<T>
        where T : JsonModel.Spec.Type
    {
        protected MethodGeneratorBase(T type, Method method, ISymbolMap symbols, INamespaceSet namespaces)
        {
            Type = type ?? throw new ArgumentNullException(nameof(type));
            Method = method ?? throw new ArgumentNullException(nameof(method));
            Symbols = symbols ?? throw new ArgumentNullException(nameof(symbols));
            Namespaces = namespaces ?? throw new ArgumentNullException(nameof(namespaces));
        }

        protected T Type { get; }

        protected Method Method { get; }

        protected ISymbolMap Symbols { get; }

        protected INamespaceSet Namespaces { get; }

        public MethodDeclarationSyntax CreateMethod()
        {
            MethodDeclarationSyntax declaration = SF.MethodDeclaration(
                GetAttributeLists(),
                GetModifierList(),
                GetReturnType(),
                GetExplicitInterfaceSpecifier(),
                GetIdentifier(),
                GetTypeParameterList(),
                Method.GetParameterListSyntax(Namespaces, Symbols),
                GetConstraintClauseList(),
                GetBody(),
                GetExpressionBody(),
                GetSemicolonToken()
            );

            if (Method.Docs != null)
            {
                MethodDocCommentGenerator generator = new MethodDocCommentGenerator(Method, Symbols);
                SyntaxTriviaList trivia = SF.TriviaList(generator.CreateDocComment());

                declaration = declaration.WithLeadingTrivia(trivia);
            }

            return declaration;
        }

        protected abstract IEnumerable<SyntaxKind> GetModifierKeywords();


        protected abstract BlockSyntax GetBody();

        protected abstract bool HasSemicolon { get; }

        protected virtual bool IsOverride => false;

        protected SyntaxToken GetIdentifier()
        {
            return Symbols.GetNameSyntaxToken(Type, Method);
        }

        protected InvocationExpressionSyntax CreateInvocationExpression()
        {
            return SF.InvocationExpression(
                CreateInvokeMethodIdentifier(),
                Method.GetArgumentListSyntax(Namespaces, Symbols)
            );

            NameSyntax CreateInvokeMethodIdentifier()
            {
                if (Method.Returns == null)
                {
                    return SF.IdentifierName("InvokeVoidMethod");
                }

                return SF.GenericName(
                    SF.Identifier("InvokeMethod"),
                    CreateTypeArgumentList()
                );

                TypeArgumentListSyntax CreateTypeArgumentList()
                {
                    if (Method.Returns == null)
                    {
                        return null;
                    }

                    return SF.TypeArgumentList(
                        SF.Token(SyntaxKind.LessThanToken),
                        SF.SeparatedList(new[] { GetReturnType() }),
                        SF.Token(SyntaxKind.GreaterThanToken)
                    );
                }
            }
        }

        SyntaxList<AttributeListSyntax> GetAttributeLists()
        {
            return SF.List(new[] { SF.AttributeList(SF.SeparatedList(GetAttributes())) });

            IEnumerable<AttributeSyntax> GetAttributes()
            {
                SyntaxToken nameLiteral = SF.Literal(Method.Name);
                SyntaxToken returnsJsonLiteral = Method.Returns == null ?
                    SF.Token(SyntaxKind.NullKeyword) :
                    SF.Literal(JsonConvert.SerializeObject(Method.Returns));
                SyntaxToken parametersJsonLiteral = Method.GetParametersJsonSyntaxToken();
                SyntaxToken trueLiteral = SF.Token(SyntaxKind.TrueKeyword);

                string argumentList = IsOverride ?
                    $"({nameLiteral}, {returnsJsonLiteral}, {parametersJsonLiteral}, {trueLiteral})" :
                    $"({nameLiteral}, {returnsJsonLiteral}, {parametersJsonLiteral})";

                yield return SF.Attribute(
                    SF.ParseName("JsiiMethod"),
                    SF.ParseAttributeArgumentList(argumentList)
                );
            }
        }

        SyntaxTokenList GetModifierList()
        {
            return SF.TokenList(GetModifierKeywords().Select(k => SF.Token(k)));
        }

        ExplicitInterfaceSpecifierSyntax GetExplicitInterfaceSpecifier()
        {
            return null;
        }

        TypeSyntax GetReturnType()
        {
            if (Method.Returns == null)
            {
                return SF.ParseTypeName("void");
            }

            Namespaces.Add(Method.Returns);
            return Symbols.GetTypeSyntax(Method.Returns);
        }

        TypeParameterListSyntax GetTypeParameterList()
        {
            return null;
        }

        SyntaxList<TypeParameterConstraintClauseSyntax> GetConstraintClauseList()
        {
            return SF.List< TypeParameterConstraintClauseSyntax>();
        }

        ArrowExpressionClauseSyntax GetExpressionBody()
        {
            return null;
        }

        SyntaxToken GetSemicolonToken()
        {
            return SF.Token(HasSemicolon ? SyntaxKind.SemicolonToken : SyntaxKind.None);
        }
    }
}

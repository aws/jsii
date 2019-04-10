using Amazon.JSII.Generator.DocComment;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator
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

            MethodDocCommentGenerator generator = new MethodDocCommentGenerator(Method, Symbols);
            SyntaxTriviaList trivia = SF.TriviaList(generator.CreateDocComment());

            declaration = declaration.WithLeadingTrivia(trivia);

            return declaration;
        }

        protected abstract IEnumerable<SyntaxKind> GetModifierKeywords();


        protected abstract BlockSyntax GetBody();

        protected abstract bool HasSemicolon { get; }

        protected SyntaxToken GetIdentifier()
        {
            return Symbols.GetNameSyntaxToken(Type, Method);
        }

        protected InvocationExpressionSyntax CreateInvocationExpression()
        {
            return SF.InvocationExpression(
                CreateInvokeMethodIdentifier(),
                GetArgumentListSyntax()
            );

            SimpleNameSyntax CreateInvokeMethodIdentifier()
            {
                string invokeMethodName = GetInvokeMethodName();

                if (Method.Returns == null)
                {
                    return SF.IdentifierName(invokeMethodName);
                }

                return SF.GenericName(
                    SF.Identifier(invokeMethodName),
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

                string GetInvokeMethodName()
                {
                    StringBuilder builder = new StringBuilder("Invoke");
                    builder.Append(Method.IsStatic ? "Static" : "Instance");
                    if (Method.Returns == null)
                    {
                        builder.Append("Void");
                    }
                    builder.Append("Method");

                    return builder.ToString();
                }
            }
        }

        ArgumentListSyntax GetArgumentListSyntax()
        {
            var arguments = GetArgumentExpressions().Select(e => SF.Argument(e));
            return SF.ArgumentList(SF.SeparatedList(arguments));

            IEnumerable<ExpressionSyntax> GetArgumentExpressions()
            {
                if (Method.IsStatic)
                {
                    yield return SF.TypeOfExpression(Symbols.GetNameSyntax(Type));
                }

                yield return CreateArgumentsArray();
            }

            ArrayCreationExpressionSyntax CreateArgumentsArray()
            {
                return SF.ArrayCreationExpression(
                    SF.Token(SyntaxKind.NewKeyword),
                    SF.ArrayType(SF.ParseTypeName("object[]")),
                    SF.InitializerExpression(
                        SyntaxKind.ArrayInitializerExpression,
                        SF.Token(SyntaxKind.OpenBraceToken),
                        SF.SeparatedList(GetArguments()),
                        SF.Token(SyntaxKind.CloseBraceToken)
                    )
                );

                IEnumerable<ExpressionSyntax> GetArguments()
                {
                    if (Method.Parameters == null)
                    {
                        yield break;
                    }

                    foreach (Parameter parameter in Method.Parameters)
                    {
                        yield return Symbols.GetNameSyntax(parameter);
                    }
                }
            }
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
                SyntaxToken nameLiteral = SF.Literal(Method.Name);
                SyntaxToken trueLiteral = SF.Token(SyntaxKind.TrueKeyword);

                string argumentList = $"name: {nameLiteral}";
                if (Method.Returns != null)
                {
                    SyntaxToken returnsJsonLiteral = Method.Returns == null ?
                        SF.Token(SyntaxKind.NullKeyword) :
                        SF.Literal(JsonConvert.SerializeObject(Method.Returns, SerializerSettings));
                    argumentList += $", returnsJson: {returnsJsonLiteral}";
                }

                if (Method.Parameters != null && Method.Parameters.Length > 0)
                {
                    SyntaxToken parametersJsonLiteral = Method.GetParametersJsonSyntaxToken();
                    argumentList += $", parametersJson: {parametersJsonLiteral}";
                }
                if (Method.IsAsync)
                {
                    argumentList += $", isAsync: {trueLiteral}";
                }
                if (Method.Overrides != null)
                {
                    argumentList += $", isOverride: {trueLiteral}";
                }

                yield return SF.Attribute(
                    SF.ParseName("JsiiMethod"),
                    SF.ParseAttributeArgumentList($"({argumentList})")
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

            Namespaces.Add(Method.Returns.Type);
            return Symbols.GetTypeSyntax(Method.Returns.Type, Method.Returns.IsOptional);
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

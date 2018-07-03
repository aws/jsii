using AWS.Jsii.Generator.DocComment;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using Type = AWS.Jsii.JsonModel.Spec.Type;

namespace AWS.Jsii.Generator
{
    public abstract class TypeGeneratorBase<T> where T : Type
    {
        protected TypeGeneratorBase(string package, T type, ISymbolMap symbols, INamespaceSet namespaces)
        {
            Package = package ?? throw new ArgumentNullException(nameof(package));

            Type = type ?? throw new ArgumentNullException(nameof(type));
            Symbols = symbols ?? throw new ArgumentNullException(nameof(symbols));

            NameSyntax namespaceSyntax = Symbols.GetNamespaceSyntax(Type);
            Namespaces = namespaces ?? new NamespaceSet(Symbols, namespaceSyntax);
        }

        protected T Type { get; }

        protected ISymbolMap Symbols { get; }

        protected INamespaceSet Namespaces { get; }

        protected string Package { get; }

        public SyntaxTree CreateSyntaxTree()
        {
            // The call to CreateType must come before the call to namespaces.GetUsings.
            // This is because CreateType builds the list of referenced namespaces.
            MemberDeclarationSyntax typeDeclaration = CreateType();

            if (Type.Docs != null)
            {
                DocCommentGeneratorBase<Type> generator = new TypeDocCommentGenerator(Type);
                SyntaxTriviaList trivia = SF.TriviaList(generator.CreateDocComment());

                typeDeclaration = typeDeclaration.WithLeadingTrivia(trivia);
            }

            NamespaceDeclarationSyntax namespaceDeclaration = SF.NamespaceDeclaration(
                Symbols.GetNamespaceSyntax(Type),
                SF.List<ExternAliasDirectiveSyntax>(),
                SF.List<UsingDirectiveSyntax>(),
                SF.List(new[] { typeDeclaration })
            );

            return SF.SyntaxTree(
                SF.CompilationUnit(
                    SF.List<ExternAliasDirectiveSyntax>(),
                    Namespaces.GetUsings(),
                    SF.List<AttributeListSyntax>(),
                    SF.List<MemberDeclarationSyntax>(new[] { namespaceDeclaration })
                ).NormalizeWhitespace(elasticTrivia: true)
            );
        }

        protected abstract MemberDeclarationSyntax CreateType();
    }
}

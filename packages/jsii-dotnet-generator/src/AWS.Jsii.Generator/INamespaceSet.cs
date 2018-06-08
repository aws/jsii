using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Type = AWS.Jsii.JsonModel.Spec.Type;

namespace AWS.Jsii.Generator
{
    public interface INamespaceSet
    {
        SyntaxList<UsingDirectiveSyntax> GetUsings();

        void Add(Type type);

        void Add(TypeReference typeReference);
    }
}

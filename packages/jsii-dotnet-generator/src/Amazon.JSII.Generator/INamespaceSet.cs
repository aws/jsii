using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Type = Amazon.JSII.JsonModel.Spec.Type;

namespace Amazon.JSII.Generator
{
    public interface INamespaceSet
    {
        SyntaxList<UsingDirectiveSyntax> GetUsings();

        void Add(TypeReference typeReference);
    }
}

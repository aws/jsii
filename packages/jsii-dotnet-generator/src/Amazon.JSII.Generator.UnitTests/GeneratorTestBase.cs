using Amazon.JSII.JsonModel.Spec;
using NSubstitute;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using Type = Amazon.JSII.JsonModel.Spec.Type;

namespace Amazon.JSII.Generator.UnitTests
{
    public abstract class GeneratorTestBase
    {
        public GeneratorTestBase()
        {
            Symbols = Substitute.For<ISymbolMap>();
            Namespaces = Substitute.For<INamespaceSet>();

            Symbols
                .GetTypeSyntax(Arg.Is<TypeReference>(t => t.Primitive == PrimitiveType.String), false)
                .Returns(SF.ParseTypeName("string"));
        }

        protected ISymbolMap Symbols { get; }

        protected INamespaceSet Namespaces { get; }
    }
}

using Amazon.JSII.Generator.DocComment;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Xunit;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace Amazon.JSII.Generator.UnitTests.DocComment
{
    public class MethodDocCommentGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(MethodDocCommentGenerator) + ".";

        string Render(Docs docs, params Parameter[] parameters)
        {
            Method method = new Method(
                parameters: parameters,
                docs: docs,
                name: "method"
            );

            MethodDocCommentGenerator generator = new MethodDocCommentGenerator(method, Symbols);

            SyntaxTrivia docComment = generator.CreateDocComment();
            SyntaxTree tree = SF.SyntaxTree(
                SF.MethodDeclaration(SF.ParseTypeName("void"), "Method")
                    .WithLeadingTrivia(generator.CreateDocComment())
                    .NormalizeWhitespace(elasticTrivia: true)
            );

            return tree.ToString();
        }

        [Fact(DisplayName = Prefix + nameof(IncludesSingleLineSummary))]
        public void IncludesSingleLineSummary()
        {
            Docs docs = new Docs
            {
                { "summary", "my comment" }
            };

            string actual = Render(docs);
            string expected =
@"/// <summary>my comment</summary>
        void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Theory(DisplayName = Prefix + nameof(IncludesMultiLineSummary))]
        [InlineData("my\ncomment")]
        [InlineData("my\r\ncomment")]
        public void IncludesMultiLineSummary(string summary)
        {
            Docs docs = new Docs
            {
                { "summary", summary }
            };

            string actual = Render(docs);
            string expected =
@"/// <summary>
/// my
/// comment
/// </summary>
        void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesSingleLineRemarks))]
        public void IncludesSingleLineRemarks()
        {
            Docs docs = new Docs
            {
                { "myKey", "my comment" }
            };

            string actual = Render(docs);
            string expected =
@"/// <remarks>myKey: my comment</remarks>
        void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesMultiLineRemarks))]
        public void IncludesMultiLineRemarks()
        {
            Docs docs = new Docs
            {
                { "myKey1", "my\ncomment" },
                { "myKey2", "my\r\ncomment" }
            };

            string actual = Render(docs);
            string expected =
@"/// <remarks>
/// myKey1: my
/// comment
/// myKey2: my
/// comment
/// </remarks>
        void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(SeparatesSingleLineLink))]
        public void SeparatesSingleLineLink()
        {
            Docs docs = new Docs
            {
                { "link", "www.example.com" }
            };

            string actual = Render(docs);
            string expected =
@"/// <remarks>link: www.example.com </remarks>
        void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IgnoresParam))]
        public void IgnoresParam()
        {
            Docs docs = new Docs
            {
                { "param", "my comment" }
            };

            string actual = Render(docs);
            string expected = @"void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesReturns))]
        public void IncludesReturns()
        {
            Docs docs = new Docs
            {
                { "returns", "my comment" }
            };

            string actual = Render(docs);
            string expected =
@"/// <returns>my comment</returns>
        void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IgnoresParameterParam))]
        public void IgnoresParameterParam()
        {
            Parameter parameter = new Parameter(
                name: "myParam",
                type: new TypeReference(primitive: PrimitiveType.String),
                docs: new Docs
                {
                    { "param", "my comment" }
                }
            );

            Symbols.MapParameterName("myParam", "myParam");

            string actual = Render(null, parameter);
            string expected = @"void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IgnoresParameterParam))]
        public void TrimsParameterSummary()
        {
            Parameter parameter = new Parameter(
                name: "myParam",
                type: new TypeReference(primitive: PrimitiveType.String),
                docs: new Docs
                {
                    { "summary", "my comment" }
                }
            );

            Symbols.MapParameterName("myParam", "myParam");

            string actual = Render(null, parameter);
            string expected =
@"/// <param name = ""myParam"">my comment</param>
        void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesParameterRemarks))]
        public void IncludesParameterRemarks()
        {
            Parameter parameter = new Parameter(
                name: "myParam",
                type: new TypeReference(primitive: PrimitiveType.String),
                docs: new Docs
                {
                    { "myKey1", "my comment" },
                    { "myKey2", "my comment" }
                }
            );

            Symbols.MapParameterName("myParam", "myParam");

            string actual = Render(null, parameter);
            string expected =
@"/// <param name = ""myParam"">
/// myKey1: my comment
/// myKey2: my comment
/// </param>
        void Method()";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

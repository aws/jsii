using Amazon.JSII.Generator.DocComment;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Xunit;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using System.Collections.Generic;

namespace Amazon.JSII.Generator.UnitTests.DocComment
{
    public class PropertyDocCommentGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(PropertyDocCommentGenerator) + ".";

        string Render(Docs docs)
        {
            Property property = new Property(
                name: "myProp",
                type: new TypeReference(primitive: PrimitiveType.String),
                isImmutable: false,
                isAbstract: false,
                isStatic: false,
                docs: docs
            );

            PropertyDocCommentGenerator generator = new PropertyDocCommentGenerator(property);

            SyntaxTrivia docComment = generator.CreateDocComment();
            SyntaxTree tree = SF.SyntaxTree(
                SF.PropertyDeclaration(SF.ParseTypeName("string"), "MyProp")
                    .WithLeadingTrivia(generator.CreateDocComment())
                    .NormalizeWhitespace(elasticTrivia: true)
            );

            return tree.ToString();
        }

        [Fact(DisplayName = Prefix + nameof(IncludesSingleLineSummary))]
        public void IncludesSingleLineSummary()
        {
            Docs docs = new Docs
            (
                summary: "my comment"
            );

            string actual = Render(docs);
            string expected =
@"/// <summary>my comment</summary>
        string MyProp";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Theory(DisplayName = Prefix + nameof(IncludesMultiLineSummary))]
        [InlineData("my\ncomment")]
        [InlineData("my\r\ncomment")]
        public void IncludesMultiLineSummary(string summary)
        {
            Docs docs = new Docs
            (
                summary: summary
            );

            string actual = Render(docs);
            string expected =
@"/// <summary>
/// my
/// comment
/// </summary>
        string MyProp";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesSingleLineRemarks))]
        public void IncludesSingleLineRemarks()
        {
            Docs docs = new Docs
            (
                custom: new Dictionary<string,  string>{{ "myKey", "my comment" }}
            );

            string actual = Render(docs);
            string expected =
@"/// <remarks>myKey: my comment</remarks>
        string MyProp";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesMultiLineRemarks))]
        public void IncludesMultiLineRemarks()
        {
            Docs docs = new Docs
            (
                custom: new Dictionary<string, string>{
                    { "myKey1", "my\ncomment" },
                    { "myKey2", "my\r\ncomment" }
                }
            );

            string actual = Render(docs);
            string expected =
@"/// <remarks>
/// myKey1: my
/// comment
/// myKey2: my
/// comment
/// </remarks>
        string MyProp";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(SeparatesSingleLineLink))]
        public void SeparatesSingleLineLink()
        {
            Docs docs = new Docs
            (
                custom: new Dictionary<string, string>{{"link", "www.example.com" }}
            );

            string actual = Render(docs);
            string expected =
@"/// <remarks>link: www.example.com </remarks>
        string MyProp";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IgnoresParam))]
        public void IgnoresParam()
        {
            Docs docs = new Docs
            (
                custom: new Dictionary<string, string>{{"param", "my comment" }}
            );

            string actual = Render(docs);
            string expected = @"string MyProp";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesReturns))]
        public void IncludesReturns()
        {
            Docs docs = new Docs
            (
                returns: "my comment"
            );

            string actual = Render(docs);
            string expected =
@"/// <returns>my comment</returns>
        string MyProp";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(ShowsDefault))]
        public void ShowsDefault()
        {
            Docs docs = new Docs
            (
                summary: "A property",
                remarks: "Some remarks.",
                default_: "Tis a default"
            );

            string actual = Render(docs);
            string expected =
@"/// <summary>A property</summary>
/// <remarks>
/// Some remarks.
/// default: Tis a default
/// </remarks>
        string MyProp";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

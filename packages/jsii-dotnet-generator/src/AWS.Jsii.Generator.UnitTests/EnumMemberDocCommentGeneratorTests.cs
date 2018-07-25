using AWS.Jsii.Generator.DocComment;
using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Xunit;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace AWS.Jsii.Generator.UnitTests
{
    public class EnumMemberDocCommentGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(EnumMemberDocCommentGenerator) + ".";

        string Render(Docs docs)
        {
            EnumMember member = new EnumMember("member", docs);
            EnumMemberDocCommentGenerator generator = new EnumMemberDocCommentGenerator(member);

            SyntaxTrivia docComment = generator.CreateDocComment();
            SyntaxTree tree = SF.SyntaxTree(
                SF.EnumMemberDeclaration("Member")
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
                { "comment", "my comment" }
            };

            string actual = Render(docs);
            string expected =
@"/// <summary>my comment</summary>
        Member";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Theory(DisplayName = Prefix + nameof(IncludesMultiLineSummary))]
        [InlineData("my\ncomment")]
        [InlineData("my\r\ncomment")]
        public void IncludesMultiLineSummary(string summary)
        {
            Docs docs = new Docs
            {
                { "comment", summary }
            };

            string actual = Render(docs);
            string expected =
@"/// <summary>
/// my
/// comment
/// </summary>
        Member";

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
        Member";

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
        Member";

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
        Member";

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
            string expected = @"Member";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IgnoresReturns))]
        public void IgnoresReturns()
        {
            Docs docs = new Docs
            {
                { "return", "my comment" }
            };

            string actual = Render(docs);
            string expected = @"Member";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

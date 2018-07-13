using AWS.Jsii.Generator.Enum;
using AWS.Jsii.Generator.Interface;
using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Xunit;

namespace AWS.Jsii.Generator.UnitTests.Enum
{
    public class EnumGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(InterfaceGenerator) + ".";

        string Render(EnumType enumType)
        {
            Symbols.MapTypeToPackage("myEnumFqn", "myPackage");
            Symbols.MapNamespace("myNamespace", "MyNamespace");
            Symbols.MapTypeName("myEnumFqn", "MyEnum", JsonModel.Spec.TypeKind.Enum);

            EnumGenerator generator = new EnumGenerator("myPackage", enumType, Symbols, Namespaces);

            SyntaxTree syntaxTree = generator.CreateSyntaxTree();
            return syntaxTree.ToString();
        }

        [Fact(DisplayName = Prefix + nameof(IncludesAttribute))]
        public void IncludesAttribute()
        {
            EnumType enumType = new EnumType
            (
                "myEnumFqn", "myPackage", "myEnum", "myNamespace",
                new EnumMember[] { }
            );

            string actual = Render(enumType);
            string expected =
@"namespace MyNamespace
{
    [JsiiEnum(typeof(MyEnum), ""myEnumFqn"")]
    public enum MyEnum
    {
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesMembers))]
        public void IncludesMembers()
        {
            EnumType enumType = new EnumType
            (
                "myEnumFqn", "myPackage", "myEnum", "myNamespace",
                new EnumMember[]
                {
                    new EnumMember("member1"),
                    new EnumMember("member2"),
                }
            );

            Symbols.MapEnumMemberName("myEnumFqn", "member1", "Member1");
            Symbols.MapEnumMemberName("myEnumFqn", "member2", "Member2");

            string actual = Render(enumType);
            string expected =
@"namespace MyNamespace
{
    [JsiiEnum(typeof(MyEnum), ""myEnumFqn"")]
    public enum MyEnum
    {
        [JsiiEnumMember(""member1"")]
        Member1,
        [JsiiEnumMember(""member2"")]
        Member2
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesDocs))]
        public void IncludesDocs()
        {
            EnumType enumType = new EnumType
            (
                "myEnumFqn", "myPackage", "myEnum", "myNamespace",
                new EnumMember[] { },
                new Docs
                {
                    { "foo", "bar" }
                }
            );

            string actual = Render(enumType);
            string expected =
@"namespace MyNamespace
{
    /// <remarks>foo: bar</remarks>
    [JsiiEnum(typeof(MyEnum), ""myEnumFqn"")]
    public enum MyEnum
    {
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesMemberDocs))]
        public void IncludesMemberDocs()
        {
            EnumType enumType = new EnumType
            (
                "myEnumFqn", "myPackage", "myEnum", "myNamespace",
                new EnumMember[]
                {
                    new EnumMember("member1", new Docs { { "foo", "bar" } }),
                    new EnumMember("member2", new Docs { { "foo", "bar" } }),
                }
            );

            Symbols.MapEnumMemberName("myEnumFqn", "member1", "Member1");
            Symbols.MapEnumMemberName("myEnumFqn", "member2", "Member2");

            string actual = Render(enumType);
            string expected =
@"namespace MyNamespace
{
    [JsiiEnum(typeof(MyEnum), ""myEnumFqn"")]
    public enum MyEnum
    {
        /// <remarks>foo: bar</remarks>
        [JsiiEnumMember(""member1"")]
        Member1,
        /// <remarks>foo: bar</remarks>
        [JsiiEnumMember(""member2"")]
        Member2
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

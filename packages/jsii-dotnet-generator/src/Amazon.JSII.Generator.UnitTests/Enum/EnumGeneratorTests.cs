using Amazon.JSII.Generator.Enum;
using Amazon.JSII.Generator.Interface;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Xunit;
using System.Collections.Generic;

namespace Amazon.JSII.Generator.UnitTests.Enum
{
    public class EnumGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(InterfaceGenerator) + ".";

        string Render(EnumType enumType)
        {
            Symbols.MapTypeToPackage("myEnumFqn", enumType.Assembly);
            Symbols.MapNamespace(enumType.QualifiedNamespace, "MyNamespace");
            Symbols.MapTypeName("myEnumFqn", "MyEnum", JsonModel.Spec.TypeKind.Enum);

            EnumGenerator generator = new EnumGenerator(enumType.Assembly, enumType, Symbols, Namespaces);

            SyntaxTree syntaxTree = generator.CreateSyntaxTree();
            return syntaxTree.ToString();
        }

        [Fact(DisplayName = Prefix + nameof(IncludesAttribute))]
        public void IncludesAttribute()
        {
            EnumType enumType = new EnumType
            (
                fullyQualifiedName: "myEnumFqn",
                assembly: "myPackage",
                name: "myEnum",
                members: new EnumMember[] { }
            );

            string actual = Render(enumType);
            string expected =
@"namespace MyNamespace
{
    [JsiiEnum(nativeType: typeof(MyEnum), fullyQualifiedName: ""myEnumFqn"")]
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
                fullyQualifiedName: "myEnumFqn",
                assembly: "myPackage",
                name: "myEnum",
                members: new EnumMember[]
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
    [JsiiEnum(nativeType: typeof(MyEnum), fullyQualifiedName: ""myEnumFqn"")]
    public enum MyEnum
    {
        [JsiiEnumMember(name: ""member1"")]
        Member1,
        [JsiiEnumMember(name: ""member2"")]
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
                fullyQualifiedName: "myEnumFqn",
                assembly: "myPackage",
                name: "myEnum",
                members: new EnumMember[] { },
                docs: new Docs(custom: new Dictionary<string, string>{{"foo", "bar"}})
            );

            string actual = Render(enumType);
            string expected =
@"namespace MyNamespace
{
    /// <remarks>foo: bar</remarks>
    [JsiiEnum(nativeType: typeof(MyEnum), fullyQualifiedName: ""myEnumFqn"")]
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
                fullyQualifiedName: "myEnumFqn",
                assembly: "myPackage",
                name: "myEnum",
                members: new EnumMember[]
                {
                    new EnumMember("member1", docs: new Docs(custom: new Dictionary<string, string>{{"foo", "bar"}})),
                    new EnumMember("member2", docs: new Docs(custom: new Dictionary<string, string>{{"foo", "bar"}}))
                }
            );

            Symbols.MapEnumMemberName("myEnumFqn", "member1", "Member1");
            Symbols.MapEnumMemberName("myEnumFqn", "member2", "Member2");

            string actual = Render(enumType);
            string expected =
@"namespace MyNamespace
{
    [JsiiEnum(nativeType: typeof(MyEnum), fullyQualifiedName: ""myEnumFqn"")]
    public enum MyEnum
    {
        /// <remarks>foo: bar</remarks>
        [JsiiEnumMember(name: ""member1"")]
        Member1,
        /// <remarks>foo: bar</remarks>
        [JsiiEnumMember(name: ""member2"")]
        Member2
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

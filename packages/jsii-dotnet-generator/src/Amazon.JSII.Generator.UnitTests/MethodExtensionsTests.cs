using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NSubstitute;
using Xunit;

namespace Amazon.JSII.Generator.UnitTests
{
    public class MethodExtensionsTests
    {
        const string Prefix = nameof(Generator) + "." + nameof(MethodExtensions) + ".";

        public class GetParameterListSyntax : GeneratorTestBase
        {
            const string _Prefix = Prefix + nameof(MethodExtensions.GetParameterListSyntax) + ".";

            [Fact(DisplayName = _Prefix + nameof(IncludesAllParameters))]
            public void IncludesAllParameters()
            {
                Method method = new Method
                (
                    false,
                    false,
                    false,
                    name: "myMethod",
                    parameters: new[]
                    {
                        new Parameter(name: "myParam1", value: new TypeInstance(type: new TypeReference("myParamTypeFqn1"))),
                        new Parameter(name: "myParam2", value: new TypeInstance(type: new TypeReference("myParamTypeFqn2"))),
                    }
                );

                Symbols.MapTypeName("myParamTypeFqn1", "MyParamType1", JsonModel.Spec.TypeKind.Class);
                Symbols.MapTypeName("myParamTypeFqn2", "MyParamType2", JsonModel.Spec.TypeKind.Class);
                Symbols.MapParameterName("myParam1", "myParam1");
                Symbols.MapParameterName("myParam2", "myParam2");

                ParameterListSyntax syntax = method.GetParameterListSyntax(Namespaces, Symbols);

                string actual = syntax.NormalizeWhitespace(elasticTrivia: true).ToString();
                string expected = @"(MyParamType1 myParam1, MyParamType2 myParam2)";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = _Prefix + nameof(DoesNotThrowOnMissingParameterList))]
            public void DoesNotThrowOnMissingParameterList()
            {
                Method method = new Method
                (
                    false,
                    false,
                    false,
                    name: "myMethod"
                );

                ParameterListSyntax syntax = method.GetParameterListSyntax(Namespaces, Symbols);

                string actual = syntax.NormalizeWhitespace(elasticTrivia: true).ToString();
                string expected = @"()";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = _Prefix + nameof(AddsNamespacesToSet))]
            public void AddsNamespacesToSet()
            {
                Type paramType1 = new EnumType
                (
                    fullyQualifiedName: "myParamTypeFqn1",
                    assembly: "myPackage",
                    name: "myParamType",
                    members: new EnumMember[] { }
                );
                Type paramType2 = new EnumType
                (
                    fullyQualifiedName: "myParamTypeFqn2",
                    assembly: "myPackage",
                    name: "myParamType",
                    members: new EnumMember[] { }
                );
                Method method = new Method
                (
                    false,
                    false,
                    false,
                    name: "myMethod",
                    parameters: new[]
                    {
                        new Parameter(name: "myParam1", value: new TypeInstance(type: new TypeReference("myParamTypeFqn1"))),
                        new Parameter(name: "myParam2", value: new TypeInstance(type: new TypeReference("myParamTypeFqn2"))),
                    }
                );

                Symbols.MapTypeName("myParamTypeFqn1", "MyParamType1", JsonModel.Spec.TypeKind.Enum);
                Symbols.MapTypeName("myParamTypeFqn2", "MyParamType2", JsonModel.Spec.TypeKind.Enum);
                Symbols.MapFullyQualifiedNameToType("myParamTypeFqn1", paramType1);
                Symbols.MapFullyQualifiedNameToType("myParamTypeFqn2", paramType2);
                Symbols.MapNamespace("myNamespace1", "MyNamespace1");
                Symbols.MapNamespace("myNamespace2", "MyNamespace2");
                Symbols.MapParameterName("myParam1", "myParam1");
                Symbols.MapParameterName("myParam2", "myParam2");

                method.GetParameterListSyntax(Namespaces, Symbols);

                Namespaces.Received().Add(Arg.Is<TypeReference>(r => r.FullyQualifiedName == "myParamTypeFqn1"));
                Namespaces.Received().Add(Arg.Is<TypeReference>(r => r.FullyQualifiedName == "myParamTypeFqn2"));
            }
        }

        public class GetParametersJsonSyntaxToken : GeneratorTestBase
        {
            const string _Prefix = Prefix + nameof(MethodExtensions.GetParametersJsonSyntaxToken) + ".";

            [Fact(DisplayName = _Prefix + nameof(StripsDocs))]
            public void StripsDocs()
            {
                Method method = new Method
                (
                    isInitializer: false,
                    isProtected: false,
                    isAbstract: false,
                    name: "myMethod",
                    parameters: new[]
                    {
                        new Parameter
                        (
                            name: "myParam1",
                            value: new TypeInstance(type: new TypeReference("myParamTypeFqn1")),
                            docs: new Docs { { "foo", "bar" } }
                        ),
                        new Parameter
                        (
                            name: "myParam2",
                            value: new TypeInstance(type: new TypeReference("myParamTypeFqn2")),
                            docs: new Docs { { "foo", "bar" } }
                        )
                    }
                );

                SyntaxToken token = method.GetParametersJsonSyntaxToken();

                string actual = token.ToString();
                string expected = @"""[{\""name\"":\""myParam1\"",\""value\"":{\""type\"":{\""fqn\"":\""myParamTypeFqn1\""}}},{\""name\"":\""myParam2\"",\""value\"":{\""type\"":{\""fqn\"":\""myParamTypeFqn2\""}}}]""";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }
        }
    }
}

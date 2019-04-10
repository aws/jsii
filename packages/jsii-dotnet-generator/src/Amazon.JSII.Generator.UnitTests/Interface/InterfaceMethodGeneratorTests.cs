using Amazon.JSII.Generator.Interface;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NSubstitute;
using Xunit;

namespace Amazon.JSII.Generator.UnitTests.Interface
{
    public class InterfaceMethodGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(InterfaceMethodGenerator) + ".";

        string Render(Method method)
        {
            InterfaceType interfaceType = new InterfaceType
            (
                "myInterfaceFqn",
                "",
                "IMyInterface",
                "myNamespace",
                methods: new[] { method }
            );

            Symbols.MapMethodName("myInterfaceFqn", "myMethod", "MyMethod");
            Symbols.MapTypeName("myInterfaceFqn", "MyInterface", JsonModel.Spec.TypeKind.Interface);
            Symbols.MapTypeName("myReturnTypeFqn", "MyReturnType", JsonModel.Spec.TypeKind.Class);

            InterfaceMethodGenerator generator = new InterfaceMethodGenerator(interfaceType, method, Symbols, Namespaces);

            MethodDeclarationSyntax methodSyntax = generator.CreateMethod();
            return methodSyntax.NormalizeWhitespace(elasticTrivia: true).ToString();
        }

        [Fact(DisplayName = Prefix + nameof(RecordsReferencedReturnType))]
        public void RecordsReferencedReturnType()
        {
            Method method = new Method
            (
                isProtected: false,
                isAbstract: true,
                name: "myMethod",
                returns: new OptionalValue(type: new TypeReference(fullyQualifiedName: "myReturnTypeFqn"))
            );

            Render(method);
            Namespaces.Received().Add(Arg.Is<TypeReference>(t => t.FullyQualifiedName == "myReturnTypeFqn"));
        }

        [Fact(DisplayName = Prefix + nameof(RecordsReferencedParameterType))]
        public void RecordsReferencedParameterType()
        {
            Method method = new Method
            (
                isProtected: false,
                isAbstract: true,
                name: "myMethod",
                parameters: new[]
                {
                    new Parameter
                    (
                        name: "myParameter",
                        type: new TypeReference(fullyQualifiedName: "myParameterTypeFqn")
                    )
                }
            );

            Symbols.MapParameterName("myParameter", "myParameter");

            Render(method);

            Namespaces.Received().Add(Arg.Is<TypeReference>(t => t.FullyQualifiedName == "myParameterTypeFqn"));
        }

        [Fact(DisplayName = Prefix + nameof(GeneratesVoidMethodWithNoParameters))]
        public void GeneratesVoidMethodWithNoParameters()
        {
            Method method = new Method
            (
                isProtected: false,
                isAbstract: true,
                name: "myMethod"
            );

            string actual = Render(method);
            string expected =
@"[JsiiMethod(name: ""myMethod"")]
void MyMethod();";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(GeneratesPrimitiveParameters))]
        public void GeneratesPrimitiveParameters()
        {
            Method method = new Method
            (
                isProtected: false,
                isAbstract: true,
                name: "myMethod",
                parameters: new[]
                {
                    new Parameter
                    (
                        name: "myParameter1",
                        type: new TypeReference(primitive: PrimitiveType.String)
                    ),
                    new Parameter
                    (
                        name: "event",
                        type: new TypeReference(primitive: PrimitiveType.String)
                    ),
                }
            );

            Symbols.MapParameterName("myParameter1", "myParameter1");
            Symbols.MapParameterName("event", "@event");

            string actual = Render(method);
            string expected =
@"[JsiiMethod(name: ""myMethod"", parametersJson: ""[{\""name\"":\""myParameter1\"",\""type\"":{\""primitive\"":\""string\""}},{\""name\"":\""event\"",\""type\"":{\""primitive\"":\""string\""}}]"")]
void MyMethod(string myParameter1, string @event);";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(GeneratesPrimitiveReturnType))]
        public void GeneratesPrimitiveReturnType()
        {
            Method method = new Method
            (
                isProtected: false,
                isAbstract: true,
                name: "myMethod",
                returns: new OptionalValue(type: new TypeReference(primitive: PrimitiveType.String))
            );

            string actual = Render(method);
            string expected =
@"[JsiiMethod(name: ""myMethod"", returnsJson: ""{\""type\"":{\""primitive\"":\""string\""}}"")]
string MyMethod();";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

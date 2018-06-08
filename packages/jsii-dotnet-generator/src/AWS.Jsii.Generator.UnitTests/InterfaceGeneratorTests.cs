using AWS.Jsii.Generator.Interface;
using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Xunit;

namespace AWS.Jsii.Generator.UnitTests
{
    public class InterfaceGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(InterfaceGenerator) + ".";

        string Render(InterfaceType interfaceType)
        {
            Symbols.MapTypeToPackage("myInterfaceFqn", "myPackage");
            Symbols.MapNamespace("myNamespace", "MyNamespace");
            Symbols.MapTypeName("myInterfaceFqn", "MyInterface", kind: JsonModel.Spec.TypeKind.Interface);

            InterfaceGenerator generator = new InterfaceGenerator("myPackage", interfaceType, Symbols, Namespaces);

            SyntaxTree syntaxTree = generator.CreateSyntaxTree();
            return syntaxTree.ToString();
        }

        [Fact(DisplayName = Prefix + nameof(IncludesAttribute))]
        public void IncludesAttribute()
        {
            InterfaceType interfaceType = new InterfaceType
            (
                "myInterfaceFqn",
                "myPackage",
                "MyInterface",
                "myNamespace"
            );

            string actual = Render(interfaceType);
            string expected =
@"namespace MyNamespace
{
    [JsiiInterface(""myPackage"", ""myInterfaceFqn"")]
    public interface IMyInterface
    {
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesBaseInterfaces))]
        public void IncludesBaseInterfaces()
        {
            InterfaceType interfaceType = new InterfaceType
            (
                "myInterfaceFqn",
                "myPackage",
                "MyInterface",
                "myNamespace",
                interfaces: new[]
                {
                    new TypeReference(fullyQualifiedName: "myBaseFqn1"),
                    new TypeReference(fullyQualifiedName: "myBaseFqn2"),
                }
            );

            Symbols.MapTypeName("myBaseFqn1", "MyBaseInterface1", kind: JsonModel.Spec.TypeKind.Interface);
            Symbols.MapTypeName("myBaseFqn2", "MyBaseInterface2", kind: JsonModel.Spec.TypeKind.Interface);

            string actual = Render(interfaceType);
            string expected =
@"namespace MyNamespace
{
    [JsiiInterface(""myPackage"", ""myInterfaceFqn"")]
    public interface IMyInterface : IMyBaseInterface1, IMyBaseInterface2
    {
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesMethods))]
        public void IncludesMethods()
        {
            InterfaceType interfaceType = new InterfaceType
            (
                "myInterfaceFqn",
                "",
                "MyInterface",
                "myNamespace",
                methods: new Method[] { new Method(false, false, false, name: "myMethod") }
            );

            Symbols.MapMethodName("myInterfaceFqn", "myMethod", "MyMethod");

            string actual = Render(interfaceType);
            string expected =
@"namespace MyNamespace
{
    [JsiiInterface(""myPackage"", ""myInterfaceFqn"")]
    public interface IMyInterface
    {
        [JsiiMethod(""myMethod"", null, ""[]"")]
        void MyMethod();
    }
}";

            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

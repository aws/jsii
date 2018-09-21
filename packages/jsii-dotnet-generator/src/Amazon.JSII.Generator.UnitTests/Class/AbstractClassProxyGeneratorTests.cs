using Amazon.JSII.Generator.Class;
using Amazon.JSII.JsonModel.Spec;
using Xunit;

namespace Amazon.JSII.Generator.UnitTests.Class
{
    public class AbstractClassProxyGeneratorTests : GeneratorTestBase
    {
        private const string Prefix = nameof(Generator) + "." + nameof(AbstractClassProxyGenerator) + ".";

        private string Render(ClassType classType)
        {
            Symbols.MapTypeToPackage("myFqn", classType.Assembly);
            Symbols.MapNamespace(classType.QualifiedNamespace, "MyNamespace");
            Symbols.MapTypeName("myFqn", "MyClass", TypeKind.Class);

            var generator = new AbstractClassProxyGenerator(classType.Assembly, classType, Symbols, Namespaces);

            var syntaxTree = generator.CreateSyntaxTree();
            return syntaxTree.ToString();
        }

        [Fact(DisplayName = Prefix + nameof(IncludesAttribute))]
        public void IncludesAttribute()
        {
            var classType = new ClassType
            (
                "myFqn",
                "myPackage",
                "myClass",
                true,
                initializer: new Method(true, false, false)
            );

            var actual = Render(classType);
            var expected =
                @"namespace MyNamespace
{
    [JsiiInterfaceProxy(typeof(MyClass), ""myFqn"")]
    internal class MyClassProxy : MyClass
    {
        private MyClassProxy(ByRefValue reference): base(reference)
        {
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesDocs))]
        public void IncludesDocs()
        {
            // Docs are not currently generated as part of the C# code.
            ClassType classType = new ClassType
            (
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: true,
                initializer: new Method(true, false, false),
                docs: new Docs {{"foo", "bar"}}
            );

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    /// <remarks>foo: bar</remarks>
    [JsiiInterfaceProxy(typeof(MyClass), ""myFqn"")]
    internal class MyClassProxy : MyClass
    {
        private MyClassProxy(ByRefValue reference): base(reference)
        {
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesProperties))]
        public void IncludesProperties()
        {
            ClassType classType = new ClassType
            (
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: true,
                initializer: new Method(true, false, false),
                properties: new[]
                {
                    new Property
                    (
                        name: "myProp",
                        type: new TypeReference("myPropTypeFqn"),
                        isImmutable: false,
                        isAbstract: true,
                        isProtected: false
                    ),
                    new Property
                    (
                        name: "notMyProp",
                        type: new TypeReference("myPropTypeFqn"),
                        isImmutable: false,
                        isAbstract: false,
                        isProtected: false
                    )
                }
            );

            Symbols.MapTypeName("myPropTypeFqn", "MyPropType", TypeKind.Class);
            Symbols.MapPropertyName("myFqn", "myProp", "MyProp");

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiInterfaceProxy(typeof(MyClass), ""myFqn"")]
    internal class MyClassProxy : MyClass
    {
        private MyClassProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(""myProp"", ""{\""fqn\"":\""myPropTypeFqn\""}"")]
        public override MyPropType MyProp
        {
            get => GetInstanceProperty<MyPropType>();
            set => SetInstanceProperty(value);
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesMethods))]
        public void IncludesMethods()
        {
            ClassType classType = new ClassType
            (
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: true,
                initializer: new Method(true, false, false),
                methods: new[]
                {
                    new Method
                    (
                        false,
                        false,
                        true,
                        name: "myMethod"
                    ),
                    new Method
                    (
                        false,
                        false,
                        false,
                        name: "notMyMethod"
                    )
                }
            );

            Symbols.MapMethodName("myFqn", "myMethod", "MyMethod");

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiInterfaceProxy(typeof(MyClass), ""myFqn"")]
    internal class MyClassProxy : MyClass
    {
        private MyClassProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(""myMethod"", null, ""[]"")]
        public override void MyMethod()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}
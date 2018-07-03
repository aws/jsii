using AWS.Jsii.Generator.Class;
using AWS.Jsii.Generator.Interface;
using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Xunit;

namespace AWS.Jsii.Generator.UnitTests
{
    public class ClassGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(InterfaceGenerator) + ".";

        string Render(ClassType classType)
        {
            Symbols.MapTypeToPackage("myFqn", "myPackage");
            Symbols.MapNamespace("myNamespace", "MyNamespace");
            Symbols.MapTypeName("myFqn", "MyClass", JsonModel.Spec.TypeKind.Class);

            ClassGenerator generator = new ClassGenerator("myPackage", classType, Symbols, Namespaces);

            SyntaxTree syntaxTree = generator.CreateSyntaxTree();
            return syntaxTree.ToString();
        }

        [Fact(DisplayName = Prefix + nameof(IncludesAttribute))]
        public void IncludesAttribute()
        {
            ClassType classType = new ClassType
            (
                "myFqn",
                "myPackage",
                "myClass",
                "myNamespace",
                false,
                initializer: new Method(true, false, false)
            );

            string actual = Render(classType);
            string expected =
@"namespace MyNamespace
{
    [JsiiClass(""myPackage"", ""myFqn"", ""[]"")]
    public class MyClass : DeputyBase
    {
        public MyClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected MyClass(ByRefValue reference): base(reference)
        {
        }

        protected MyClass(DeputyProps props): base(props)
        {
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesAbstractKeyword))]
        public void IncludesAbstractKeyword()
        {
            ClassType classType = new ClassType
            (
                "myFqn",
                "myPackage",
                "myClass",
                "myNamespace",
                true,
                initializer: new Method(true, false, false)
            );

            string actual = Render(classType);
            string expected =
@"namespace MyNamespace
{
    [JsiiClass(""myPackage"", ""myFqn"", ""[]"")]
    public abstract class MyClass : DeputyBase
    {
        protected MyClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected MyClass(ByRefValue reference): base(reference)
        {
        }

        protected MyClass(DeputyProps props): base(props)
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
                "myFqn",
                "myPackage",
                "myClass",
                "myNamespace",
                false,
                initializer: new Method(true, false, false),
                docs: new Docs { { "foo", "bar" } }
            );

            string actual = Render(classType);
            string expected =
@"namespace MyNamespace
{
    /// <remarks>foo: bar</remarks>
    [JsiiClass(""myPackage"", ""myFqn"", ""[]"")]
    public class MyClass : DeputyBase
    {
        public MyClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected MyClass(ByRefValue reference): base(reference)
        {
        }

        protected MyClass(DeputyProps props): base(props)
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
                "myFqn",
                "myPackage",
                "myClass",
                "myNamespace",
                false,
                initializer: new Method(true, false, false),
                properties: new[]
                {
                    new Property
                    (
                        name: "myProp", 
                        type: new TypeReference("myPropTypeFqn"),
                        isImmutable: false,
                        isAbstract: false,
                        isProtected: false
                    )
                }
            );

            Symbols.MapTypeName("myPropTypeFqn", "MyPropType", JsonModel.Spec.TypeKind.Class);
            Symbols.MapPropertyName("myFqn", "myProp", "MyProp");

            string actual = Render(classType);
            string expected =
@"namespace MyNamespace
{
    [JsiiClass(""myPackage"", ""myFqn"", ""[]"")]
    public class MyClass : DeputyBase
    {
        public MyClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected MyClass(ByRefValue reference): base(reference)
        {
        }

        protected MyClass(DeputyProps props): base(props)
        {
        }

        [JsiiProperty(""myProp"", ""{\""fqn\"":\""myPropTypeFqn\""}"")]
        public virtual MyPropType MyProp
        {
            get => GetProperty<MyPropType>();
            set => SetProperty(value);
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
                "myFqn",
                "myPackage",
                "myClass",
                "myNamespace",
                false,
                initializer: new Method(true, false, false),
                methods: new[]
                {
                    new Method
                    (
                        false,
                        false,
                        false,
                        name: "myMethod"
                    )
                }
            );

            Symbols.MapMethodName("myFqn", "myMethod", "MyMethod");

            string actual = Render(classType);
            string expected =
@"namespace MyNamespace
{
    [JsiiClass(""myPackage"", ""myFqn"", ""[]"")]
    public class MyClass : DeputyBase
    {
        public MyClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected MyClass(ByRefValue reference): base(reference)
        {
        }

        protected MyClass(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(""myMethod"", null, ""[]"")]
        public virtual void MyMethod()
        {
            InvokeVoidMethod(new object[]{});
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesBase))]
        public void IncludesBase()
        {
            ClassType classType = new ClassType
            (
                "myFqn",
                "myPackage",
                "myClass",
                "myNamespace",
                false,
                initializer: new Method(true, false, false),
                @base: new TypeReference("myBaseTypeFqn")
            );

            Symbols.MapTypeName("myBaseTypeFqn", "MyBaseType", JsonModel.Spec.TypeKind.Class);

            string actual = Render(classType);
            string expected =
@"namespace MyNamespace
{
    [JsiiClass(""myPackage"", ""myFqn"", ""[]"")]
    public class MyClass : MyBaseType
    {
        public MyClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected MyClass(ByRefValue reference): base(reference)
        {
        }

        protected MyClass(DeputyProps props): base(props)
        {
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesInterfaces))]
        public void IncludesInterfaces()
        {
            ClassType classType = new ClassType
            (
                "myFqn",
                "myPackage",
                "myClass",
                "myNamespace",
                false,
                initializer: new Method(true, false, false),
                interfaces: new[]
                {
                    new TypeReference("myInterfaceFqn1"),
                    new TypeReference("myInterfaceFqn2"),
                }
            );

            Symbols.MapTypeName("myInterfaceFqn1", "MyInterface1", JsonModel.Spec.TypeKind.Interface);
            Symbols.MapTypeName("myInterfaceFqn2", "MyInterface2", JsonModel.Spec.TypeKind.Interface);

            string actual = Render(classType);
            string expected =
@"namespace MyNamespace
{
    [JsiiClass(""myPackage"", ""myFqn"", ""[]"")]
    public class MyClass : DeputyBase, IMyInterface1, IMyInterface2
    {
        public MyClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected MyClass(ByRefValue reference): base(reference)
        {
        }

        protected MyClass(DeputyProps props): base(props)
        {
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

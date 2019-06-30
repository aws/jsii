using Amazon.JSII.Generator.Class;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Xunit;
using TypeKind = Amazon.JSII.JsonModel.Spec.TypeKind;
using System.Collections.Generic;

namespace Amazon.JSII.Generator.UnitTests.Class
{
    public class ClassGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(ClassGenerator) + ".";

        private string Render(ClassType classType)
        {
            Symbols.MapTypeToPackage("myFqn", classType.Assembly);
            Symbols.MapNamespace(classType.QualifiedNamespace, "MyNamespace");
            Symbols.MapTypeName("myFqn", "MyClass", TypeKind.Class);

            ClassGenerator generator = new ClassGenerator(classType.Assembly, classType, Symbols, Namespaces);

            SyntaxTree syntaxTree = generator.CreateSyntaxTree();
            return syntaxTree.ToString();
        }

        [Fact(DisplayName = Prefix + nameof(IncludesAttribute))]
        public void IncludesAttribute()
        {
            ClassType classType = new ClassType
            (
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: false,
                initializer: new Initializer()
            );

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiClass(nativeType: typeof(MyClass), fullyQualifiedName: ""myFqn"")]
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

        [Fact(DisplayName = Prefix + nameof(AllowsPrivateConstructor))]
        public void AllowsPrivateConstructor()
        {
            ClassType classType = new ClassType
            (
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: false
            );

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiClass(nativeType: typeof(MyClass), fullyQualifiedName: ""myFqn"")]
    public class MyClass : DeputyBase
    {
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
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: true,
                initializer: new Initializer()
            );

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiClass(nativeType: typeof(MyClass), fullyQualifiedName: ""myFqn"")]
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
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: false,
                initializer: new Initializer(),
                docs: new Docs(custom: new Dictionary<string, string>{{"foo", "bar"}})
            );

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    /// <remarks>foo: bar</remarks>
    [JsiiClass(nativeType: typeof(MyClass), fullyQualifiedName: ""myFqn"")]
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
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: false,
                initializer: new Initializer(),
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

            Symbols.MapTypeName("myPropTypeFqn", "MyPropType", TypeKind.Class);
            Symbols.MapPropertyName("myFqn", "myProp", "MyProp");

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiClass(nativeType: typeof(MyClass), fullyQualifiedName: ""myFqn"")]
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

        [JsiiProperty(name: ""myProp"", typeJson: ""{\""fqn\"":\""myPropTypeFqn\""}"")]
        public virtual MyPropType MyProp
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
                isAbstract: false,
                initializer: new Initializer(),
                methods: new[]
                {
                    new Method
                    (
                        name: "myMethod"
                    )
                }
            );

            Symbols.MapMethodName("myFqn", "myMethod", "MyMethod");

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiClass(nativeType: typeof(MyClass), fullyQualifiedName: ""myFqn"")]
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

        [JsiiMethod(name: ""myMethod"")]
        public virtual void MyMethod()
        {
            InvokeInstanceVoidMethod(new object[]{});
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
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: false,
                initializer: new Initializer(),
                @base: "myBaseTypeFqn"
            );

            Symbols.MapTypeName("myBaseTypeFqn", "MyBaseType", TypeKind.Class);

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiClass(nativeType: typeof(MyClass), fullyQualifiedName: ""myFqn"")]
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
                fullyQualifiedName: "myFqn",
                assembly: "myPackage",
                name: "myClass",
                isAbstract: false,
                initializer: new Initializer(),
                interfaces: new[]
                {
                    "myInterfaceFqn1",
                    "myInterfaceFqn2",
                }
            );

            Symbols.MapTypeName("myInterfaceFqn1", "MyInterface1", TypeKind.Interface);
            Symbols.MapTypeName("myInterfaceFqn2", "MyInterface2", TypeKind.Interface);

            string actual = Render(classType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiClass(nativeType: typeof(MyClass), fullyQualifiedName: ""myFqn"")]
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
using Amazon.JSII.Generator.Class;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Xunit;

namespace Amazon.JSII.Generator.UnitTests.Class
{
    public class ClassMethodGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(ClassMethodGenerator) + ".";

        string Render(Method method)
        {
            ClassType classType = new ClassType
            (
                fullyQualifiedName: "myClassFqn",
                assembly: "myModule",
                name: "myClass",
                isAbstract: true,
                initializer: new Method(true, false, false),
                methods: new[] { method }
            );

            Symbols.MapTypeToPackage("myClassFqn", "myPackage");
            Symbols.MapNamespace("myNamespace", "MyNamespace");
            Symbols.MapTypeName("myClassFqn", "MyClass", JsonModel.Spec.TypeKind.Class);

            ClassMethodGenerator generator = new ClassMethodGenerator(classType, method, Symbols, Namespaces);

            MethodDeclarationSyntax methodSyntax = generator.CreateMethod();
            return methodSyntax.NormalizeWhitespace(elasticTrivia: true).ToString();
        }

        [Fact(DisplayName = Prefix + nameof(IncludesProtectedKeyword))]
        public void IncludesAttribute()
        {
            Method method = new Method(false, false, false, name: "myMethod");

            Symbols.MapMethodName("myClassFqn", "myMethod", "MyMethod");

            string actual = Render(method);
            string expected =
@"[JsiiMethod(""myMethod"", null, ""[]"")]
public virtual void MyMethod()
{
    InvokeInstanceVoidMethod(new object[]{});
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesProtectedKeyword))]
        public void IncludesProtectedKeyword()
        {
            Method method = new Method(false, true, false, name: "myMethod");

            Symbols.MapMethodName("myClassFqn", "myMethod", "MyMethod");

            string actual = Render(method);
            string expected =
@"[JsiiMethod(""myMethod"", null, ""[]"")]
protected virtual void MyMethod()
{
    InvokeInstanceVoidMethod(new object[]{});
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesAbstractKeyword))]
        public void IncludesAbstractKeyword()
        {
            Method method = new Method(false, false, true, name: "myMethod");

            Symbols.MapMethodName("myClassFqn", "myMethod", "MyMethod");

            string actual = Render(method);
            string expected =
@"[JsiiMethod(""myMethod"", null, ""[]"")]
public abstract void MyMethod();";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncluesParameters))]
        public void IncluesParameters()
        {
            Method method = new Method
            (
                false, false, false, name: "myMethod",
                parameters: new[]
                {
                    new Parameter(name: "myParam", value: new TypeInstance(type: new TypeReference("myParamTypeFqn"))),
                    new Parameter(name: "event", value: new TypeInstance(type: new TypeReference(primitive: PrimitiveType.String)))
                }
            );

            Symbols.MapMethodName("myClassFqn", "myMethod", "MyMethod");
            Symbols.MapTypeName("myParamTypeFqn", "MyParamType", JsonModel.Spec.TypeKind.Class);
            Symbols.MapParameterName("myParam", "myParam");
            Symbols.MapParameterName("event", "@event");

            string actual = Render(method);
            string expected =
@"[JsiiMethod(""myMethod"", null, ""[{\""name\"":\""myParam\"",\""value\"":{\""type\"":{\""fqn\"":\""myParamTypeFqn\""}}},{\""name\"":\""event\"",\""value\"":{\""type\"":{\""primitive\"":\""string\""}}}]"")]
public virtual void MyMethod(MyParamType myParam, string @event)
{
    InvokeInstanceVoidMethod(new object[]{myParam, @event});
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(DoesNotIncludeDocs))]
        public void DoesNotIncludeDocs()
        {
            Method method = new Method
            (
                false, false, false, name: "myMethod",
                docs: new Docs { { "foo", "bar" } }
            );

            Symbols.MapMethodName("myClassFqn", "myMethod", "MyMethod");

            string actual = Render(method);
            string expected =
@"[JsiiMethod(""myMethod"", null, ""[]"")]
public virtual void MyMethod()
{
    InvokeInstanceVoidMethod(new object[]{});
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesReturnTypeForNonVoid))]
        public void IncludesReturnTypeForNonVoid()
        {
            Method method = new Method
            (
                isInitializer: false,
                isProtected: false,
                isAbstract: false,
                name: "myMethod",
                returns: new TypeInstance(type: new TypeReference("myReturnTypeFqn"))
            );

            Symbols.MapMethodName("myClassFqn", "myMethod", "MyMethod");
            Symbols.MapTypeName("myReturnTypeFqn", "MyReturnType", JsonModel.Spec.TypeKind.Class);

            string actual = Render(method);
            string expected =
@"[JsiiMethod(""myMethod"", ""{\""type\"":{\""fqn\"":\""myReturnTypeFqn\""}}"", ""[]"")]
public virtual MyReturnType MyMethod()
{
    return InvokeInstanceMethod<MyReturnType>(new object[]{});
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(SupportsStaticMethods))]
        public void SupportsStaticMethods()
        {
            Method method = new Method
            (
                isInitializer: false,
                isProtected: false,
                isAbstract: false,
                name: "myMethod",
                returns: new TypeInstance(type: new TypeReference("myReturnTypeFqn")),
                isStatic: true
            );

            Symbols.MapMethodName("myClassFqn", "myMethod", "MyMethod");
            Symbols.MapTypeName("myReturnTypeFqn", "MyReturnType", JsonModel.Spec.TypeKind.Class);

            string actual = Render(method);
            string expected =
@"[JsiiMethod(""myMethod"", ""{\""type\"":{\""fqn\"":\""myReturnTypeFqn\""}}"", ""[]"")]
public static MyReturnType MyMethod()
{
    return InvokeStaticMethod<MyReturnType>(typeof(MyClass), new object[]{});
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

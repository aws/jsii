﻿using AWS.Jsii.Generator.Class;
using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Xunit;

namespace AWS.Jsii.Generator.UnitTests
{
    public class ClassMethodGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(ClassMethodGenerator) + ".";

        string Render(Method method)
        {
            ClassType classType = new ClassType
            (
                "myClassFqn",
                "myModule",
                "myClass",
                "myNamespace",
                true,
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
    InvokeVoidMethod(new object[]{});
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
    InvokeVoidMethod(new object[]{});
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
                    new Parameter("myParam", new TypeReference("myParamTypeFqn")),
                    new Parameter("event", new TypeReference(primitive: PrimitiveType.String))
                }
            );

            Symbols.MapMethodName("myClassFqn", "myMethod", "MyMethod");
            Symbols.MapTypeName("myParamTypeFqn", "MyParamType", JsonModel.Spec.TypeKind.Class);
            Symbols.MapParameterName("myParam", "myParam");
            Symbols.MapParameterName("event", "@event");

            string actual = Render(method);
            string expected =
@"[JsiiMethod(""myMethod"", null, ""[{\""name\"":\""myParam\"",\""type\"":{\""fqn\"":\""myParamTypeFqn\""}},{\""name\"":\""event\"",\""type\"":{\""primitive\"":\""string\""}}]"")]
public virtual void MyMethod(MyParamType myParam, string @event)
{
    InvokeVoidMethod(new object[]{myParam, @event});
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
    InvokeVoidMethod(new object[]{});
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesReturnTypeForNonVoid))]
        public void IncludesReturnTypeForNonVoid()
        {
            Method method = new Method
            (
                false, false, false, name: "myMethod",
                returns: new TypeReference("myReturnTypeFqn")
            );

            Symbols.MapMethodName("myClassFqn", "myMethod", "MyMethod");
            Symbols.MapTypeName("myReturnTypeFqn", "MyReturnType", JsonModel.Spec.TypeKind.Class);

            string actual = Render(method);
            string expected =
@"[JsiiMethod(""myMethod"", ""{\""fqn\"":\""myReturnTypeFqn\""}"", ""[]"")]
public virtual MyReturnType MyMethod()
{
    return InvokeMethod<MyReturnType>(new object[]{});
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}

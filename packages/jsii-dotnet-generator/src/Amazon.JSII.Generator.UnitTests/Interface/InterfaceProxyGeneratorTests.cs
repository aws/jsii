using Amazon.JSII.Generator.Interface;
using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Newtonsoft.Json;
using Xunit;
using TypeKind = Amazon.JSII.JsonModel.Spec.TypeKind;

namespace Amazon.JSII.Generator.UnitTests.Interface
{
    public class InterfaceProxyGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(InterfaceProxyGenerator) + ".";

        string Render(InterfaceType interfaceType, string package = "myPackage", string @namespace = "MyNamespace",
            string typeName = "MyInterface")
        {
            Symbols.MapTypeToPackage(interfaceType.FullyQualifiedName, package);
            string suffix = interfaceType.Namespace != null ? "." + interfaceType.Namespace : "";
            Symbols.MapNamespace(interfaceType.Assembly + suffix, @namespace);
            Symbols.MapTypeName(interfaceType.FullyQualifiedName, typeName, TypeKind.Interface);

            var generator = new InterfaceProxyGenerator(package, interfaceType, Symbols, Namespaces);

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
                "myInterface",
                "myNamespace",
                methods: new Method[] { }
            );

            string actual = Render(interfaceType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiTypeProxy(typeof(IMyInterface), ""myInterfaceFqn"")]
    internal sealed class MyInterfaceProxy : DeputyBase, IMyInterface
    {
        private MyInterfaceProxy(ByRefValue reference): base(reference)
        {
        }
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
                "myPackage",
                "myInterface",
                "myNamespace",
                methods: new Method[] {new Method(false, false, true, name: "myMethod")}
            );

            Symbols.MapMethodName("myInterfaceFqn", "myMethod", "MyMethod");

            string actual = Render(interfaceType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiTypeProxy(typeof(IMyInterface), ""myInterfaceFqn"")]
    internal sealed class MyInterfaceProxy : DeputyBase, IMyInterface
    {
        private MyInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(""myMethod"", null, ""[]"")]
        public void MyMethod()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesAncestorInterfaceMethods))]
        public void IncludesAncestorInterfaceMethods()
        {
            InterfaceType ancestorInterface = new InterfaceType
            (
                "myAncestorInterfaceFqn",
                "myPackage",
                "myAncestorInterface",
                "myNamespace",
                methods: new[] {new Method(false, false, true, name: "myAncestorMethod")}
            );
            InterfaceType baseInterface = new InterfaceType
            (
                "myBaseInterfaceFqn",
                "myPackage",
                "myBaseInterface",
                "myNamespace",
                methods: new[] {new Method(false, false, true, name: "myBaseMethod")},
                interfaces: new[] {new TypeReference("myAncestorInterfaceFqn")}
            );
            InterfaceType interfaceType = new InterfaceType
            (
                "myInterfaceFqn",
                "myPackage",
                "myInterface",
                "myNamespace",
                interfaces: new[] {new TypeReference("myBaseInterfaceFqn")}
            );

            Symbols.MapTypeName("myAncestorInterfaceFqn", "MyAncestorInterface", TypeKind.Interface);
            Symbols.MapFullyQualifiedNameToType("myAncestorInterfaceFqn", ancestorInterface);
            Symbols.MapMethodName("myInterfaceFqn", "myAncestorMethod", "MyAncestorMethod");

            Symbols.MapTypeName("myBaseInterfaceFqn", "MyBaseInterface", TypeKind.Interface);
            Symbols.MapFullyQualifiedNameToType("myBaseInterfaceFqn", baseInterface);
            Symbols.MapMethodName("myInterfaceFqn", "myBaseMethod", "MyBaseMethod");

            string actual = Render(interfaceType);
            string expected =
                @"namespace MyNamespace
{
    [JsiiTypeProxy(typeof(IMyInterface), ""myInterfaceFqn"")]
    internal sealed class MyInterfaceProxy : DeputyBase, IMyInterface
    {
        private MyInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(""myBaseMethod"", null, ""[]"")]
        public void MyBaseMethod()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(""myAncestorMethod"", null, ""[]"")]
        public void MyAncestorMethod()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(IncludesDocs))]
        public void IncludesDocs()
        {
            InterfaceType interfaceType = new InterfaceType
            (
                "myInterfaceFqn",
                "myPackage",
                "myInterface",
                "myNamespace",
                docs: new Docs {{"foo", "bar"}}
            );

            string actual = Render(interfaceType);
            string expected =
                @"namespace MyNamespace
{
    /// <remarks>foo: bar</remarks>
    [JsiiTypeProxy(typeof(IMyInterface), ""myInterfaceFqn"")]
    internal sealed class MyInterfaceProxy : DeputyBase, IMyInterface
    {
        private MyInterfaceProxy(ByRefValue reference): base(reference)
        {
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }

        [Fact(DisplayName = Prefix + nameof(EnvironmentRegression))]
        public void EnvironmentRegression()
        {
            const string json =
                @"    {
      ""docs"": {
        ""summary"": ""Models an AWS execution environment, for use within the CDK toolkit.""
      },
      ""kind"": ""interface"",
      ""properties"": [
        {
          ""docs"": {
            ""summary"": ""The arbitrary name of this environment (user-set, or at least user-meaningful) ""
          },
          ""abstract"": true,
          ""name"": ""name"",
          ""value"": {
            ""type"": {
              ""primitive"": ""string""
            }
          }
        },
        {
          ""docs"": {
            ""summary"": ""The 12-digit AWS account ID for the account this environment deploys into ""
          },
          ""abstract"": true,
          ""name"": ""account"", 
          ""value"": {
            ""type"": {
              ""primitive"": ""string""
            }
          }
        },
        {
          ""docs"": {
            ""summary"": ""The AWS region name where this environment deploys into ""
          },
          ""abstract"": true,
          ""name"": ""region"",
          ""value"": {
            ""type"": {
              ""primitive"": ""string""
            }
          }
        }
      ],
      ""fqn"": ""jsii$aws_cdk_cx_api$.Environment"",
      ""assembly"": ""jsii$aws_cdk_cx_api$"",
      ""namespace"": ""jsii$aws_cdk_cx_api$"",
      ""name"": ""Environment"",
      ""datatype"": true
    }";

            InterfaceType interfaceType = JsonConvert.DeserializeObject<InterfaceType>(json);

            Symbols.MapPropertyName("jsii$aws_cdk_cx_api$.Environment", "name", "Name");
            Symbols.MapPropertyName("jsii$aws_cdk_cx_api$.Environment", "account", "Account");
            Symbols.MapPropertyName("jsii$aws_cdk_cx_api$.Environment", "region", "Region");

            string actual = Render(interfaceType, package: "aws-cdk-cx-api", @namespace: "Aws.Cdk.CxApi",
                typeName: "Environment");
            string expected =
                @"namespace Aws.Cdk.CxApi
{
    /// <summary>Models an AWS execution environment, for use within the CDK toolkit.</summary>
    [JsiiTypeProxy(typeof(IEnvironment), ""jsii$aws_cdk_cx_api$.Environment"")]
    internal sealed class EnvironmentProxy : DeputyBase, IEnvironment
    {
        private EnvironmentProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The arbitrary name of this environment (user-set, or at least user-meaningful) </summary>
        [JsiiProperty(""name"", ""{\""type\"":{\""primitive\"":\""string\""}}"")]
        public string Name
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <summary>The 12-digit AWS account ID for the account this environment deploys into </summary>
        [JsiiProperty(""account"", ""{\""type\"":{\""primitive\"":\""string\""}}"")]
        public string Account
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <summary>The AWS region name where this environment deploys into </summary>
        [JsiiProperty(""region"", ""{\""type\"":{\""primitive\"":\""string\""}}"")]
        public string Region
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}";
            Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
        }
    }
}
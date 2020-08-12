using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;
using System.Linq;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.JsonModel
{
    public class ClassTypeTests
    {
        const string RootPrefix = nameof(JsonModel) + "." + nameof(ClassType) + ".";

        public class Serialization : TestUtils
        {
            const string Prefix = RootPrefix + "Serialization.";

            [Fact(DisplayName = Prefix + nameof(ShouldSerializeAllMembers))]
            public void ShouldSerializeAllMembers()
            {
                ClassType classType = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: "myBaseFqn",
                    initializer: new Initializer(),
                    interfaces: new string[] { }
                );

                string actual = ToJson(classType);
                const string expected = @"{
  ""abstract"": true,
  ""base"": ""myBaseFqn"",
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingFullyQualifiedName))]
            public void ShouldThrowOnMissingFullyQualifiedName()
            {
                Assert.Throws<ArgumentNullException>(() => new ClassType
                (
#pragma warning disable CS8625
                    fullyQualifiedName: null,
#pragma warning restore CS8625
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: "myBaseFqn",
                    initializer: new Initializer(),
                    interfaces: new string[] { }
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingAssembly))]
            public void ShouldThrowOnMissingAssembly()
            {
                Assert.Throws<ArgumentNullException>(() => new ClassType
                (
                    fullyQualifiedName: "myFqn",
#pragma warning disable CS8625
                    assembly: null,
#pragma warning restore CS8625
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: "myBaseFqn",
                    initializer: new Initializer(),
                    interfaces: new string[] { }
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
                Assert.Throws<ArgumentNullException>(() => new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
#pragma warning disable CS8625
                    name: null,
#pragma warning restore CS8625
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: "myBaseFqn",
                    initializer: new Initializer(),
                    interfaces: new string[] { }
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingNamespace))]
            public void ShouldNotSerializeMissingNamespace()
            {
                ClassType classType = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: null,
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: "myBaseFqn",
                    initializer: new Initializer(),
                    interfaces: new string[] { }
                );
                string actual = ToJson(classType);
                const string expected = @"{
  ""abstract"": true,
  ""base"": ""myBaseFqn"",
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""kind"": ""class"",
  ""docs"": {}
}";
                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingDocs))]
            public void ShouldNotSerializeMissingDocs()
            {
                ClassType classType = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: "myBaseFqn",
                    initializer: new Initializer(),
                    interfaces: new string[] { }
                );

                string actual = ToJson(classType);
                const string expected = @"{
  ""abstract"": true,
  ""base"": ""myBaseFqn"",
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class""
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingProperties))]
            public void ShouldNotSerializeMissingProperties()
            {
                ClassType classType = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    methods: new Method[] { },
                    @base: "myBaseFqn",
                    initializer: new Initializer(),
                    interfaces: new string[] { }
                );

                string actual = ToJson(classType);
                const string expected = @"{
  ""abstract"": true,
  ""base"": ""myBaseFqn"",
  ""initializer"": {},
  ""methods"": [],
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingMethods))]
            public void ShouldNotSerializeMissingMethods()
            {
                ClassType classType = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    @base: "myBaseFqn",
                    initializer: new Initializer(),
                    interfaces: new string[] { }
                );

                string actual = ToJson(classType);
                const string expected = @"{
  ""abstract"": true,
  ""base"": ""myBaseFqn"",
  ""initializer"": {},
  ""properties"": [],
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingBase))]
            public void ShouldNotSerializeMissingBase()
            {
                ClassType classType = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    initializer: new Initializer(),
                    interfaces: new string[] { }
                );

                string actual = ToJson(classType);
                const string expected = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingInitializer))]
            public void ShouldNotSerializeMissingInitializer()
            {
                ClassType classType = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: "myBaseFqn",
                    interfaces: new string[] { }
                );

                string actual = ToJson(classType);
                const string expected = @"{
  ""abstract"": true,
  ""base"": ""myBaseFqn"",
  ""properties"": [],
  ""methods"": [],
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingInterfaces))]
            public void ShouldNotSerializeMissingInterfaces()
            {
                ClassType classType = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: "myBaseFqn",
                    initializer: new Initializer()
                );

                string actual = ToJson(classType);
                const string expected = @"{
  ""abstract"": true,
  ""base"": ""myBaseFqn"",
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }
        }

        public class Deserialization
        {
            const string Prefix = RootPrefix + "Deserialization.";

            [Fact(DisplayName = Prefix + nameof(ShouldDeserializeAllMembers))]
            public void ShouldDeserializeAllMembers()
            {
                const string json = @"{
  ""abstract"": true,
  ""base"": ""myBaseFqn"",
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": { ""summary"": ""hello"" }
}";

                ClassType actual = JsonConvert.DeserializeObject<ClassType>(json);

                Assert.True(actual.IsAbstract);
                Assert.Empty(actual.Properties);
                Assert.Empty(actual.Methods);
                Assert.NotNull(actual.Base);
                Assert.NotNull(actual.Initializer);
                Assert.Empty(actual.Interfaces);
                Assert.Equal("myFqn", actual.FullyQualifiedName, ignoreLineEndingDifferences: true);
                Assert.Equal("myModule", actual.Assembly, ignoreLineEndingDifferences: true);
                Assert.Equal("myName", actual.Name, ignoreLineEndingDifferences: true);
                Assert.Equal("myNamespace", actual.Namespace, ignoreLineEndingDifferences: true);
                Assert.Equal(TypeKind.Class, actual.Kind);
                Assert.Equal("hello", actual.Docs?.Summary);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingFullyQualifiedName))]
            public void ShouldThrowOnMissingFullyQualifiedName()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""base"": ""myBaseFqn"",
  ""interfaces"": [],
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<ClassType>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingAssembly))]
            public void ShouldThrowOnMissingAssembly()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""base"": ""myBaseFqn"",
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<ClassType>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""base"": ""myBaseFqn"",
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<ClassType>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingNamespace))]
            public void ShouldNotDeserializeMissingNamespace()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""base"": ""myBaseFqn"",
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                ClassType actual = JsonConvert.DeserializeObject<ClassType>(json);
                Assert.Null(actual.Namespace);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingDocs))]
            public void ShouldNotDeserializeMissingDocs()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""base"": ""myBaseFqn"",
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class""
}";

                ClassType actual = JsonConvert.DeserializeObject<ClassType>(json);

                Assert.Null(actual.Docs);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingProperties))]
            public void ShouldNotDeserializeMissingProperties()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""methods"": [],
  ""base"": ""myBaseFqn"",
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                ClassType actual = JsonConvert.DeserializeObject<ClassType>(json);

                Assert.Null(actual.Properties);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingMethods))]
            public void ShouldNotDeserializeMissingMethods()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""base"": ""myBaseFqn"",
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                ClassType actual = JsonConvert.DeserializeObject<ClassType>(json);

                Assert.Null(actual.Methods);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingBase))]
            public void ShouldNotDeserializeMissingBase()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                ClassType actual = JsonConvert.DeserializeObject<ClassType>(json);

                Assert.Null(actual.Base);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingInitializer))]
            public void ShouldNotDeserializeMissingInitializer()
            {
                const string json = @"{
  ""abstract"": true,
  ""properties"": [],
  ""methods"": [],
  ""base"": ""myBaseFqn"",
  ""interfaces"": [],
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                ClassType actual = JsonConvert.DeserializeObject<ClassType>(json);

                Assert.Null(actual.Initializer);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingInterfaces))]
            public void ShouldNotDeserializeMissingInterfaces()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [],
  ""base"": ""myBaseFqn"",
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                ClassType actual = JsonConvert.DeserializeObject<ClassType>(json);

                Assert.Null(actual.Interfaces);
            }

            [Fact(DisplayName = Prefix + nameof(DeserializesAsyncMethod))]
            public void DeserializesAsyncMethod()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {},
  ""properties"": [],
  ""methods"": [{ ""async"": true, ""name"": ""testMethod"" }],
  ""base"": ""myBaseFqn"",
  ""fqn"": ""myFqn"",
  ""assembly"": ""myModule"",
  ""name"": ""myName"",
  ""namespace"": ""myNamespace"",
  ""kind"": ""class"",
  ""docs"": {}
}";

                ClassType actual = JsonConvert.DeserializeObject<ClassType>(json);

                Assert.Equal(1, actual.Methods?.Length);
                Assert.True(actual.Methods?[0]?.IsAsync);
            }
        }
    }
}

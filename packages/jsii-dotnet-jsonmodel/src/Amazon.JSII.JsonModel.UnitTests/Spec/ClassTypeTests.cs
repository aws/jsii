using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;
using Xunit;

namespace Amazon.JSII.JsonModel.UnitTests.Spec
{
    public class ClassTypeTests
    {
        const string RootPrefix = nameof(Spec) + "." + nameof(ClassType) + ".";

        public class Serialization
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
                    @base: new TypeReference("myBaseFqn"),
                    initializer: new Method(true, false, false),
                    interfaces: new TypeReference[] { }
                );

                string actual = JsonConvert.SerializeObject(classType, Formatting.Indented);
                const string expected = @"{
  ""abstract"": true,
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
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
                    fullyQualifiedName: null,
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: new TypeReference("myBaseFqn"),
                    initializer: new Method(true, false, false),
                    interfaces: new TypeReference[] { }
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingAssembly))]
            public void ShouldThrowOnMissingAssembly()
            {
                Assert.Throws<ArgumentNullException>(() => new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: null,
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: new TypeReference("myBaseFqn"),
                    initializer: new Method(true, false, false),
                    interfaces: new TypeReference[] { }
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
                Assert.Throws<ArgumentNullException>(() => new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: null,
                    @namespace: "myNamespace",
                    isAbstract: true,
                    docs: new Docs(),
                    properties: new Property[] { },
                    methods: new Method[] { },
                    @base: new TypeReference("myBaseFqn"),
                    initializer: new Method(true, false, false),
                    interfaces: new TypeReference[] { }
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
                    @base: new TypeReference("myBaseFqn"),
                    initializer: new Method(true, false, false),
                    interfaces: new TypeReference[] { }
                );
                string actual = JsonConvert.SerializeObject(classType, Formatting.Indented);
                const string expected = @"{
  ""abstract"": true,
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
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
                    @base: new TypeReference("myBaseFqn"),
                    initializer: new Method(true, false, false),
                    interfaces: new TypeReference[] { }
                );

                string actual = JsonConvert.SerializeObject(classType, Formatting.Indented);
                const string expected = @"{
  ""abstract"": true,
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
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
                    @base: new TypeReference("myBaseFqn"),
                    initializer: new Method(true, false, false),
                    interfaces: new TypeReference[] { }
                );

                string actual = JsonConvert.SerializeObject(classType, Formatting.Indented);
                const string expected = @"{
  ""abstract"": true,
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
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
                    @base: new TypeReference("myBaseFqn"),
                    initializer: new Method(true, false, false),
                    interfaces: new TypeReference[] { }
                );

                string actual = JsonConvert.SerializeObject(classType, Formatting.Indented);
                const string expected = @"{
  ""abstract"": true,
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
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
                    initializer: new Method(true, false, false),
                    interfaces: new TypeReference[] { }
                );

                string actual = JsonConvert.SerializeObject(classType, Formatting.Indented);
                const string expected = @"{
  ""abstract"": true,
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
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
                    @base: new TypeReference("myBaseFqn"),
                    interfaces: new TypeReference[] { }
                );

                string actual = JsonConvert.SerializeObject(classType, Formatting.Indented);
                const string expected = @"{
  ""abstract"": true,
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
                    @base: new TypeReference("myBaseFqn"),
                    initializer: new Method(true, false, false)
                );

                string actual = JsonConvert.SerializeObject(classType, Formatting.Indented);
                const string expected = @"{
  ""abstract"": true,
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
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
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
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
                Assert.Empty(actual.Docs);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingFullyQualifiedName))]
            public void ShouldThrowOnMissingFullyQualifiedName()
            {
                const string json = @"{
  ""abstract"": true,
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
  ""properties"": [],
  ""methods"": [],
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
  ""properties"": [],
  ""methods"": [],
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
  ""properties"": [],
  ""methods"": [],
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
  ""properties"": [],
  ""methods"": [],
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
  ""properties"": [],
  ""methods"": [],
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
  ""methods"": [],
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
  ""properties"": [],
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
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
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
  ""initializer"": {
    ""initializer"": true,
    ""protected"": false,
    ""abstract"": false
  },
  ""properties"": [],
  ""methods"": [],
  ""base"": {
    ""fqn"": ""myBaseFqn""
  },
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
        }
    }
}

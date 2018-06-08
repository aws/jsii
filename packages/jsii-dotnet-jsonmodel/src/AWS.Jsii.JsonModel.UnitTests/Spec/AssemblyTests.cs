using AWS.Jsii.JsonModel.Spec;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Xunit;

namespace AWS.Jsii.JsonModel.UnitTests.Spec
{
    public class AssemblyTests
    {
        const string RootPrefix = nameof(Spec) + "." + nameof(Assembly) + ".";

        public class Serialization
        {
            const string Prefix = RootPrefix + "Serialization.";

            [Fact(DisplayName = Prefix + nameof(ShouldSerializeAllMembers))]
            public void ShouldSerializeAllMembers()
            {
                Assembly assembly = new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    code: "myCode",
                    dependencies : new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()

                );

                string actual = JsonConvert.SerializeObject(assembly, Formatting.Indented);
                const string expected = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
                Assert.Throws<ArgumentNullException>(() => new Assembly
                (
                    name: null,
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    code: "myCode",
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingPackage))]
            public void ShouldThrowOnMissingPackage()
            {
                Assert.Throws<ArgumentNullException>(() => new Assembly
                (
                    name: "myName",
                    package: null,
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    code: "myCode",
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingNames))]
            public void ShouldThrowOnMissingNames()
            {
                Assert.Throws<ArgumentNullException>(() => new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: null,
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    code: "myCode",
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingVersion))]
            public void ShouldThrowOnMissingVersion()
            {
                Assert.Throws<ArgumentNullException>(() => new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: null,
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    code: "myCode",
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingTypes))]
            public void ShouldThrowOnMissingTypes()
            {
                Assert.Throws<ArgumentNullException>(() => new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: null,
                    code: "myCode",
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingCode))]
            public void ShouldNotSerializeMissingCode()
            {
                Assembly assembly = new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    code: null,
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                );

                string actual = JsonConvert.SerializeObject(assembly, Formatting.Indented);
                const string expected = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingDependencies))]
            public void ShouldNotSerializeMissingDependencies()
            {
                Assembly assembly = new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    code: "myCode",
                    dependencies: null,
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                );

                string actual = JsonConvert.SerializeObject(assembly, Formatting.Indented);
                const string expected = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingBundled))]
            public void ShouldNotSerializeMissingBundled()
            {
                Assembly assembly = new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    code: "myCode",
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: null,
                    docs: new Docs()
                );

                string actual = JsonConvert.SerializeObject(assembly, Formatting.Indented);
                const string expected = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""docs"": {}
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingDocs))]
            public void ShouldNotSerializeMissingDocs()
            {
                Assembly assembly = new Assembly
                (
                    name: "myName",
                    package: "myPackage",
                    names: new Dictionary<string, string>(),
                    nativeNames: new Dictionary<string, IDictionary<string, string>>(),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    code: "myCode",
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: null
                );

                string actual = JsonConvert.SerializeObject(assembly, Formatting.Indented);
                const string expected = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""bundled"": {}
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
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);

                Assert.Equal("jsii/1.0", actual.Schema, ignoreLineEndingDifferences: true);
                Assert.Equal("myName", actual.Name, ignoreLineEndingDifferences: true);
                Assert.Equal("myPackage", actual.Package, ignoreLineEndingDifferences: true);
                Assert.Empty(actual.Names);
                Assert.Equal("myVersion", actual.Version, ignoreLineEndingDifferences: true);
                Assert.Empty(actual.Types);
                Assert.Equal("myCode", actual.Code, ignoreLineEndingDifferences: true);
                Assert.Empty(actual.Dependencies);
                Assert.Empty(actual.Bundled);
                Assert.Empty(actual.Docs);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<Assembly>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingPackage))]
            public void ShouldThrowOnMissingPackage()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<Assembly>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingNames))]
            public void ShouldThrowOnMissingNames()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<Assembly>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingVersion))]
            public void ShouldThrowOnMissingVersion()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<Assembly>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingTypes))]
            public void ShouldThrowOnMissingTypes()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<Assembly>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingCode))]
            public void ShouldNotDeserializeMissingCode()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);
                Assert.Null(actual.Code);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingDependencies))]
            public void ShouldNotDeserializeMissingDependencies()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""bundled"": {},
  ""docs"": {}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);
                Assert.Null(actual.Dependencies);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingBundled))]
            public void ShouldNotDeserializeMissingBundled()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""docs"": {}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);
                Assert.Null(actual.Bundled);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingDocs))]
            public void ShouldNotDeserializeMissingDocs()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""package"": ""myPackage"",
  ""names"": {},
  ""nativenames"": {},
  ""version"": ""myVersion"",
  ""types"": {},
  ""code"": ""myCode"",
  ""dependencies"": {},
  ""bundled"": {}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);
                Assert.Null(actual.Docs);
            }
        }
    }
}

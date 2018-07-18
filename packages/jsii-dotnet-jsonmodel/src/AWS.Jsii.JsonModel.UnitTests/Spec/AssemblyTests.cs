using AWS.Jsii.JsonModel.Spec;
using Newtonsoft.Json.Serialization;
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
                    targets: new Targets("Dot.Net.Namespace"),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    dependencies : new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()

                );

                string actual = JsonConvert.SerializeObject(assembly, Formatting.Indented);
                const string expected = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""version"": ""myVersion"",
  ""types"": {},
  ""bundled"": {},
  ""docs"": {},
  ""dependencies"": {},
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace""
    }
  }
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
                Assert.Throws<ArgumentNullException>(() => new Assembly
                (
                    name: null,
                    targets: new Targets("Dot.Net.Namespace"),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingTargets))]
            public void ShouldThrowOnMissingTargets()
            {
                Assert.Throws<ArgumentNullException>(() => new Assembly
                (
                    name: "myName",
                    version: "myVersion",
                    targets: null,
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
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
                    targets: new Targets("Dot.Net.Namespace"),
                    version: null,
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
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
                    targets: new Targets("Dot.Net.Namespace"),
                    version: "myVersion",
                    types: null,
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingDependencies))]
            public void ShouldNotSerializeMissingDependencies()
            {
                Assembly assembly = new Assembly
                (
                    name: "myName",
                    targets: new Targets("Dot.Net.Namespace"),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    dependencies: null,
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                );

                string actual = JsonConvert.SerializeObject(assembly, Formatting.Indented);
                const string expected = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""version"": ""myVersion"",
  ""types"": {},
  ""bundled"": {},
  ""docs"": {},
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace""
    }
  }
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingBundled))]
            public void ShouldNotSerializeMissingBundled()
            {
                Assembly assembly = new Assembly
                (
                    name: "myName",
                    targets: new Targets("Dot.Net.Namespace"),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: null,
                    docs: new Docs()
                );

                string actual = JsonConvert.SerializeObject(assembly, Formatting.Indented);
                const string expected = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""version"": ""myVersion"",
  ""types"": {},
  ""docs"": {},
  ""dependencies"": {},
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace""
    }
  }
}";

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotSerializeMissingDocs))]
            public void ShouldNotSerializeMissingDocs()
            {
                Assembly assembly = new Assembly
                (
                    name: "myName",
                    targets: new Targets("Dot.Net.Namespace"),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>(),
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: null
                );

                string actual = JsonConvert.SerializeObject(assembly, Formatting.Indented);
                const string expected = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""version"": ""myVersion"",
  ""types"": {},
  ""bundled"": {},
  ""dependencies"": {},
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace""
    }
  }
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
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace""
    }
  },
  ""version"": ""myVersion"",
  ""types"": {},
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);

                Assert.Equal("jsii/1.0", actual.Schema, ignoreLineEndingDifferences: true);
                Assert.Equal("myName", actual.Name, ignoreLineEndingDifferences: true);
                Assert.Equal("Dot.Net.Namespace", actual.Targets.DotNet);
                Assert.Equal("myVersion", actual.Version, ignoreLineEndingDifferences: true);
                Assert.Empty(actual.Types);
                Assert.Empty(actual.Dependencies);
                Assert.Empty(actual.Bundled);
                Assert.Empty(actual.Docs);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldDeserializeAllMembersWithDotNetTarget))]
            public void ShouldDeserializeAllMembersWithDotNetTarget()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""targets"": {
    ""dotnet"": { ""namespace"": ""AWS.Cdk.Test"" },
    ""java"": { ""package"": ""com.amazonaws.cdk.Test"" }
  },
  ""version"": ""myVersion"",
  ""types"": {},
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);

                Assert.Equal("jsii/1.0", actual.Schema, ignoreLineEndingDifferences: true);
                Assert.Equal("myName", actual.Name, ignoreLineEndingDifferences: true);
                Assert.Equal("AWS.Cdk.Test", actual.Targets.DotNet?.Namespace);
                Assert.Equal("myVersion", actual.Version, ignoreLineEndingDifferences: true);
                Assert.Empty(actual.Types);
                Assert.Empty(actual.Dependencies);
                Assert.Empty(actual.Bundled);
                Assert.Empty(actual.Docs);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""targets"": { ""dotnet"": { ""namespace"": ""AWS.Cdk.Test"" } },
  ""version"": ""myVersion"",
  ""types"": {},
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<Assembly>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingTargets))]
            public void ShouldThrowOnMissingTargets()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""version"": ""myVersion"",
  ""types"": {},
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<Assembly>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingDotNetTarget))]
            public void ShouldThrowOnMissingDotNetTarget()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""version"": ""myVersion"",
  ""targets"": {},
  ""types"": {},
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
  ""targets"": { ""dotnet"": { ""namespace"": ""AWS.Cdk.Test"" } },
  ""types"": {},
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
  ""targets"": { ""dotnet"": { ""namespace"": ""AWS.Cdk.Test"" } },
  ""version"": ""myVersion"",
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {}
}";

                Assert.Throws<ArgumentNullException>(() => JsonConvert.DeserializeObject<Assembly>(json));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldNotDeserializeMissingDependencies))]
            public void ShouldNotDeserializeMissingDependencies()
            {
                const string json = @"{
  ""schema"": ""jsii/1.0"",
  ""name"": ""myName"",
  ""targets"": { ""dotnet"": { ""namespace"": ""AWS.Cdk.Test"" } },
  ""version"": ""myVersion"",
  ""types"": {},
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
  ""targets"": { ""dotnet"": { ""namespace"": ""AWS.Cdk.Test"" } },
  ""version"": ""myVersion"",
  ""types"": {},
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
  ""targets"": { ""dotnet"": { ""namespace"": ""AWS.Cdk.Test"" } },
  ""version"": ""myVersion"",
  ""types"": {},
  ""dependencies"": {},
  ""bundled"": {}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);
                Assert.Null(actual.Docs);
            }
        }
    }
}

using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.JsonModel
{
    public class AssemblyTests
    {
        const string RootPrefix = nameof(JsonModel) + "." + nameof(Assembly) + ".";

        public class Serialization : TestUtils
        {
            const string Prefix = RootPrefix + "Serialization.";

            [Fact(DisplayName = Prefix + nameof(ShouldSerializeAllMembers))]
            public void ShouldSerializeAllMembers()
            {
                Assembly assembly = new Assembly
                (
                    name: "myName",
                    description: "My description",
                    homepage: "http://www.example.com/",
                    repository: new Assembly.AssemblyRepository(
                        type: "git",
                        url: "http://github.com/"
                    ),
                    author: new Person(
                        name: "Jane Doe",
                        roles: new[] { "Administrator" }
                    ),
                    fingerprint: "myFingerprint",
                    version: "myVersion",
                    license: "Apache-2.0",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "Dot.Net.Namespace",
                        packageId: "Dot.Net.PackageId",
                        signAssembly: true,
                        assemblyOriginatorKeyFile: "key.snk",
                        iconUrl: "http://www.example.com/icon.png"
                    )),
                    dependencies: new Dictionary<string, PackageVersion>(),
                    contributors: new Person[] {
                        new Person(
                            name: "John Doe",
                            roles: new[] { "Contributor" }
                        )
                    },
                    bundled: new Dictionary<string, string>(),
                    types: new Dictionary<string, Amazon.JSII.JsonModel.Spec.Type>(),
                    docs: new Docs(),
                    readme: new Readme("myReadme")
                );

                string actual = ToJson(assembly);
                const string expected = @"{
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""description"": ""My description"",
  ""homepage"": ""http://www.example.com/"",
  ""repository"": {
    ""type"": ""git"",
    ""url"": ""http://github.com/""
  },
  ""author"": {
    ""name"": ""Jane Doe"",
    ""roles"": [
      ""Administrator""
    ]
  },
  ""fingerprint"": ""myFingerprint"",
  ""version"": ""myVersion"",
  ""license"": ""Apache-2.0"",
  ""contributors"": [
    {
      ""name"": ""John Doe"",
      ""roles"": [
        ""Contributor""
      ]
    }
  ],
  ""bundled"": {},
  ""types"": {},
  ""docs"": {},
  ""readme"": {
    ""markdown"": ""myReadme""
  },
  ""dependencies"": {},
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace"",
      ""packageId"": ""Dot.Net.PackageId"",
      ""signAssembly"": true,
      ""assemblyOriginatorKeyFile"": ""key.snk"",
      ""iconUrl"": ""http://www.example.com/icon.png""
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
#pragma warning disable CS8625
                    name: null,
#pragma warning restore CS8625
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    version: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "Dot.Net.Namespace",
                        packageId: "Dot.Net.PackageId",
                        signAssembly: true,
                        assemblyOriginatorKeyFile: "key.snk",
                        iconUrl: "http://www.example.com/icon.png"
                    )),
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    types: new Dictionary<string, Amazon.JSII.JsonModel.Spec.Type>(),
                    docs: new Docs()
                ));
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingVersion))]
            public void ShouldThrowOnMissingVersion()
            {
                Assert.Throws<ArgumentNullException>(() => new Assembly
                (
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
#pragma warning disable CS8625
                    version: null,
#pragma warning restore CS8625
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "Dot.Net.Namespace",
                        packageId: "Dot.Net.PackageId",
                        signAssembly: true,
                        assemblyOriginatorKeyFile: "key.snk",
                        iconUrl: "http://www.example.com/icon.png"
                    )),
                    types: new Dictionary<string, Amazon.JSII.JsonModel.Spec.Type>(),
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
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    version: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "Dot.Net.Namespace",
                        packageId: "Dot.Net.PackageId",
                        signAssembly: true,
                        assemblyOriginatorKeyFile: "key.snk",
                        iconUrl: "http://www.example.com/icon.png"
                    )),
                    types: new Dictionary<string, Amazon.JSII.JsonModel.Spec.Type>(),
                    dependencies: null,
                    bundled: new Dictionary<string, string>(),
                    docs: new Docs()
                );

                string actual = ToJson(assembly);
                const string expected = @"{
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": """",
  ""license"": """",
  ""bundled"": {},
  ""types"": {},
  ""docs"": {},
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace"",
      ""packageId"": ""Dot.Net.PackageId"",
      ""signAssembly"": true,
      ""assemblyOriginatorKeyFile"": ""key.snk"",
      ""iconUrl"": ""http://www.example.com/icon.png""
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
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    version: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "Dot.Net.Namespace",
                        packageId: "Dot.Net.PackageId",
                        signAssembly: true,
                        assemblyOriginatorKeyFile: "key.snk",
                        iconUrl: "http://www.example.com/icon.png"
                    )),
                    types: new Dictionary<string, Amazon.JSII.JsonModel.Spec.Type>(),
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: null,
                    docs: new Docs()
                );

                string actual = ToJson(assembly);
                const string expected = @"{
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": """",
  ""license"": """",
  ""types"": {},
  ""docs"": {},
  ""dependencies"": {},
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace"",
      ""packageId"": ""Dot.Net.PackageId"",
      ""signAssembly"": true,
      ""assemblyOriginatorKeyFile"": ""key.snk"",
      ""iconUrl"": ""http://www.example.com/icon.png""
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
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    version: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "Dot.Net.Namespace",
                        packageId: "Dot.Net.PackageId",
                        signAssembly: true,
                        assemblyOriginatorKeyFile: "key.snk",
                        iconUrl: "http://www.example.com/icon.png"
                    )),
                    types: new Dictionary<string, Amazon.JSII.JsonModel.Spec.Type>(),
                    dependencies: new Dictionary<string, PackageVersion>(),
                    bundled: new Dictionary<string, string>(),
                    docs: null
                );

                string actual = ToJson(assembly);
                const string expected = @"{
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": """",
  ""license"": """",
  ""bundled"": {},
  ""types"": {},
  ""dependencies"": {},
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace"",
      ""packageId"": ""Dot.Net.PackageId"",
      ""signAssembly"": true,
      ""assemblyOriginatorKeyFile"": ""key.snk"",
      ""iconUrl"": ""http://www.example.com/icon.png""
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
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": ""myVersion"",
  ""license"": """",
  ""types"": {},
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": { ""summary"": ""hello"" }
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);

                Assert.Equal("jsii/0.9.0", actual.Schema, ignoreLineEndingDifferences: true);
                Assert.Equal("myName", actual.Name, ignoreLineEndingDifferences: true);
                Assert.Null(actual.Targets);
                Assert.Equal("myVersion", actual.Version, ignoreLineEndingDifferences: true);
                Assert.Empty(actual.Types);
                Assert.Empty(actual.Dependencies);
                Assert.Empty(actual.Bundled);
                Assert.Equal("hello", actual.Docs?.Summary);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldDeserializeAllMembersWithNoTypes))]
            public void ShouldDeserializeAllMembersWithNoTypes()
            {
                const string json = @"{
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": ""myVersion"",
  ""license"": """",
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {""summary"": ""hello""}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);

                Assert.Equal("jsii/0.9.0", actual.Schema, ignoreLineEndingDifferences: true);
                Assert.Equal("myName", actual.Name, ignoreLineEndingDifferences: true);
                Assert.Null(actual.Targets);
                Assert.Equal("myVersion", actual.Version, ignoreLineEndingDifferences: true);
                Assert.Null(actual.Types);
                Assert.Empty(actual.Dependencies);
                Assert.Empty(actual.Bundled);
                Assert.Equal("hello", actual.Docs?.Summary);
            }


            [Fact(DisplayName = Prefix + nameof(ShouldDeserializeAllMembersWithDotNetTarget))]
            public void ShouldDeserializeAllMembersWithDotNetTarget()
            {
                const string json = @"{
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""Dot.Net.Namespace"",
      ""packageId"": ""Dot.Net.PackageId"",
      ""signAssembly"": true,
      ""assemblyOriginatorKeyFile"": ""key.snk"",
      ""iconUrl"": ""http://www.example.com/icon.png""
    },
    ""java"": { ""package"": ""com.amazonaws.cdk.Test"" }
  },
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": ""myVersion"",
  ""license"": """",
  ""types"": {},
  ""dependencies"": {},
  ""bundled"": {},
  ""docs"": {""summary"": ""hello""}
}";

                Assembly actual = JsonConvert.DeserializeObject<Assembly>(json);

                Assert.Equal("jsii/0.9.0", actual.Schema, ignoreLineEndingDifferences: true);
                Assert.Equal("myName", actual.Name, ignoreLineEndingDifferences: true);

                AssemblyTargets.DotNetTarget? dotNetTarget = actual.Targets?.DotNet;
                Assert.NotNull(dotNetTarget);
                Assert.Equal("Dot.Net.Namespace", dotNetTarget?.Namespace);
                Assert.Equal("Dot.Net.PackageId", dotNetTarget?.PackageId);
                Assert.True(dotNetTarget?.SignAssembly);
                Assert.Equal("key.snk", dotNetTarget?.AssemblyOriginatorKeyFile);
                Assert.Equal("http://www.example.com/icon.png", dotNetTarget?.IconUrl);

                Assert.Equal("myVersion", actual.Version, ignoreLineEndingDifferences: true);
                Assert.Empty(actual.Types);
                Assert.Empty(actual.Dependencies);
                Assert.Empty(actual.Bundled);
                Assert.Equal("hello", actual.Docs?.Summary);
            }

            [Fact(DisplayName = Prefix + nameof(ShouldThrowOnMissingName))]
            public void ShouldThrowOnMissingName()
            {
                const string json = @"{
  ""schema"": ""jsii/0.9.0"",
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""AWS.Cdk.Test"",
      ""packageId"": ""AWS.Cdk.Test""
    }
  },
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": """",
  ""license"": """",
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
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": """",
  ""license"": """",
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
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""AWS.Cdk.Test"",
      ""packageId"": ""AWS.Cdk.Test""
    }
  },
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""license"": """",
  ""types"": {},
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
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""AWS.Cdk.Test"",
      ""packageId"": ""AWS.Cdk.Test""
    }
  },
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": """",
  ""license"": """",
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
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""AWS.Cdk.Test"",
      ""packageId"": ""AWS.Cdk.Test""
    }
  },
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": """",
  ""license"": """",
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
  ""schema"": ""jsii/0.9.0"",
  ""name"": ""myName"",
  ""targets"": {
    ""dotnet"": {
      ""namespace"": ""AWS.Cdk.Test"",
      ""packageId"": ""AWS.Cdk.Test""
    }
  },
  ""description"": """",
  ""homepage"": """",
  ""repository"": {
    ""type"": """",
    ""url"": """"
  },
  ""author"": {
    ""name"": """",
    ""roles"": []
  },
  ""fingerprint"": """",
  ""version"": """",
  ""license"": """",
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

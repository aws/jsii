﻿using Amazon.JSII.JsonModel.FileSystem;
using Amazon.JSII.JsonModel.Spec;
using NSubstitute;
using System.IO;
using Xunit;
using Xunit.Sdk;

namespace Amazon.JSII.Generator.UnitTests
{
    public class AssemblyGeneratorTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(AssemblyGenerator) + ".";

        const string InputRoot = "myInputRoot";
        const string OutputRoot = "myOutputRoot";

        static string GetJsonPath(string jsiiPackage)
        {
            return Path.Combine(InputRoot, jsiiPackage, "dist", Constants.SPEC_FILE_NAME);
        }

        static string GetPackageOutputRoot(string dotnetPackage)
        {
            return Path.Combine(OutputRoot, dotnetPackage);
        }

        static string GetProjectFilePath(string dotnetPackage, string dotnetAssembly)
        {
            return $"{Path.Combine(GetPackageOutputRoot(dotnetPackage), dotnetAssembly)}.csproj";
        }

        static string GetAnchorFilePath(string dotnetPackage, string dotnetNamespace)
        {
            string path = GetPackageOutputRoot(dotnetPackage);

            foreach (string token in dotnetNamespace.Split('.')) {
                path = Path.Combine(path, token);
            }

            return Path.Combine(path, "Internal", "DependencyResolution", "Anchor.cs");
        }

        static string GetTypeFilePath(string dotnetPackage, string dotnetNamespace, string dotnetType)
        {
            string directory = Path.Combine(GetPackageOutputRoot(dotnetPackage), Path.Combine(dotnetNamespace.Split('.')));
            return $"{Path.Combine(directory, dotnetType)}.cs";
        }

        [Fact(DisplayName = Prefix + nameof(AccessesFileSystemThroughShim))]
        public void AccessesFileSystemThroughShim()
        {
            const string json =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
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
    ""targets"": {
        ""dotnet"": {
            ""namespace"": ""Aws.Cdk.CxApiNamespace"",
            ""packageId"": ""Aws.Cdk.CxApiPackageId""
        }
    },
    ""version"": """",
    ""types"": {
        ""jsii$aws_cdk_cx_api$.MissingContext"": {
            ""kind"": ""class"",
            ""fqn"": ""jsii$aws_cdk_cx_api$.MissingContext"",
            ""assembly"": ""jsii$aws_cdk_cx_api$"",
            ""name"": ""MissingContext"",
            ""initializer"": {
                ""initializer"": true
            }
        }
    }
}";

            string jsonPath = GetJsonPath("aws-cdk-cx-api");
            string packageOutputRoot = GetPackageOutputRoot("Aws.Cdk.CxApiPackageId");
            string projectFilePath = GetProjectFilePath("Aws.Cdk.CxApiPackageId", "Aws.Cdk.CxApiPackageId");
            string typeFilePath = GetTypeFilePath("Aws.Cdk.CxApiPackageId", "Aws.Cdk.CxApiNamespace", "MissingContext");

            IDirectory directory = Substitute.For<IDirectory>();
            directory.Exists(packageOutputRoot).Returns(true, false);

            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);

            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(directory);
            fileSystem.File.Returns(file);

            //Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApi");
            Symbols.MapNamespace("jsii$aws_cdk_cx_api$", "Aws.Cdk.CxApiNamespace");
            Symbols.MapTypeName("jsii$aws_cdk_cx_api$.MissingContext", "MissingContext", TypeKind.Class);

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk-cx-api", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk-cx-api", "aws-cdk-cx-api-1.2.3.5.tgz"),
                Symbols
            );

            directory.Received().Delete(packageOutputRoot, true);
            directory.Received().CreateDirectory(packageOutputRoot);
            file.Received().ReadAllText(jsonPath);
            file.Received().WriteAllText(projectFilePath, Arg.Any<string>());
            file.Received().WriteAllText(typeFilePath, Arg.Any<string>());
        }

        [Fact(DisplayName = Prefix + nameof(CopiesJsiiToOutput))]
        public void CopiesJsiiToOutput()
        {
            const string json =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
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
    ""targets"": {
        ""dotnet"": {
            ""namespace"": ""Aws.Cdk.CxApiNamespace"",
            ""packageId"": ""Aws.Cdk.CxApiPackageId""
        }
    },
    ""version"": """",
    ""types"": {}
}";

            string jsonPath = GetJsonPath("aws-cdk-cx-api");
            string projectFilePath = GetProjectFilePath("Aws.Cdk.CxApi", "Aws.Cdk.CxApi");

            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);

            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(Substitute.For<IDirectory>());
            fileSystem.File.Returns(file);

            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApiPackageId");

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk-cx-api", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk-cx-api", "aws-cdk-cx-api-1.2.3.5.tgz"),
                Symbols
            );

            file.Received().Copy(jsonPath, Path.Combine(OutputRoot, "Aws.Cdk.CxApiPackageId", ".jsii"));
        }

        [Fact(DisplayName = Prefix + nameof(CreatesBasicProjectFile))]
        public void CreatesBasicProjectFile()
        {
            const string json =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
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
    ""targets"": {
        ""dotnet"": {
            ""namespace"": ""Aws.Cdk.CxApiNamespace"",
            ""packageId"": ""Aws.Cdk.CxApiPackageId""
        }
    },
    ""version"": ""1.2.3"",
    ""types"": {}
}";

            string jsonPath = GetJsonPath("aws-cdk-cx-api");
            string projectFilePath = GetProjectFilePath("Aws.Cdk.CxApiPackageId", "Aws.Cdk.CxApiPackageId");

            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);

            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(Substitute.For<IDirectory>());
            fileSystem.File.Returns(file);

            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApiPackageId");

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk-cx-api", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk-cx-api", "aws-cdk-cx-api-1.2.3.5.tgz"),
                Symbols
            );

            string expected =
@"<Project Sdk=""Microsoft.NET.Sdk"">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <IncludeSymbols>true</IncludeSymbols>
    <IncludeSource>true</IncludeSource>
    <Authors>myAuthors</Authors>
    <Company>myCompany</Company>
    <PackageVersion>1.2.3</PackageVersion>
  </PropertyGroup>
  <ItemGroup>
    <EmbeddedResource Include=""aws-cdk-cx-api-1.2.3.5.tgz"" />
  </ItemGroup>
  <ItemGroup>
    <PackageReference Include=""Amazon.JSII.Runtime"" Version=""" + JsiiVersion.Version + @""" />
  </ItemGroup>
</Project>";
            file.Received().WriteAllText(projectFilePath, Arg.Do<string>(actual => PlatformIndependentEqual(expected, actual)));
        }

        [Fact(DisplayName = Prefix + nameof(CreatesProjectFileWithDependencies))]
        public void CreatesProjectFileWithDependencies()
        {
            string json =
@"{
    ""name"": ""jsii$aws_cdk$"",
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
    ""targets"": {
        ""dotnet"": {
            ""namespace"": ""Aws.CdkNamespace"",
            ""packageId"": ""Aws.CdkPackageId""
        }
    },
    ""version"": ""1.2.3"",
    ""types"": {},
    ""dependencies"": {
        ""jsii$aws_cdk_cx_api$"": {
            ""package"": ""aws-cdk-cx-api"",
            ""version"": """",
            ""targets"": {
                ""dotnet"": {
                    ""namespace"": ""Aws.Cdk.CxApi"",
                    ""packageId"": ""Aws.Cdk.CxApi""
                }
            }
        }
    }
}";
            string cxJson =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
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
    ""version"": """",
    ""targets"": {
        ""dotnet"": {
            ""namespace"": ""Aws.Cdk.CxApiNamespace"",
            ""packageId"": ""Aws.Cdk.CxApiPackageId""
        }
    },
    ""types"": {}
}";

            string jsonPath = GetJsonPath("aws-cdk");
            string cxJsonPath = Path.Combine(Path.GetDirectoryName(jsonPath), "node_modules", "jsii$aws_cdk_cx_api$");
            string projectFilePath = GetProjectFilePath("Aws.CdkPackageId", "Aws.CdkPackageId");

            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);
            file.ReadAllText(Path.Combine(cxJsonPath, ".jsii")).Returns(cxJson);

            IDirectory directory = Substitute.For<IDirectory>();
            directory.Exists(cxJsonPath).Returns(true);

            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(directory);
            fileSystem.File.Returns(file);

            Symbols.MapTypeToPackage("aws-cdk", "Aws.CdkPackageId");
            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApiNamespace");
            Symbols.MapAssemblyName("jsii$aws_cdk_cx_api$", "Aws.Cdk.CxApiPackageId");

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk", "aws-cdk-1.2.3.4.tgz"),
                Symbols
            );

            string expected =
@"<Project Sdk=""Microsoft.NET.Sdk"">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <Authors>myAuthors</Authors>
    <Company>myCompany</Company>
    <PackageVersion>1.2.3</PackageVersion>
  </PropertyGroup>
  <ItemGroup>
    <EmbeddedResource Include=""aws-cdk-1.2.3.4.tgz"" />
  </ItemGroup>
  <ItemGroup>
    <PackageReference Include=""Amazon.JSII.Runtime"" Version=""" + JsiiVersion.Version + @""" />
    <ProjectReference Include=""..\Aws.Cdk.CxApi\Aws.Cdk.CxApi.csproj"" Version=""" + JsiiVersion.Version + @""" />
  </ItemGroup>
</Project>";
            file.Received().WriteAllText(projectFilePath, Arg.Do<string>(actual => PlatformIndependentEqual(expected, actual)));
        }

        [Fact(DisplayName = Prefix + nameof(CreatesAnchorFile))]
        public void CreatesAnchorFile()
        {
            string json =
@"{
    ""name"": ""jsii$aws_cdk$"",
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
    ""targets"": {
        ""dotnet"": {
            ""namespace"": ""Aws.CdkNamespace"",
            ""packageId"": ""Aws.CdkPackageId""
        }
    },
    ""version"": ""1.2.3"",
    ""types"": {},
    ""dependencies"": {
        ""jsii$aws_cdk_cx_api$"": {
            ""package"": ""aws-cdk-cx-api"",
            ""version"": """",
            ""targets"": {
                ""dotnet"": {
                    ""namespace"": ""Aws.Cdk.CxApi"",
                    ""packageId"": ""Aws.Cdk.CxApi""
                }
            }
        }
    }
}";
            string cxJson =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
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
    ""version"": """",
    ""targets"": {
        ""dotnet"": {
            ""namespace"": ""Aws.Cdk.CxApiNamespace"",
            ""packageId"": ""Aws.Cdk.CxApiPackageId""
        }
    },
    ""types"": {}
}";

            string jsonPath = GetJsonPath("aws-cdk");
            string cxJsonPath = Path.Combine(Path.GetDirectoryName(jsonPath), "node_modules", "jsii$aws_cdk_cx_api$");
            string anchorFilePath = GetAnchorFilePath("Aws.CdkPackageId", "Aws.CdkNamespace");

            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);
            file.ReadAllText(Path.Combine(cxJsonPath, ".jsii")).Returns(cxJson);

            IDirectory directory = Substitute.For<IDirectory>();
            directory.Exists(cxJsonPath).Returns(true);

            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(directory);
            fileSystem.File.Returns(file);

            Symbols.MapTypeToPackage("aws-cdk", "Aws.CdkPackageId");
            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApiNamespace");
            Symbols.MapAssemblyName("jsii$aws_cdk_cx_api$", "Aws.Cdk.CxApiPackageId");

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk", "aws-cdk-1.2.3.4.tgz"),
                Symbols
            );

            string expected =
@"namespace Aws.CdkNamespace.Internal.DependencyResolution
{
    public class Anchor
    {
        public Anchor()
        {
            new Aws.Cdk.CxApiNamespace.Internal.DependencyResolution.Anchor();
        }
    }
}";
            file.Received().WriteAllText(anchorFilePath, Arg.Do<string>(actual => PlatformIndependentEqual(expected, actual)));
        }

        [Fact(DisplayName = Prefix + nameof(CreatesAssemblyInfo))]
        public void CreatesAssemblyInfo()
        {
            const string json =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
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
    ""targets"": {
        ""dotnet"": {
            ""namespace"": ""Aws.Cdk.CxApiNamespace"",
            ""packageId"": ""Aws.Cdk.CxApiPackageId""
        }
    },
    ""version"": """",
    ""types"": {}
}";

            string jsonPath = GetJsonPath("aws-cdk-cx-api");
            string projectFilePath = GetProjectFilePath("Aws.Cdk.CxApiPackageId", "Aws.Cdk.CxApiPackageId");

            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);

            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(Substitute.For<IDirectory>());
            fileSystem.File.Returns(file);

            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApiPackageId");

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk-cx-api", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk-cx-api", "aws-cdk-cx-api-1.2.3.5.tgz"),
                Symbols
            );

            file.Received().WriteAllText(Path.Combine(OutputRoot, "Aws.Cdk.CxApiPackageId", "AssemblyInfo.cs"),
                Arg.Do<string>(
                    code => Assert.Equal(
@"using Amazon.JSII.Runtime.Deputy;

[assembly: JsiiAssembly(""jsii$aws_cdk_cx_api$"", """", ""aws-cdk-cx-api-1.2.3.5.tgz"")]",
                        code,
                        ignoreLineEndingDifferences: true
                    )
                )
            );
        }

        [Fact(DisplayName = Prefix + nameof(CreatesBasicTypeFile))]
        public void CreatesBasicTypeFile()
        {
            const string json =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
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
    ""targets"": {
        ""dotnet"": {
            ""namespace"": ""Aws.Cdk.CxApiNamespace"",
            ""packageId"": ""Aws.Cdk.CxApiPackageId""
        }
    },
    ""version"": """",
    ""types"": {
        ""jsii$aws_cdk_cx_api$.MissingContext"": {
            ""kind"": ""class"",
            ""fqn"": ""jsii$aws_cdk_cx_api$.MissingContext"",
            ""assembly"": ""jsii$aws_cdk_cx_api$"",
            ""name"": ""MissingContext"",
            ""initializer"": {
                ""initializer"": true
            }
        }
    }
}";

            string jsonPath = GetJsonPath("aws-cdk-cx-api");
            string typeFilePath = GetTypeFilePath("Aws.Cdk.CxApiPackageId", "Aws.Cdk.CxApiNamespace", "MissingContext");

            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);

            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(Substitute.For<IDirectory>());
            fileSystem.File.Returns(file);

            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApiPackageId");
            Symbols.MapNamespace("jsii$aws_cdk_cx_api$", "Aws.Cdk.CxApiNamespace");
            Symbols.MapTypeName("jsii$aws_cdk_cx_api$.MissingContext", "MissingContext", TypeKind.Class);

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk-cx-api", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk-cx-api", "aws-cdk-cx-api-1.1.1.tgz"),
                Symbols
            );


            string expected =
@"using Amazon.JSII.Runtime.Deputy;

namespace Aws.Cdk.CxApiNamespace
{
    [JsiiClass(typeof(MissingContext), ""jsii$aws_cdk_cx_api$.MissingContext"", ""[]"")]
    public class MissingContext : DeputyBase
    {
        public MissingContext(): base(new DeputyProps(new object[]{}))
        {
        }

        protected MissingContext(ByRefValue reference): base(reference)
        {
        }

        protected MissingContext(DeputyProps props): base(props)
        {
        }
    }
}";

            file.Received().WriteAllText(typeFilePath,
                Arg.Is<string>(actual => PlatformIndependentEqual(expected, actual))
            );
        }

        bool PlatformIndependentEqual(string expected, string actual)
        {
            try
            {
                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }
            catch (EqualException)
            {
                return false;
            }

            return true;
        }
    }
}

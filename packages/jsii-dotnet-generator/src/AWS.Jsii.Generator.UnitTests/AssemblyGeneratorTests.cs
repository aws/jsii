using AWS.Jsii.JsonModel.FileSystem;
using AWS.Jsii.JsonModel.Spec;
using NSubstitute;
using System.IO;
using Xunit;
using Xunit.Sdk;

namespace AWS.Jsii.Generator.UnitTests
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

        static string GetTypeFilePath(string dotnetPackage, string dotnetType)
        {
            return $"{Path.Combine(GetPackageOutputRoot(dotnetPackage), dotnetType)}.cs";
        }

        [Fact(DisplayName = Prefix + nameof(AccessesFileSystemThroughShim))]
        public void AccessesFileSystemThroughShim()
        {
            const string json =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
    ""package"": ""aws-cdk-cx-api"",
    ""names"": {
        ""dotnet"": ""Aws.Cdk.CxApi""
    },
    ""nativenames"": {
        ""jsii$aws_cdk_cx_api$"": {
            ""dotnet"": ""Aws.Cdk.CxApi""
        }
    },
    ""version"": """",
    ""types"": {
        ""jsii$aws_cdk_cx_api$.MissingContext"": {
            ""kind"": ""class"",
            ""fqn"": ""jsii$aws_cdk_cx_api$.MissingContext"",
            ""module"": ""jsii$aws_cdk_cx_api$"",
            ""namespace"": ""jsii$aws_cdk_cx_api$"",
            ""name"": ""MissingContext"",
            ""initializer"": {
                ""initializer"": true
            }
        }
    }
}";

            string jsonPath = GetJsonPath("aws-cdk-cx-api");
            string packageOutputRoot = GetPackageOutputRoot("Aws.Cdk.CxApi");
            string projectFilePath = GetProjectFilePath("Aws.Cdk.CxApi", "Aws.Cdk.CxApi");
            string typeFilePath = GetTypeFilePath("Aws.Cdk.CxApi", "MissingContext");

            IDirectory directory = Substitute.For<IDirectory>();
            directory.Exists(packageOutputRoot).Returns(true, false);
            
            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);
            
            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(directory);
            fileSystem.File.Returns(file);

            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApi");
            Symbols.MapNamespace("jsii$aws_cdk_cx_api$", "Aws.Cdk.CxApi");
            Symbols.MapTypeName("jsii$aws_cdk_cx_api$.MissingContext", "MissingContext", JsonModel.Spec.TypeKind.Class);

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                "",
                "",
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

        [Fact(DisplayName = Prefix + nameof(WritesBasicProfileFile))]
        public void WritesBasicProfileFile()
        {
            const string json =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
    ""package"": ""aws-cdk-cx-api"",
    ""names"": {
        ""dotnet"": ""Aws.Cdk.CxApi""
    },
    ""nativenames"": {
        ""jsii$aws_cdk_cx_api$"": {
            ""dotnet"": ""Aws.Cdk.CxApi""
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

            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApi");

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                "myAuthors",
                "myCompany",
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk-cx-api", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk-cx-api", "aws-cdk-cx-api-1.2.3.5.tgz"),
                Symbols
            );

            // TODO: Use a NuGet reference instead of a project reference.
            const string expected =
@"<Project Sdk=""Microsoft.NET.Sdk"">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <Authors>myAuthors</Authors>
    <Company>myCompany</Company>
  </PropertyGroup>
  <ItemGroup>
    <EmbeddedResource Include=""aws-cdk-cx-api-1.2.3.5.tgz"" />
  </ItemGroup>
  <ItemGroup>
    <PackageReference Include=""AWS.Jsii.Runtime"" Version=""1.0.0"" />
  </ItemGroup>
  <ItemGroup />
</Project>";
            file.Received().WriteAllText(projectFilePath, Arg.Is<string>(actual => PlatformIndependentEqual(expected, actual)));
        }

        [Fact(DisplayName = Prefix + nameof(WritesProjectFileWithDependencies))]
        public void WritesProjectFileWithDependencies()
        {
            string json =
@"{
    ""name"": ""jsii$aws_cdk$"",
    ""package"": ""aws-cdk"",
    ""names"": {
        ""dotnet"": ""Aws.Cdk""
    },
    ""nativenames"": {
        ""jsii$aws_cdk$"": {
            ""dotnet"": ""Aws.Cdk""
        },
        ""jsii$aws_cdk_cx_api$"": {
            ""dotnet"": ""Aws.Cdk.CxApi""
        }
    },
    ""version"": """",
    ""types"": {},
    ""dependencies"": {
        ""jsii$aws_cdk_cx_api$"": {
            ""package"": ""aws-cdk-cx-api"",
            ""version"": """"
        }
    }
}";

            string jsonPath = GetJsonPath("aws-cdk");
            string projectFilePath = GetProjectFilePath("Aws.Cdk", "Aws.Cdk");

            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);

            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(Substitute.For<IDirectory>());
            fileSystem.File.Returns(file);

            Symbols.MapTypeToPackage("aws-cdk", "Aws.Cdk");
            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApi");
            Symbols.MapAssemblyName("jsii$aws_cdk_cx_api$", "Aws.Cdk.CxApi");

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                "myAuthors",
                "myCompany",
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk", "aws-cdk-1.2.3.4.tgz"),
                Symbols
            );

            // TODO: Use a NuGet reference instead of a project reference.
            const string expected =
@"<Project Sdk=""Microsoft.NET.Sdk"">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <Authors>myAuthors</Authors>
    <Company>myCompany</Company>
  </PropertyGroup>
  <ItemGroup>
    <EmbeddedResource Include=""aws-cdk-1.2.3.4.tgz"" />
  </ItemGroup>
  <ItemGroup>
    <PackageReference Include=""AWS.Jsii.Runtime"" Version=""1.0.0"" />
  </ItemGroup>
  <ItemGroup>
    <ProjectReference Include=""..\Aws.Cdk.CxApi\Aws.Cdk.CxApi.csproj"" />
  </ItemGroup>
</Project>";
            file.Received().WriteAllText(projectFilePath, Arg.Is<string>(actual => PlatformIndependentEqual(expected, actual)));
        }

        [Fact(DisplayName = Prefix + nameof(WriteBasicTypeFile))]
        public void WriteBasicTypeFile()
        {
            const string json =
@"{
    ""name"": ""jsii$aws_cdk_cx_api$"",
    ""package"": ""aws-cdk-cx-api"",
    ""names"": {
        ""dotnet"": ""Aws.Cdk.CxApi""
    },
    ""nativenames"": {
        ""jsii$aws_cdk_cx_api$"": {
            ""dotnet"": ""Aws.Cdk.CxApi""
        }
    },
    ""version"": """",
    ""types"": {
        ""jsii$aws_cdk_cx_api$.MissingContext"": {
            ""kind"": ""class"",
            ""fqn"": ""jsii$aws_cdk_cx_api$.MissingContext"",
            ""module"": ""jsii$aws_cdk_cx_api$"",
            ""namespace"": ""jsii$aws_cdk_cx_api$"",
            ""name"": ""MissingContext"",
            ""initializer"": {
                ""initializer"": true
            }
        }
    }
}";

            string jsonPath = GetJsonPath("aws-cdk-cx-api");
            string typeFilePath = GetTypeFilePath("Aws.Cdk.CxApi", "MissingContext");

            IFile file = Substitute.For<IFile>();
            file.ReadAllText(jsonPath).Returns(json);

            IFileSystem fileSystem = Substitute.For<IFileSystem>();
            fileSystem.Directory.Returns(Substitute.For<IDirectory>());
            fileSystem.File.Returns(file);

            Symbols.MapTypeToPackage("aws-cdk-cx-api", "Aws.Cdk.CxApi");
            Symbols.MapNamespace("jsii$aws_cdk_cx_api$", "Aws.Cdk.CxApi");
            Symbols.MapTypeName("jsii$aws_cdk_cx_api$.MissingContext", "MissingContext", JsonModel.Spec.TypeKind.Class);

            AssemblyGenerator generator = new AssemblyGenerator
            (
                OutputRoot,
                "",
                "",
                fileSystem
            );
            generator.Generate
            (
                Path.Combine(InputRoot, "aws-cdk-cx-api", "dist", Constants.SPEC_FILE_NAME),
                Path.Combine(InputRoot, "aws-cdk-cx-api", "aws-cdk-cx-api-1.1.1.tgz"),
                Symbols
            );


            string expected =
@"using AWS.Jsii.Runtime.Deputy;

namespace Aws.Cdk.CxApi
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

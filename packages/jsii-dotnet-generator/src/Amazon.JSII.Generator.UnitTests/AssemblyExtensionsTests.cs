using Amazon.JSII.JsonModel.Spec;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;
using Xunit;

namespace Amazon.JSII.Generator.UnitTests
{
    public class AssemblyExtensionsTests
    {
        const string Prefix = nameof(Generator) + "." + nameof(AssemblyExtensions) + ".";

        public class GetNativeName
        {
            const string _Prefix = Prefix + nameof(GetNativeName) + ".";

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullAssembly))]
            public void ThrowsOnNullAssembly()
            {
                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => ((Assembly)null).GetNativeNamespace());
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnMissingDotNetKey))]
            public void ThrowsOnMissingDotNetKey()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    license: "",
                    targets: null,
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeNamespace());
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnEmptyDotNetNamespace))]
            public void ThrowsOnEmptyDotNetNamespace()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "     ",
                        packageId: "")
                    ),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeNamespace());
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(RetrievesDotNetName))]
            public void RetrievesDotNetName()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "myNativeName",
                        packageId: "myPackageId"
                    )),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                string actual = assembly.GetNativeNamespace();
                Assert.Equal("myNativeName", actual);
            }
        }

        public class GetNativeName_WithPackage
        {
            const string _Prefix = Prefix + nameof(GetNativeName_WithPackage) + ".";

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullAssembly))]
            public void ThrowsOnNullAssembly()
            {
                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => ((Assembly)null).GetNativeNamespace("myPackage"));
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnMissingPackage))]
            public void ThrowsOnMissingPackage()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "myNativeName",
                        packageId: "myPackageId1"
                    )),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        {
                            "myPackage",
                            new PackageVersion(
                                "0.0.1",
                                new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                                    @namespace: "myPackageNativeName",
                                    packageId: "myPackageId2"

                                ))
                            )
                        }
                    },
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeNamespace("notMyPackage"));
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnMissingDotNetKey))]
            public void ThrowsOnMissingDotNetKey()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "myNativeName",
                        packageId: "myPackageId"
                    )),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        {
                            "myPackage",
                            new PackageVersion("0.0.1")
                        }
                    },
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeNamespace("myPackage"));
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnEmptyDotNetKey))]
            public void ThrowsOnEmptyDotNetKey()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "myNativeName",
                        packageId: "myPackageId1"
                    )),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        {
                            "myPackage",
                            new PackageVersion(
                                "0.0.1",
                                new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                                    @namespace: "      ",
                                    packageId: "myPackageId2"
                                ))
                            )
                        }
                    },
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeNamespace("myPackage"));
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(RetrievesDotNetName))]
            public void RetrievesDotNetName()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    description: "",
                    homepage: "",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person(name: "", roles: new string[] { }),
                    fingerprint: "",
                    license: "",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "myNativeName",
                        packageId: "myPackageId1"
                    )),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        {
                            "myPackage",
                            new PackageVersion(
                                "0.0.1",
                                new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                                    @namespace: "myPackageNativeName",
                                    packageId: "myPackageId2"
                                ))
                            )
                        }
                    },
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                string actual = assembly.GetNativeNamespace("myPackage");
                Assert.Equal("myPackageNativeName", actual);
            }
        }

        public class GetMsBuildProperties
        {
            const string _Prefix = Prefix + nameof(GetMsBuildProperties) + ".";

            public void IncludesAllPresentProperties()
            {
                Assembly assembly = new Assembly(
                    name: "my-assembly",
                    description: "my description",
                    homepage: "https://www.example.com/",
                    repository: new Assembly.AssemblyRepository
                    (
                        type: "git",
                        url: "https://github.com/"
                    ),
                    author: new Person
                    (
                        name: "Jane Doe",
                        roles: new string[] { "Administrator" }
                    ),
                    fingerprint: "myFingerprint",
                    version: "1.2.3",
                    license: "Apache-2.0",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "My.Namespace",
                        packageId: "My.PackageId",
                        title: "My Human Readable Title",
                        signAssembly: true,
                        assemblyOriginatorKeyFile: "key.snk",
                        iconUrl: "https://www.example.com/icon.svg"
                    ))
                );

                IEnumerable<XElement> actual = assembly.GetMsBuildProperties();
                Assert.Collection(actual,
                    element => Assert.Equal("<TargetFramework>netstandard2.0</TargetFramework>", element.ToString()),
                    element => Assert.Equal("<GeneratePackageOnBuild>true</GeneratePackageOnBuild>", element.ToString()),
                    element => Assert.Equal("<IncludeSymbols>True</IncludeSymbols>", element.ToString()),
                    element => Assert.Equal("<IncludeSource>True</IncludeSource>", element.ToString()),
                    element => Assert.Equal("<PackageVersion>1.2.3</PackageVersion>", element.ToString()),
                    element => Assert.Equal("<PackageId>My.PackageId</PackageId>", element.ToString()),
                    element => Assert.Equal("<Description>my description</Description>", element.ToString()),
                    element => Assert.Equal("<ProjectUrl>https://www.example.com/</ProjectUrl>", element.ToString()),
                    element => Assert.Equal("<LicenseUrl>https://spdx.org/licenses/Apache-2.0.html</LicenseUrl>", element.ToString()),
                    element => Assert.Equal("<Authors>Jane Doe</Authors>", element.ToString()),
                    element => Assert.Equal("<Title>My Human Readable Title</Title>", element.ToString()),
                    element => Assert.Equal("<SignAssembly>true</SignAssembly>", element.ToString()),
                    element => Assert.Equal("<AssemblyOriginatorKeyFile>key.snk</AssemblyOriginatorKeyFile>", element.ToString()),
                    element => Assert.Equal("<IconUrl>http://www.example.com/icon.svg</IconUrl>", element.ToString())
                );
            }

            public void SkipsNullProperties()
            {
                Assembly assembly = new Assembly(
                    description: "my description",
                    homepage: "https://www.example.com/",
                    repository: new Assembly.AssemblyRepository(type: "", url: ""),
                    author: new Person
                    (
                        name: "Jane Doe",
                        roles: new string[] { }
                    ),
                    fingerprint: "",
                    license: "Apache-2.0",
                    name: "my-assembly",
                    version: "1.2.3",
                    targets: new AssemblyTargets(new AssemblyTargets.DotNetTarget(
                        @namespace: "My.Namespace",
                        packageId: "My.PackageId"
                    ))
                );

                IEnumerable<XElement> actual = assembly.GetMsBuildProperties();
                Assert.Collection(actual,
                    element => Assert.Equal("<TargetFramework>netstandard2.0</TargetFramework>", element.ToString()),
                    element => Assert.Equal("<GeneratePackageOnBuild>true</GeneratePackageOnBuild>", element.ToString()),
                    element => Assert.Equal("<PackageVersion>1.2.3</PackageVersion>", element.ToString()),
                    element => Assert.Equal("<PackageId>My.PackageId</PackageId>", element.ToString()),
                    element => Assert.Equal("<Description>my description</Description>", element.ToString()),
                    element => Assert.Equal("<ProjectUrl>https://www.example.com/</ProjectUrl>", element.ToString()),
                    element => Assert.Equal("<LicenseUrl>https://spdx.org/licenses/Apache-2.0.html</LicenseUrl>", element.ToString()),
                    element => Assert.Equal("<Authors>Jane Doe</Authors>", element.ToString())
                );
            }
        }
    }
}

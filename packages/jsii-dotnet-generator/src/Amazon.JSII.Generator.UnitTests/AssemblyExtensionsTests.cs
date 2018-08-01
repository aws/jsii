using Amazon.JSII.JsonModel.Spec;
using System;
using System.Collections.Generic;
using System.Text;
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
                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => ((Assembly)null).GetNativeName());
                Assert.Equal("root", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnMissingDotNetKey))]
            public void ThrowsOnMissingDotNetKey()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    targets: null,
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeName());
                Assert.Equal("root", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnEmptyDotNetKey))]
            public void ThrowsOnEmptyDotNetKey()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    targets: new Targets(new Targets.DotNetTarget("     ")),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeName());
                Assert.Equal("root", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(RetrievesDotNetName))]
            public void RetrievesDotNetName()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    targets: new Targets(new Targets.DotNetTarget("myNativeName")),
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                string actual = assembly.GetNativeName();
                Assert.Equal("myNativeName", actual);
            }
        }

        public class GetNativeName_WithPackage
        {
            const string _Prefix = Prefix + nameof(GetNativeName_WithPackage) + ".";

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullAssembly))]
            public void ThrowsOnNullAssembly()
            {
                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => ((Assembly)null).GetNativeName("myPackage"));
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullPackage))]
            public void ThrowsOnNullPackage()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    targets: new Targets(new Targets.DotNetTarget("myNativeName")),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        {
                            "myPackage",
                            new PackageVersion(
                                "0.0.1",
                                new Targets(new Targets.DotNetTarget("myPackageNativeName"))
                            )
                        }
                    },
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => assembly.GetNativeName(null));
                Assert.Equal("packageName", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnMissingPackage))]
            public void ThrowsOnMissingPackage()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    targets: new Targets(new Targets.DotNetTarget("myNativeName")),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        {
                            "myPackage",
                            new PackageVersion(
                                "0.0.1",
                                new Targets(new Targets.DotNetTarget("myPackageNativeName"))
                            )
                        }
                    },
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeName("notMyPackage"));
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnMissingDotNetKey))]
            public void ThrowsOnMissingDotNetKey()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    targets: new Targets(new Targets.DotNetTarget("myNativeName")),
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

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeName("myPackage"));
                Assert.Equal("root", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnEmptyDotNetKey))]
            public void ThrowsOnEmptyDotNetKey()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    targets: new Targets(new Targets.DotNetTarget("myNativeName")),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        {
                            "myPackage",
                            new PackageVersion(
                                "0.0.1",
                                new Targets(new Targets.DotNetTarget("      "))
                            )
                        }
                    },
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                ArgumentException exception = Assert.Throws<ArgumentException>(() => assembly.GetNativeName("myPackage"));
                Assert.Equal("root", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(RetrievesDotNetName))]
            public void RetrievesDotNetName()
            {
                Assembly assembly = new Assembly(
                    name: "myName",
                    targets: new Targets(new Targets.DotNetTarget("myNativeName")),
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        {
                            "myPackage",
                            new PackageVersion(
                                "0.0.1",
                                new Targets(new Targets.DotNetTarget("myPackageNativeName"))
                            )
                        }
                    },
                    version: "myVersion",
                    types: new Dictionary<string, JsonModel.Spec.Type>()
                );

                string actual = assembly.GetNativeName("myPackage");
                Assert.Equal("myPackageNativeName", actual);
            }
        }
    }
}

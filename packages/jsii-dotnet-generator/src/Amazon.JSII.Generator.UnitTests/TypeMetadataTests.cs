using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Amazon.JSII.Generator.UnitTests
{
    public class TypeMetadataTests
    {
        const string Prefix = nameof(Generator) + "." + nameof(TypeMetadata) + ".";

        public class Class
        {
            const string _Prefix = Prefix + nameof(Class) + ".";

            readonly Assembly _assembly = new Assembly(
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
                        "myModule",
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

            readonly ClassType _type = new ClassType(
                fullyQualifiedName: "myFqn",
                assembly: "myModule",
                name: "myName",
                @namespace: "myModule.myNamespace",
                isAbstract: false
            );

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullType))]
            public void ThrowsOnNullType()
            {
                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => new ClassTypeMetadata(null, _assembly));
                Assert.Equal("type", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullAssembly))]
            public void ThrowsOnNullAssembly()
            {
                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => new ClassTypeMetadata(_type, null));
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsName))]
            public void SetsName()
            {
                ClassTypeMetadata metadata = new ClassTypeMetadata(_type, _assembly);

                Assert.Equal("MyName", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsFrameworkFullyQualifiedName))]
            public void SetsFrameworkFullyQualifiedName()
            {
                ClassTypeMetadata metadata = new ClassTypeMetadata(_type, _assembly);

                Assert.Equal("myPackageNativeName.myNamespace.MyName", metadata.FrameworkFullyQualifiedName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsPackage))]
            public void SetsPackage()
            {
                ClassTypeMetadata metadata = new ClassTypeMetadata(_type, _assembly);

                Assert.Equal("myModule", metadata.Package);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsNamespace))]
            public void SetsNamespace()
            {
                ClassTypeMetadata metadata = new ClassTypeMetadata(_type, _assembly);

                Assert.Equal("myPackageNativeName.myNamespace", metadata.Namespace);
            }

            [Fact(DisplayName = _Prefix + nameof(DisambiguatesNamespaceConflicts))]
            public void DisambiguatesNamespaceConflicts()
            {
                ClassTypeMetadata metadata = new ClassTypeMetadata(_type, _assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>(new[] {
                    "myPackageNativeName.myNamespace.MyName"
                }));

                Assert.Equal("MyName_", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(DisambiguatesPropertyConflicts))]
            public void DisambiguatesPropertyConflicts()
            {
                ClassType type = new ClassType(
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: false,
                    properties: new[] {
                        new Property(
                            name: "myName",
                            type: new TypeReference(primitive: PrimitiveType.String)
                        )
                    }
                );

                ClassTypeMetadata metadata = new ClassTypeMetadata(type, _assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>());

                Assert.Equal("MyName_", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(DisambiguatesMethodConflicts))]
            public void DisambiguatesMethodConflicts()
            {
                ClassType type = new ClassType(
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    isAbstract: false,
                    methods: new[] {
                        new Method(
                            isInitializer: false,
                            isProtected: false,
                            isAbstract: false,
                            name: "myName",
                            returns: new TypeReference(primitive: PrimitiveType.String)
                        )
                    }
                );

                ClassTypeMetadata metadata = new ClassTypeMetadata(type, _assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>());

                Assert.Equal("MyName_", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(EscapesScopedNamespace))]
            public void EscapesScopedNamespace()
            {
                // If a folder or filename begins with @, the C# compiler interprets it as a response file (i.e. .rsp), breaking compilation.
                // Additionally, C# namespaces may not include @. This also breaks compilation.

                ClassType type = new ClassType(
                    fullyQualifiedName: "@aws-cdk/cx-api.AppRuntime",
                    assembly: "@aws-cdk/cx-api",
                    name: "AppRuntime",
                    @namespace: "@aws-cdk/cx-api",
                    docs: new Docs
                    {
                        { "comment", "Information about the application's runtime components." }
                    },
                    properties: new Property[]
                    {
                        new Property(
                            name: "libraries",
                            type: new TypeReference(
                                collection: new CollectionTypeReference(
                                    CollectionKind.Map,
                                    new TypeReference(primitive: PrimitiveType.String)
                                )
                            ),
                            docs: new Docs
                            {
                                { "comment", "The list of libraries loaded in the application, associated with their versions." }
                            }
                        )
                    },
                    isAbstract: false
                );

                Assembly assembly = new Assembly(
                    name: "@aws-cdk/cx-api",
                    description: "Cloud executable protocol",
                    homepage: "https://github.com/awslabs/aws-cdk",
                    repository: new Assembly.AssemblyRepository(
                        type: "git",
                        url: "https://github.com/awslabs/aws-cdk.git"
                    ),
                    author: new Person(
                        name: "Amazon Web Services",
                        organization: true,
                        roles: new[] { "author" },
                        url: "https://aws.amazon.com"
                    ),
                    fingerprint: "Waqr5eba/zt52r9/c3IpkqJRi7kbpxl5vJKj4jt8fxE=",
                    version: "0.8.2",
                    license: "Apache-2.0",
                    targets: new AssemblyTargets(
                        dotnet: new AssemblyTargets.DotNetTarget(
                            @namespace: "Amazon.CDK.CXAPI",
                            packageId: "Amazon.CDK.CXAPI"
                        )
                    ),
                    types: new Dictionary<string, JsonModel.Spec.Type> {
                        { type.FullyQualifiedName, type }
                    },
                    readme: new Readme("## Cloud Executable protocol\nThis module is part of the [AWS Cloud Development Kit](https://github.com/awslabs/aws-cdk) project.\n")
                );

                ClassTypeMetadata metadata = new ClassTypeMetadata(type, assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>());

                Assert.Equal("Amazon.CDK.CXAPI.AppRuntime", metadata.FrameworkFullyQualifiedName);
            }
        }

        public class Enum
        {
            const string _Prefix = Prefix + nameof(Enum) + ".";

            readonly Assembly _assembly = new Assembly(
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
                        "myModule",
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

            readonly EnumType _type = new EnumType(
                fullyQualifiedName: "myFqn",
                assembly: "myModule",
                name: "myName",
                @namespace: "myModule.myNamespace",
                members: new EnumMember[] { }
            );

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullType))]
            public void ThrowsOnNullType()
            {
                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => new EnumTypeMetadata(null, _assembly));
                Assert.Equal("type", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullAssembly))]
            public void ThrowsOnNullAssembly()
            {
                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => new EnumTypeMetadata(_type, null));
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsName))]
            public void SetsName()
            {
                EnumTypeMetadata metadata = new EnumTypeMetadata(_type, _assembly);

                Assert.Equal("MyName", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsFrameworkFullyQualifiedName))]
            public void SetsFrameworkFullyQualifiedName()
            {
                EnumTypeMetadata metadata = new EnumTypeMetadata(_type, _assembly);

                Assert.Equal("myPackageNativeName.myNamespace.MyName", metadata.FrameworkFullyQualifiedName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsPackage))]
            public void SetsPackage()
            {
                EnumTypeMetadata metadata = new EnumTypeMetadata(_type, _assembly);

                Assert.Equal("myModule", metadata.Package);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsNamespace))]
            public void SetsNamespace()
            {
                EnumTypeMetadata metadata = new EnumTypeMetadata(_type, _assembly);

                Assert.Equal("myPackageNativeName.myNamespace", metadata.Namespace);
            }

            [Fact(DisplayName = _Prefix + nameof(DisambiguatesNamespaceConflicts))]
            public void DisambiguatesNamespaceConflicts()
            {
                EnumTypeMetadata metadata = new EnumTypeMetadata(_type, _assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>(new[] {
                    "myPackageNativeName.myNamespace.MyName"
                }));

                Assert.Equal("MyName_", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(DisambiguatesMemberConflicts))]
            public void DisambiguatesMemberConflicts()
            {
                EnumType type = new EnumType(
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    members: new[] {
                        new EnumMember("myName")
                    }
                );

                EnumTypeMetadata metadata = new EnumTypeMetadata(type, _assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>());

                Assert.Equal("MyName_", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(EscapesScopedNamespace))]
            public void EscapesScopedNamespace()
            {
                // If a folder or filename begins with @, the C# compiler interprets it as a response file (i.e. .rsp), breaking compilation.
                // Additionally, C# namespaces may not include @. This also breaks compilation.

                EnumType type = new EnumType(
                    fullyQualifiedName: "@aws-cdk/cx-api.AppRuntime",
                    assembly: "@aws-cdk/cx-api",
                    name: "AppRuntime",
                    @namespace: "@aws-cdk/cx-api",
                    docs: new Docs
                    {
                        { "comment", "Information about the application's runtime components." }
                    },
                    members: new EnumMember[]
                    {
                        new EnumMember("myEnumMember")
                    }
                );

                Assembly assembly = new Assembly(
                    name: "@aws-cdk/cx-api",
                    description: "Cloud executable protocol",
                    homepage: "https://github.com/awslabs/aws-cdk",
                    repository: new Assembly.AssemblyRepository(
                        type: "git",
                        url: "https://github.com/awslabs/aws-cdk.git"
                    ),
                    author: new Person(
                        name: "Amazon Web Services",
                        organization: true,
                        roles: new[] { "author" },
                        url: "https://aws.amazon.com"
                    ),
                    fingerprint: "Waqr5eba/zt52r9/c3IpkqJRi7kbpxl5vJKj4jt8fxE=",
                    version: "0.8.2",
                    license: "Apache-2.0",
                    targets: new AssemblyTargets(
                        dotnet: new AssemblyTargets.DotNetTarget(
                            @namespace: "Amazon.CDK.CXAPI",
                            packageId: "Amazon.CDK.CXAPI"
                        )
                    ),
                    types: new Dictionary<string, JsonModel.Spec.Type> {
                        { type.FullyQualifiedName, type }
                    },
                    readme: new Readme("## Cloud Executable protocol\nThis module is part of the [AWS Cloud Development Kit](https://github.com/awslabs/aws-cdk) project.\n")
                );

                EnumTypeMetadata metadata = new EnumTypeMetadata(type, assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>());

                Assert.Equal("Amazon.CDK.CXAPI.AppRuntime", metadata.FrameworkFullyQualifiedName);
            }
        }

        public class Interface
        {
            const string _Prefix = Prefix + nameof(Interface) + ".";

            readonly Assembly _assembly = new Assembly(
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
                        "myModule",
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

            readonly InterfaceType _type = new InterfaceType(
                fullyQualifiedName: "myFqn",
                assembly: "myModule",
                name: "myName",
                @namespace: "myModule.myNamespace",
                isDataType: true
            );

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullType))]
            public void ThrowsOnNullType()
            {
                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => new InterfaceTypeMetadata(null, _assembly));
                Assert.Equal("type", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNullAssembly))]
            public void ThrowsOnNullAssembly()
            {
                InterfaceType type = new InterfaceType(
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace"
                );

                ArgumentNullException exception = Assert.Throws<ArgumentNullException>(() => new InterfaceTypeMetadata(_type, null));
                Assert.Equal("assembly", exception.ParamName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsName))]
            public void SetsName()
            {
                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(_type, _assembly);

                Assert.Equal("IMyName", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsProxyName))]
            public void SetsProxyName()
            {
                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(_type, _assembly);

                Assert.Equal("MyNameProxy", metadata.ProxyName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsDefaultName))]
            public void SetsDefaultName()
            {
                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(_type, _assembly);

                Assert.Equal("MyName", metadata.DefaultName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsFrameworkFullyQualifiedName))]
            public void SetsFrameworkFullyQualifiedName()
            {
                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(_type, _assembly);

                Assert.Equal("myPackageNativeName.myNamespace.IMyName", metadata.FrameworkFullyQualifiedName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsFrameworkFullyQualifiedProxyName))]
            public void SetsFrameworkFullyQualifiedProxyName()
            {
                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(_type, _assembly);

                Assert.Equal("myPackageNativeName.myNamespace.MyNameProxy", metadata.FrameworkFullyQualifiedProxyName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsFrameworkFullyQualifiedDefaultName))]
            public void SetsFrameworkFullyQualifiedDefaultName()
            {
                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(_type, _assembly);

                Assert.Equal("myPackageNativeName.myNamespace.MyName", metadata.FrameworkFullyQualifiedDefaultName);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsPackage))]
            public void SetsPackage()
            {
                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(_type, _assembly);

                Assert.Equal("myModule", metadata.Package);
            }

            [Fact(DisplayName = _Prefix + nameof(SetsNamespace))]
            public void SetsNamespace()
            {
                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(_type, _assembly);

                Assert.Equal("myPackageNativeName.myNamespace", metadata.Namespace);
            }

            [Fact(DisplayName = _Prefix + nameof(DisambiguatesNamespaceConflicts))]
            public void DisambiguatesNamespaceConflicts()
            {
                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(_type, _assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>(new[] {
                    "myPackageNativeName.myNamespace.IMyName"
                }));

                Assert.Equal("IMyName_", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(DisambiguatesPropertyConflicts))]
            public void DisambiguatesPropertyConflicts()
            {
                InterfaceType type = new InterfaceType(
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    properties: new[] {
                        new Property(
                            name: "iMyName",
                            type: new TypeReference(primitive: PrimitiveType.String)
                        )
                    }
                );

                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(type, _assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>());

                Assert.Equal("IMyName_", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(DisambiguatesMethodConflicts))]
            public void DisambiguatesMethodConflicts()
            {
                InterfaceType type = new InterfaceType(
                    fullyQualifiedName: "myFqn",
                    assembly: "myModule",
                    name: "myName",
                    @namespace: "myNamespace",
                    methods: new[] {
                        new Method(
                            isInitializer: false,
                            isProtected: false,
                            isAbstract: false,
                            name: "iMyName",
                            returns: new TypeReference(primitive: PrimitiveType.String)
                        )
                    }
                );

                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(type, _assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>());

                Assert.Equal("IMyName_", metadata.Name);
            }

            [Fact(DisplayName = _Prefix + nameof(EscapesScopedNamespace))]
            public void EscapesScopedNamespace()
            {
                // If a folder or filename begins with @, the C# compiler interprets it as a response file (i.e. .rsp), breaking compilation.
                // Additionally, C# namespaces may not include @. This also breaks compilation.

                InterfaceType type = new InterfaceType(
                    fullyQualifiedName: "@aws-cdk/cx-api.AppRuntime",
                    assembly: "@aws-cdk/cx-api",
                    name: "AppRuntime",
                    @namespace: "@aws-cdk/cx-api",
                    docs: new Docs
                    {
                        { "comment", "Information about the application's runtime components." }
                    },
                    properties: new Property[]
                    {
                        new Property(
                            name: "libraries",
                            type: new TypeReference(
                                collection: new CollectionTypeReference(
                                    CollectionKind.Map,
                                    new TypeReference(primitive: PrimitiveType.String)
                                )
                            ),
                            docs: new Docs
                            {
                                { "comment", "The list of libraries loaded in the application, associated with their versions." }
                            }
                        )
                    },
                    isDataType: true
                );

                Assembly assembly = new Assembly(
                    name: "@aws-cdk/cx-api",
                    description: "Cloud executable protocol",
                    homepage: "https://github.com/awslabs/aws-cdk",
                    repository: new Assembly.AssemblyRepository(
                        type: "git",
                        url: "https://github.com/awslabs/aws-cdk.git"
                    ),
                    author: new Person(
                        name: "Amazon Web Services",
                        organization: true,
                        roles: new[] { "author" },
                        url: "https://aws.amazon.com"
                    ),
                    fingerprint: "Waqr5eba/zt52r9/c3IpkqJRi7kbpxl5vJKj4jt8fxE=",
                    version: "0.8.2",
                    license: "Apache-2.0",
                    targets: new AssemblyTargets(
                        dotnet: new AssemblyTargets.DotNetTarget(
                            @namespace: "Amazon.CDK.CXAPI",
                            packageId: "Amazon.CDK.CXAPI"
                        )
                    ),
                    types: new Dictionary<string, JsonModel.Spec.Type> {
                        { type.FullyQualifiedName, type }
                    },
                    readme: new Readme("## Cloud Executable protocol\nThis module is part of the [AWS Cloud Development Kit](https://github.com/awslabs/aws-cdk) project.\n")
                );

                InterfaceTypeMetadata metadata = new InterfaceTypeMetadata(type, assembly);
                metadata.ResolveTypeNameConflicts(new HashSet<string>());

                Assert.Equal("Amazon.CDK.CXAPI.IAppRuntime", metadata.FrameworkFullyQualifiedName);
            }
        }
    }
}

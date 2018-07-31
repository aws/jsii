using AWS.Jsii.JsonModel.Spec;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace AWS.Jsii.Generator.UnitTests
{
    public class SymbolMapTests
    {
        const string Prefix = nameof(Generator) + "." + nameof(SymbolMap) + ".";

        static ISymbolMap GetSymbolMap(params Type[] types)
        {
            return GetSymbolMap(out Assembly assembly, types);
        }

        static ISymbolMap GetSymbolMap(out Assembly assembly, params Type[] types)
        {
            assembly = new Assembly
            (
                name: "my-package",
                targets: new Targets(dotnet: "My.Assembly"),
                version: "myVersion",
                types: types.ToDictionary(t => t.FullyQualifiedName)
            );

            ISymbolMap symbolMap = new SymbolMap();
            symbolMap.Add(assembly);

            return symbolMap;
        }

        public class Add
        {
            const string _Prefix = Prefix + nameof(SymbolMap.Add) + ".";

            [Fact(DisplayName = Prefix + nameof(LoadsEmptyAssembly))]
            public void LoadsEmptyAssembly()
            {
                ISymbolMap symbolMap = GetSymbolMap(out Assembly assembly);

                string actual = symbolMap.GetName(assembly);
                Assert.Equal("My.Assembly", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(RenamesTypeOnNamespaceConflict))]
            public void RenamesTypeOnNamespaceConflict()
            {
                Type type1 = new ClassType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package",
                    name: "MyType",
                    @namespace: "my-package",
                    isAbstract: false
                );
                Type type2 = new ClassType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package",
                    name: "myType2",
                    @namespace: "my-package.MyType",
                    isAbstract: false
                );

                Assembly assembly = new Assembly
                (
                    name: "my-package",
                    targets: new Targets(dotnet: "MyNamespace"),
                    version: "myVersion",
                    types: new Dictionary<string, Type>
                    {
                        {  type1.FullyQualifiedName, type1 },
                        {  type2.FullyQualifiedName, type2 },
                    }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly);

                string actual = symbolMap.GetName(type1);
                Assert.Equal("MyType_", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(RenamesTypeOnMemberConflict))]
            public void RenamesTypeOnMemberConflict()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    isAbstract: false,
                    properties: new[]
                    {
                        new Property("myType", new TypeReference("myFqn"), false, false, false)
                    }
                );

                Assembly assembly = new Assembly
                (
                    name: "my-package",
                    targets: new Targets(dotnet: "MyNamespace"),
                    version: "myVersion",
                    types: new Dictionary<string, Type>
                    {
                        {  type.FullyQualifiedName, type }
                    }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly);

                string actual = symbolMap.GetName(type);
                Assert.Equal("MyType_", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetName
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetName) + ".";

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromType))]
            public void GetsFrameworkNameFromType()
            {
                Type type = new EnumType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "jsii$my_assembly$",
                    members: new EnumMember[] { }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetName(type);
                Assert.Equal("MyType", actual, ignoreLineEndingDifferences: true);

                actual = symbolMap.GetName("myFqn");
                Assert.Equal("MyType", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(DisambiguatesTypeNameOnConflict))]
            public void DisambiguatesTypeNameOnConflict()
            {
                Type type1 = new EnumType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package-1",
                    name: "myType",
                    @namespace: "my-package-1",
                    members: new EnumMember[] { }
                );
                Type type2 = new EnumType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package-2",
                    name: "myType",
                    @namespace: "my-package-2",
                    members: new EnumMember[] { }
                );

                Assembly assembly1 = new Assembly
                (
                    name: "my-package-1",
                    targets: new Targets(dotnet: "MyNamespace1"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type1.FullyQualifiedName, type1 } },
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "my-package-2", new PackageVersion("myVersion", new Targets(dotnet: "MyNamespace2")) }
                    }
                );
                Assembly assembly2 = new Assembly
                (
                    name: "my-package-2",
                    targets: new Targets(dotnet: "MyNamespace2"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type2.FullyQualifiedName, type2 } }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly1);
                symbolMap.Add(assembly2);

                // GetName(Type type)
                string actual1 = symbolMap.GetName(type1, true);
                string actual2 = symbolMap.GetName(type2, true);
                Assert.Equal("MyNamespace1.MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyNamespace2.MyType", actual2, ignoreLineEndingDifferences: true);

                // GetName(string fullyQualifiedName)
                actual1 = symbolMap.GetName("myFqn1", true);
                actual2 = symbolMap.GetName("myFqn2", true);
                Assert.Equal("MyNamespace1.MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyNamespace2.MyType", actual2, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(DoesNotDisambiguateTypeNameIfNoConflict))]
            public void DoesNotDisambiguateTypeNameIfNoConflict()
            {
                Type type1 = new EnumType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package-1",
                    name: "myType1",
                    @namespace: "my-package-1",
                    members: new EnumMember[] { }
                );
                Type type2 = new EnumType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package-2",
                    name: "myType2",
                    @namespace: "my-package-2",
                    members: new EnumMember[] { }
                );

                Assembly assembly1 = new Assembly
                (
                    name: "my-package-1",
                    targets: new Targets(dotnet: "MyNamespace1"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type1.FullyQualifiedName, type1 } },
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "my-package-2", new PackageVersion("myVersion", new Targets(dotnet: "MyNamespace2")) }
                    }
                );
                Assembly assembly2 = new Assembly
                (
                    name: "my-package-2",
                    targets: new Targets(dotnet: "MyNamespace2"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type2.FullyQualifiedName, type2 } }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly1);
                symbolMap.Add(assembly2);

                // GetName(Type type)
                string actual1 = symbolMap.GetName(type1, true);
                string actual2 = symbolMap.GetName(type2, true);
                Assert.Equal("MyType1", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType2", actual2, ignoreLineEndingDifferences: true);

                // GetName(string fullyQualifiedName)
                actual1 = symbolMap.GetName("myFqn1", true);
                actual2 = symbolMap.GetName("myFqn2", true);
                Assert.Equal("MyType1", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType2", actual2, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(DoesNotDisambiguateTypeNameIfFlagNotSet))]
            public void DoesNotDisambiguateTypeNameIfFlagNotSet()
            {
                Type type1 = new EnumType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package-1",
                    name: "myType",
                    @namespace: "my-package-1",
                    members: new EnumMember[] { }
                );
                Type type2 = new EnumType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package-2",
                    name: "myType",
                    @namespace: "my-package-2",
                    members: new EnumMember[] { }
                );

                Assembly assembly1 = new Assembly
                (
                    name: "my-package-1",
                    targets: new Targets(dotnet: "MyNamespace1"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type1.FullyQualifiedName, type1 } },
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "my-package-2", new PackageVersion("myVersion", new Targets(dotnet: "MyNamespace2")) }
                    }
                );
                Assembly assembly2 = new Assembly
                (
                    name: "my-package-2",
                    targets: new Targets(dotnet: "MyNamespace2"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type2.FullyQualifiedName, type2 } }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly1);
                symbolMap.Add(assembly2);

                // GetName(Type type)
                string actual1 = symbolMap.GetName(type1);
                string actual2 = symbolMap.GetName(type2);
                Assert.Equal("MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType", actual2, ignoreLineEndingDifferences: true);

                // GetName(string fullyQualifiedName)
                actual1 = symbolMap.GetName("myFqn1");
                actual2 = symbolMap.GetName("myFqn2");
                Assert.Equal("MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType", actual2, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromMethod))]
            public void GetsFrameworkNameFromMethod()
            {
                Method method = new Method
                (
                    isInitializer: false,
                    isProtected: false,
                    isAbstract: false,
                    name: "myMethod"
                );
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "jsii$my_assembly$",
                    isAbstract: false,
                    methods: new[] { method }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetName(type, method);
                Assert.Equal("MyMethod", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromProperty))]
            public void GetsFrameworkNameFromProperty()
            {
                Property property = new Property
                (
                    name: "myProp",
                    type: new TypeReference("myFqn"),
                    isImmutable: false,
                    isProtected: false,
                    isAbstract: false
                );
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    isAbstract: false,
                    properties: new[] { property }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetName(type, property);
                Assert.Equal("MyProp", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromEnumMember))]
            public void GetsFrameworkNameFromEnumMember()
            {
                EnumMember member = new EnumMember("myMember");
                Type type = new EnumType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    members: new[] { member }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetName(type, member);
                Assert.Equal("MyMember", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromParameter))]
            public void GetsFrameworkNameFromParameter()
            {
                Parameter parameter = new Parameter("myParam", new TypeReference("myFqn"));
                Method method = new Method
                (
                    isInitializer: false,
                    isProtected: false,
                    isAbstract: false,
                    parameters: new[] { parameter },
                    name: "myMethod"
                );
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    isAbstract: false,
                    methods: new[] { method }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetName(parameter);
                Assert.Equal("myParam", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetNameSyntaxToken
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetNameSyntaxToken) + ".";

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromType))]
            public void GetsFrameworkNameFromType()
            {
                Type type = new EnumType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    members: new EnumMember[] { }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntaxToken(type).ToString();
                Assert.Equal("MyType", actual, ignoreLineEndingDifferences: true);

                actual = symbolMap.GetName("myFqn");
                Assert.Equal("MyType", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(DisambiguatesTypeNameOnConflict))]
            public void DisambiguatesTypeNameOnConflict()
            {
                Type type1 = new EnumType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package-1",
                    name: "myType",
                    @namespace: "my-package-1",
                    members: new EnumMember[] { }
                );
                Type type2 = new EnumType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package-2",
                    name: "myType",
                    @namespace: "my-package-2",
                    members: new EnumMember[] { }
                );

                Assembly assembly1 = new Assembly
                (
                    name: "my-package-1",
                    targets: new Targets(dotnet: "MyNamespace1"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type1.FullyQualifiedName, type1 } },
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "my-package-2", new PackageVersion("myVersion", new Targets(dotnet: "MyNamespace2")) }
                    }
                );
                Assembly assembly2 = new Assembly
                (
                    name: "my-package-2",
                    targets: new Targets(dotnet: "MyNamespace2"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type2.FullyQualifiedName, type2 } }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly1);
                symbolMap.Add(assembly2);

                // GetNameSyntaxToken(Type type)
                string actual1 = symbolMap.GetNameSyntaxToken(type1, true).ToString();
                string actual2 = symbolMap.GetNameSyntaxToken(type2, true).ToString();
                Assert.Equal("MyNamespace1.MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyNamespace2.MyType", actual2, ignoreLineEndingDifferences: true);

                // GetNameSyntaxToken(string fullyQualifiedName)
                actual1 = symbolMap.GetNameSyntaxToken("myFqn1", true).ToString();
                actual2 = symbolMap.GetNameSyntaxToken("myFqn2", true).ToString();
                Assert.Equal("MyNamespace1.MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyNamespace2.MyType", actual2, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(DoesNotDisambiguateTypeNameIfNoConflict))]
            public void DoesNotDisambiguateTypeNameIfNoConflict()
            {
                Type type1 = new EnumType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package-1",
                    name: "myType1",
                    @namespace: "my-package-1",
                    members: new EnumMember[] { }
                );
                Type type2 = new EnumType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package-2",
                    name: "myType2",
                    @namespace: "my-package-2",
                    members: new EnumMember[] { }
                );

                Assembly assembly1 = new Assembly
                (
                    name: "my-package-1",
                    targets: new Targets(dotnet: "MyNamespace1"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type1.FullyQualifiedName, type1 } },
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "my-package-2", new PackageVersion("myVersion", new Targets(dotnet: "MyNamespace2")) }
                    }
                );
                Assembly assembly2 = new Assembly
                (
                    name: "my-package-2",
                    targets: new Targets(dotnet: "MyNamespace2"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type2.FullyQualifiedName, type2 } }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly1);
                symbolMap.Add(assembly2);

                // GetNameSyntaxToken(Type type)
                string actual1 = symbolMap.GetNameSyntaxToken(type1, true).ToString();
                string actual2 = symbolMap.GetNameSyntaxToken(type2, true).ToString();
                Assert.Equal("MyType1", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType2", actual2, ignoreLineEndingDifferences: true);

                // GetNameSyntaxToken(string fullyQualifiedName)
                actual1 = symbolMap.GetNameSyntaxToken("myFqn1", true).ToString();
                actual2 = symbolMap.GetNameSyntaxToken("myFqn2", true).ToString();
                Assert.Equal("MyType1", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType2", actual2, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(DoesNotDisambiguateTypeNameIfFlagNotSet))]
            public void DoesNotDisambiguateTypeNameIfFlagNotSet()
            {
                Type type1 = new EnumType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package-1",
                    name: "myType",
                    @namespace: "my-package-1",
                    members: new EnumMember[] { }
                );
                Type type2 = new EnumType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package-2",
                    name: "myType",
                    @namespace: "my-package-2",
                    members: new EnumMember[] { }
                );

                Assembly assembly1 = new Assembly
                (
                    name: "my-package-1",
                    targets: new Targets(dotnet: "MyNamespace1"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type1.FullyQualifiedName, type1 } },
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "my-package-2", new PackageVersion("myVersion", new Targets(dotnet: "MyNamespace2")) }
                    }
                );
                Assembly assembly2 = new Assembly
                (
                   name: "my-package-2",
                   targets: new Targets(dotnet: "MyNamespace2"),
                   version: "myVersion",
                   types: new Dictionary<string, Type> { { type2.FullyQualifiedName, type2 } }
               );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly1);
                symbolMap.Add(assembly2);

                // GetNameSyntaxToken(Type type)
                string actual1 = symbolMap.GetNameSyntaxToken(type1).ToString();
                string actual2 = symbolMap.GetNameSyntaxToken(type2).ToString();
                Assert.Equal("MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType", actual2, ignoreLineEndingDifferences: true);

                // GetNameSyntaxToken(string fullyQualifiedName)
                actual1 = symbolMap.GetNameSyntaxToken("myFqn1").ToString();
                actual2 = symbolMap.GetNameSyntaxToken("myFqn2").ToString();
                Assert.Equal("MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType", actual2, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromMethod))]
            public void GetsFrameworkNameFromMethod()
            {
                Method method = new Method
                (
                    isInitializer: false,
                    isProtected: false,
                    isAbstract: false,
                    name: "myMethod"
                );
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    isAbstract: false,
                    methods: new[] { method }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntaxToken(type, method).ToString();
                Assert.Equal("MyMethod", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromProperty))]
            public void GetsFrameworkNameFromProperty()
            {
                Property property = new Property
                (
                    name: "myProp",
                    type: new TypeReference("myFqn"),
                    isImmutable: false,
                    isProtected: false,
                    isAbstract: false
                );
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    isAbstract: false,
                    properties: new[] { property }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntaxToken(type, property).ToString();
                Assert.Equal("MyProp", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromEnumMember))]
            public void GetsFrameworkNameFromEnumMember()
            {
                EnumMember member = new EnumMember("myMember");
                Type type = new EnumType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    members: new[] { member }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntaxToken(type, member).ToString();
                Assert.Equal("MyMember", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromParameter))]
            public void GetsFrameworkNameFromParameter()
            {
                Parameter parameter = new Parameter("myParam", new TypeReference("myFqn"));
                Method method = new Method
                (
                    isInitializer: false,
                    isProtected: false,
                    isAbstract: false,
                    parameters: new[] { parameter },
                    name: "myMethod"
                );
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    isAbstract: false,
                    methods: new[] { method }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntaxToken(parameter).ToString();
                Assert.Equal("myParam", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetNameSyntax
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetNameSyntax) + ".";

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromType))]
            public void GetsFrameworkNameFromType()
            {
                Type type = new EnumType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    members: new EnumMember[] { }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntax(type).ToString();
                Assert.Equal("MyType", actual, ignoreLineEndingDifferences: true);

                actual = symbolMap.GetName("myFqn");
                Assert.Equal("MyType", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(DisambiguatesTypeNameOnConflict))]
            public void DisambiguatesTypeNameOnConflict()
            {
                Type type1 = new EnumType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package-1",
                    name: "myType",
                    @namespace: "my-package-1",
                    members: new EnumMember[] { }
                );
                Type type2 = new EnumType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package-2",
                    name: "myType",
                    @namespace: "my-package-2",
                    members: new EnumMember[] { }
                );

                Assembly assembly1 = new Assembly
                (
                    name: "my-package-1",
                    targets: new Targets(dotnet: "MyNamespace1"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type1.FullyQualifiedName, type1 } },
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "my-package-2", new PackageVersion("myVersion", new Targets(dotnet: "MyNamespace2")) }
                    }
                );
                Assembly assembly2 = new Assembly
                (
                    name: "my-package-2",
                    targets: new Targets(dotnet: "MyNamespace2"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type2.FullyQualifiedName, type2 } }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly1);
                symbolMap.Add(assembly2);

                // GetNameSyntax(Type type)
                string actual1 = symbolMap.GetNameSyntax(type1, true).ToString();
                string actual2 = symbolMap.GetNameSyntax(type2, true).ToString();
                Assert.Equal("MyNamespace1.MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyNamespace2.MyType", actual2, ignoreLineEndingDifferences: true);

                // GetNameSyntax(string fullyQualifiedName)
                actual1 = symbolMap.GetNameSyntax("myFqn1", true).ToString();
                actual2 = symbolMap.GetNameSyntax("myFqn2", true).ToString();
                Assert.Equal("MyNamespace1.MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyNamespace2.MyType", actual2, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(DoesNotDisambiguateTypeNameIfNoConflict))]
            public void DoesNotDisambiguateTypeNameIfNoConflict()
            {
                Type type1 = new EnumType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package-1",
                    name: "myType1",
                    @namespace: "my-package-1",
                    members: new EnumMember[] { }
                );
                Type type2 = new EnumType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package-2",
                    name: "myType2",
                    @namespace: "my-package-2",
                    members: new EnumMember[] { }
                );

                Assembly assembly1 = new Assembly
                (
                    name: "my-package-1",
                    targets: new Targets(dotnet: "MyNamespace1"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type1.FullyQualifiedName, type1 } },
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "my-package-2", new PackageVersion("myVersion", new Targets(dotnet: "MyNamespace2")) }
                    }
                );
                Assembly assembly2 = new Assembly
                (
                    name: "my-package-2",
                    targets: new Targets(dotnet: "MyNamespace2"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type2.FullyQualifiedName, type2 } }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly1);
                symbolMap.Add(assembly2);

                // GetNameSyntax(Type type)
                string actual1 = symbolMap.GetNameSyntax(type1, true).ToString();
                string actual2 = symbolMap.GetNameSyntax(type2, true).ToString();
                Assert.Equal("MyType1", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType2", actual2, ignoreLineEndingDifferences: true);

                // GetNameSyntax(string fullyQualifiedName)
                actual1 = symbolMap.GetNameSyntax("myFqn1", true).ToString();
                actual2 = symbolMap.GetNameSyntax("myFqn2", true).ToString();
                Assert.Equal("MyType1", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType2", actual2, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(DoesNotDisambiguateTypeNameIfFlagNotSet))]
            public void DoesNotDisambiguateTypeNameIfFlagNotSet()
            {
                Type type1 = new EnumType
                (
                    fullyQualifiedName: "myFqn1",
                    assembly: "my-package-1",
                    name: "myType",
                    @namespace: "my-package-1",
                    members: new EnumMember[] { }
                );
                Type type2 = new EnumType
                (
                    fullyQualifiedName: "myFqn2",
                    assembly: "my-package-2",
                    name: "myType",
                    @namespace: "my-package-2",
                    members: new EnumMember[] { }
                );

                Assembly assembly1 = new Assembly
                (
                    name: "my-package-1",
                    targets: new Targets(dotnet: "MyNamespace1"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type1.FullyQualifiedName, type1 } },
                    dependencies: new Dictionary<string, PackageVersion>
                    {
                        { "my-package-2", new PackageVersion("myVersion", new Targets(dotnet: "MyNamespace2")) }
                    }
                );
                Assembly assembly2 = new Assembly
                (
                    name: "my-package-2",
                    targets: new Targets(dotnet: "MyNamespace2"),
                    version: "myVersion",
                    types: new Dictionary<string, Type> { { type2.FullyQualifiedName, type2 } }
                );

                ISymbolMap symbolMap = new SymbolMap();
                symbolMap.Add(assembly1);
                symbolMap.Add(assembly2);

                // GetNameSyntax(Type type)
                string actual1 = symbolMap.GetNameSyntax(type1).ToString();
                string actual2 = symbolMap.GetNameSyntax(type2).ToString();
                Assert.Equal("MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType", actual2, ignoreLineEndingDifferences: true);

                // GetNameSyntax(string fullyQualifiedName)
                actual1 = symbolMap.GetNameSyntax("myFqn1").ToString();
                actual2 = symbolMap.GetNameSyntax("myFqn2").ToString();
                Assert.Equal("MyType", actual1, ignoreLineEndingDifferences: true);
                Assert.Equal("MyType", actual2, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromMethod))]
            public void GetsFrameworkNameFromMethod()
            {
                Method method = new Method
                (
                    isInitializer: false,
                    isProtected: false,
                    isAbstract: false,
                    name: "myMethod"
                );
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    isAbstract: false,
                    methods: new[] { method }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntax(type, method).ToString();
                Assert.Equal("MyMethod", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromProperty))]
            public void GetsFrameworkNameFromProperty()
            {
                Property property = new Property
                (
                    name: "myProp",
                    type: new TypeReference("myFqn"),
                    isImmutable: false,
                    isProtected: false,
                    isAbstract: false
                );
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    isAbstract: false,
                    properties: new[] { property }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntax(type, property).ToString();
                Assert.Equal("MyProp", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromEnumMember))]
            public void GetsFrameworkNameFromEnumMember()
            {
                EnumMember member = new EnumMember("myMember");
                Type type = new EnumType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    members: new[] { member }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntax(type, member).ToString();
                Assert.Equal("MyMember", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = Prefix + nameof(GetsFrameworkNameFromParameter))]
            public void GetsFrameworkNameFromParameter()
            {
                Parameter parameter = new Parameter("myParam", new TypeReference("myFqn"));
                Method method = new Method
                (
                    isInitializer: false,
                    isProtected: false,
                    isAbstract: false,
                    parameters: new[] { parameter },
                    name: "myMethod"
                );
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myType",
                    @namespace: "my-package",
                    isAbstract: false,
                    methods: new[] { method }
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNameSyntax(parameter).ToString();
                Assert.Equal("myParam", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetNamespace
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetNamespace) + ".";

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkNamespaceFromType))]
            public void GetsFrameworkNamespaceFromType()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNamespace(type);
                Assert.Equal("My.Assembly", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkNamespaceFromFqn))]
            public void GetsFrameworkNamespaceFromFqn()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNamespace("myFqn");
                Assert.Equal("My.Assembly", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetNamespaceSyntaxToken
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetNamespaceSyntaxToken) + ".";

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkNamespaceFromType))]
            public void GetsFrameworkNamespaceFromType()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNamespaceSyntaxToken(type).ToString();
                Assert.Equal("My.Assembly", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkNamespaceFromFqn))]
            public void GetsFrameworkNamespaceFromFqn()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNamespaceSyntaxToken("myFqn").ToString();
                Assert.Equal("My.Assembly", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetNamespaceSyntax
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetNamespaceSyntax) + ".";

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkNamespaceFromType))]
            public void GetsFrameworkNamespaceFromType()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNamespaceSyntax(type).ToString();
                Assert.Equal("My.Assembly", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkNamespaceFromFqn))]
            public void GetsFrameworkNamespaceFromFqn()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetNamespaceSyntax("myFqn").ToString();
                Assert.Equal("My.Assembly", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetPackage
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetPackage) + ".";

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkPackageFromType))]
            public void GetsFrameworkPackageFromType()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetPackage(type);
                Assert.Equal("my-package", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkPackageFromFqn))]
            public void GetsFrameworkPackageFromFqn()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetPackage("myFqn");
                Assert.Equal("my-package", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetPackageSyntaxToken
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetPackageSyntaxToken) + ".";

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkPackageFromType))]
            public void GetsFrameworkPackageFromType()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetPackageSyntaxToken(type).ToString();
                Assert.Equal("my-package", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkPackageFromFqn))]
            public void GetsFrameworkPackageFromFqn()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetPackageSyntaxToken("myFqn").ToString();
                Assert.Equal("my-package", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetPackageSyntax
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetPackageSyntax) + ".";

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkPackageFromType))]
            public void GetsFrameworkPackageFromType()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetPackageSyntax(type).ToString();
                Assert.Equal("my-package", actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = _Prefix + nameof(GetsFrameworkPackageFromFqn))]
            public void GetsFrameworkPackageFromFqn()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);

                string actual = symbolMap.GetPackageSyntax("myFqn").ToString();
                Assert.Equal("my-package", actual, ignoreLineEndingDifferences: true);
            }
        }

        public class GetTypeSyntax
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetTypeSyntax) + ".";

            [Theory(DisplayName = _Prefix + nameof(GetsPrimitiveFrameworkType))]
            [InlineData(PrimitiveType.Any, false, "object")]
            [InlineData(PrimitiveType.Any, true, "object")]
            [InlineData(PrimitiveType.Boolean, false, "bool")]
            [InlineData(PrimitiveType.Boolean, true, "bool?")]
            [InlineData(PrimitiveType.Date, false, "DateTime")]
            [InlineData(PrimitiveType.Date, true, "DateTime?")]
            [InlineData(PrimitiveType.Json, false, "JObject")]
            [InlineData(PrimitiveType.Json, true, "JObject")]
            [InlineData(PrimitiveType.Number, false, "double")]
            [InlineData(PrimitiveType.Number, true, "double?")]
            [InlineData(PrimitiveType.String, false, "string")]
            [InlineData(PrimitiveType.String, true, "string")]
            public void GetsPrimitiveFrameworkType(PrimitiveType type, bool isOptional, string expected)
            {
                ISymbolMap symbolMap = new SymbolMap();

                TypeReference reference = new TypeReference(primitive: type, isOptional: isOptional);

                string actual = symbolMap.GetTypeSyntax(reference).ToString();
                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Theory(DisplayName = _Prefix + nameof(GetsRecursiveCollectionFrameworkType))]
            [InlineData(CollectionKind.Array, false, "double[][]")]
            [InlineData(CollectionKind.Array, true, "double[][]")]
            [InlineData(CollectionKind.Map, false, "IDictionary<string, IDictionary<string, double>>")]
            [InlineData(CollectionKind.Map, true, "IDictionary<string, IDictionary<string, double>>")]
            public void GetsRecursiveCollectionFrameworkType(CollectionKind kind, bool isOptional, string expected)
            {
                ISymbolMap symbolMap = new SymbolMap();

                TypeReference reference = new TypeReference
                (
                    collection: new CollectionTypeReference
                    (
                        kind: kind,
                        elementType: new TypeReference(collection: new CollectionTypeReference(kind, new TypeReference(primitive: PrimitiveType.Number)))
                    ),
                    isOptional: isOptional
                );

                string actual = symbolMap.GetTypeSyntax(reference).ToString();
                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Theory(DisplayName = _Prefix + nameof(GetsUnionFrameworkType))]
            [InlineData(false, "object")]
            [InlineData(true, "object")]
            public void GetsUnionFrameworkType(bool isOptional, string expected)
            {
                ISymbolMap symbolMap = new SymbolMap();

                TypeReference reference = new TypeReference
                (
                    union: new UnionTypeReference(new[] {
                        new TypeReference(primitive: PrimitiveType.Number)
                    }),
                    isOptional: isOptional
                );

                string actual = symbolMap.GetTypeSyntax(reference).ToString();
                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Fact(DisplayName = _Prefix + nameof(GetsObjectFrameworkType))]
            public void GetsObjectFrameworkType()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);
                TypeReference reference = new TypeReference("myFqn");

                string actual = symbolMap.GetTypeSyntax(reference).ToString();
                Assert.Equal("MyName", actual, ignoreLineEndingDifferences: true);

            }
        }

        public class GetTypeFromFullyQualifiedName
        {
            const string _Prefix = Prefix + nameof(SymbolMap.GetTypeFromFullyQualifiedName) + ".";

            public void GetsObjectFrameworkType()
            {
                Type type = new ClassType
                (
                    fullyQualifiedName: "myFqn",
                    assembly: "my-package",
                    name: "myName",
                    @namespace: "my-package",
                    isAbstract: false
                );

                ISymbolMap symbolMap = GetSymbolMap(type);
                TypeReference reference = new TypeReference("myFqn");

                ClassType actual = symbolMap.GetTypeFromFullyQualifiedName("myFqn") as ClassType;
                Assert.NotNull(actual);
                Assert.Equal("myFqn", actual.FullyQualifiedName, ignoreLineEndingDifferences: true);
                Assert.Equal("my-package", actual.Assembly, ignoreLineEndingDifferences: true);
                Assert.Equal("myName", actual.Name, ignoreLineEndingDifferences: true);
                Assert.Equal("my-package", actual.Namespace, ignoreLineEndingDifferences: true);
                Assert.False(actual.IsAbstract);
            }
        }
    }
}

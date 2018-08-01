using Amazon.JSII.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NSubstitute;
using Xunit;

namespace Amazon.JSII.Generator.UnitTests
{
    public class TypeExtensionsTests
    {
        const string Prefix = nameof(Generator) + "." + nameof(TypeExtensions) + ".";

        public class AnyAncestor : GeneratorTestBase
        {
            const string _Prefix = Prefix + nameof(TypeExtensions.AnyAncestor);

            ClassType CreateType(bool includeParent, bool includeGrandparent)
            {
                ClassType grandParentType = null;
                if (includeGrandparent)
                {
                    grandParentType = new ClassType
                    (
                        "myGrandParentTypeFqn",
                        "myPackage",
                        "myGrandParentType",
                        "myNamespace",
                        false
                    );

                    Symbols.MapFullyQualifiedNameToType("myGrandParentTypeFqn", grandParentType);
                }

                ClassType parentType = null;
                if (includeParent)
                {
                    parentType = new ClassType
                    (
                        "myParentTypeFqn",
                        "myPackage",
                        "myParentType",
                        "myNamespace",
                        false,
                        @base: includeGrandparent ? new TypeReference("myGrandParentTypeFqn") : null
                    );
                    Symbols.MapFullyQualifiedNameToType("myParentTypeFqn", parentType);
                }

                ClassType classType = new ClassType
                (
                    "myClassFqn",
                    "myPackage",
                    "myClass",
                    "myNamespace",
                    false,
                    @base: includeParent ? new TypeReference("myParentTypeFqn") : null
                );
                Symbols.MapFullyQualifiedNameToType("myClassFqn", classType);

                return classType;
            }

            [Fact(DisplayName = _Prefix + nameof(ReturnsFalseIfNoAncestorExists))]
            public void ReturnsFalseIfNoAncestorExists()
            {
                ClassType classType = CreateType(false, false);

                bool actual = classType.AnyAncestor(Symbols, t => t.Name != string.Empty);
                Assert.False(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ReturnsFalseIfNoAncestorMatches))]
            public void ReturnsFalseIfNoAncestorMatches()
            {
                ClassType classType = CreateType(true, true);

                bool actual = classType.AnyAncestor(Symbols, t => t.Name == "myNephewType");
                Assert.False(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ReturnsTrueIfBaseMatches))]
            public void ReturnsTrueIfBaseMatches()
            {
                ClassType classType = CreateType(true, true);

                bool actual = classType.AnyAncestor(Symbols, t => t.Name == "myParentType");
                Assert.True(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(ReturnsTrueIfAncestorMatches))]
            public void ReturnsTrueIfAncestorMatches()
            {
                ClassType classType = CreateType(true, true);

                bool actual = classType.AnyAncestor(Symbols, t => t.Name == "myGrandParentType");
                Assert.True(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(DoesNotAttemptToMatchSelf))]
            public void DoesNotAttemptToMatchSelf()
            {
                ClassType classType = CreateType(true, true);

                bool actual = classType.AnyAncestor(Symbols, t => t.Name == "myClass");
                Assert.False(actual);
            }

            [Fact(DisplayName = _Prefix + nameof(DoesNotAttemptToMatchInterfaces))]
            public void DoesNotAttemptToMatchInterfaces()
            {
                InterfaceType interfaceType = new InterfaceType
                (
                    "myInterfaceFqn",
                    "myPackage",
                    "myInterface",
                    "myNamespace"
                );
                Symbols.MapFullyQualifiedNameToType("myInterfaceFqn", interfaceType);

                ClassType classType = new ClassType
                (
                    "myClassFqn",
                    "myPackage",
                    "myClass",
                    "myNamespace",
                    false,
                    interfaces: new[] { new TypeReference("myInterfaceFqn") }
                );
                Symbols.MapFullyQualifiedNameToType("myClassFqn", classType);

                bool actual = classType.AnyAncestor(Symbols, t => t.Name == "myInterface");
                Assert.False(actual);
            }
        }

    }
}

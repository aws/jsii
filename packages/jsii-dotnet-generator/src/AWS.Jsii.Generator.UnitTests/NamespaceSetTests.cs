using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Linq;
using Xunit;
using SF = Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace AWS.Jsii.Generator.UnitTests
{
    public class NamespaceSetTests : GeneratorTestBase
    {
        const string Prefix = nameof(Generator) + "." + nameof(NamespaceSet) + ".";

        void AssertUsings(SyntaxList<UsingDirectiveSyntax> usings, params string[] expectations)
        {
            Assert.Collection(usings, expectations.Select(GetInspector).ToArray());

            System.Action<UsingDirectiveSyntax> GetInspector(string expected)
            {
                return u => Assert.Equal(
                    expected,
                    u.NormalizeWhitespace(elasticTrivia: true).ToString(),
                    ignoreLineEndingDifferences: true
                );
            }
        }

        [Fact(DisplayName = Prefix + nameof(CreatesUsingStatementForType))]
        public void CreatesUsingStatementForType()
        {
            EnumType type = new EnumType
            (
                "myEnumFqn",
                "myModule",
                "myEnum",
                "myNamespace",
                new EnumMember[] { }
            );

            Symbols.MapNamespace("myNamespace", "MyNamespace");

            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(type);

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;",
                "using MyNamespace;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(CreatesUsingStatementForObjectReference))]
        public void CreatesUsingStatementForObjectReference()
        {
            Symbols.MapTypeToNamespace("myFqn", "MyNamespace");

            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference("myFqn"));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;",
                "using MyNamespace;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(CreatesUsingStatementForDateReference))]
        public void CreatesUsingStatementForDateReference()
        {
            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference(primitive: PrimitiveType.Date));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;",
                "using System;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(CreatesUsingStatementForJsonReference))]
        public void CreatesUsingStatementForJsonReference()
        {
            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference(primitive: PrimitiveType.Json));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;",
                "using Newtonsoft.Json.Linq;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(DoesNotCreateUsingStatementForSystemPrimitive))]
        public void DoesNotCreateUsingStatementForSystemPrimitive()
        {
            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference(primitive: PrimitiveType.Any));
            namespaces.Add(new TypeReference(primitive: PrimitiveType.Boolean));
            namespaces.Add(new TypeReference(primitive: PrimitiveType.Number));
            namespaces.Add(new TypeReference(primitive: PrimitiveType.String));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(CreatesUsingStatementForMapReference))]
        public void CreatesUsingStatementForMapReference()
        {
            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference(collection: new CollectionTypeReference(
                CollectionKind.Map,
                new TypeReference(primitive: PrimitiveType.String)
            )));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;",
                "using System.Collections.Generic;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(RecursivelyCreatesUsingStatementForMapElementReference))]
        public void RecursivelyCreatesUsingStatementForMapElementReference()
        {
            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference(collection: new CollectionTypeReference(
                CollectionKind.Map,
                new TypeReference(collection: new CollectionTypeReference(
                    CollectionKind.Map,
                    new TypeReference(primitive: PrimitiveType.Json)
                ))
            )));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;",
                "using Newtonsoft.Json.Linq;",
                "using System.Collections.Generic;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(DoesNotCreateUsingStatementForArrayReference))]
        public void DoesNotCreateUsingStatementForArrayReference()
        {
            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference(collection: new CollectionTypeReference(
                CollectionKind.Array,
                new TypeReference(primitive: PrimitiveType.String)
            )));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(RecursivelyCreatesUsingStatementForArrayElementReference))]
        public void RecursivelyCreatesUsingStatementForArrayElementReference()
        {
            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference(collection: new CollectionTypeReference(
                CollectionKind.Array,
                new TypeReference(collection: new CollectionTypeReference(
                    CollectionKind.Array,
                    new TypeReference(primitive: PrimitiveType.Json)
                ))
            )));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;",
                "using Newtonsoft.Json.Linq;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(RecursivelyCreatesUsingStatementForEachTypeInUnionReference))]
        public void RecursivelyCreatesUsingStatementForEachTypeInUnionReference()
        {
            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference(union: new UnionTypeReference(new TypeReference[] {
                new TypeReference(collection: new CollectionTypeReference(
                    CollectionKind.Array,
                    new TypeReference(collection: new CollectionTypeReference(
                        CollectionKind.Array,
                        new TypeReference(primitive: PrimitiveType.Json)
                    ))
                )),
                new TypeReference(primitive: PrimitiveType.Date),
            })));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;",
                "using Newtonsoft.Json.Linq;",
                "using System;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(DoesNotCreateDuplicateUsingStatements))]
        public void DoesNotCreateDuplicateUsingStatements()
        {
            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference(primitive: PrimitiveType.Json));
            namespaces.Add(new TypeReference(primitive: PrimitiveType.Json));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;",
                "using Newtonsoft.Json.Linq;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(DoesNotCreateUsingStatementForCurrentNamespace))]
        public void DoesNotCreateUsingStatementForCurrentNamespace()
        {
            Symbols.MapTypeToNamespace("myFqn", "MyCurrentNamespace");

            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference("myFqn"));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AWS.Jsii.Runtime.Deputy;"
            );
        }

        [Fact(DisplayName = Prefix + nameof(SortsUsingStatementsAlphaNumerically))]
        public void SortsUsingStatementsAlphaNumerically()
        {
            Symbols.MapTypeToNamespace("myFqn", "AAA");

            NamespaceSet namespaces = new NamespaceSet(Symbols, SF.ParseName("MyCurrentNamespace"));
            namespaces.Add(new TypeReference("myFqn"));

            SyntaxList<UsingDirectiveSyntax> usings = namespaces.GetUsings();
            AssertUsings
            (
                usings,
                "using AAA;",
                "using AWS.Jsii.Runtime.Deputy;"
            );
        }
    }
}

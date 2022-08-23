
using System;
using System.Collections.Generic;
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace;
using Amazon.JSII.Tests.CalculatorNamespace.Anonymous;
using Xunit;

#pragma warning disable CS0612

namespace Amazon.JSII.Runtime.IntegrationTests
{
    public sealed class TypeCheckingTests : IClassFixture<ServiceContainerFixture>, IDisposable
    {
        const string Prefix = nameof(TypeCheckingTests) + ".";

        private readonly IDisposable _serviceContainerFixture;

        public TypeCheckingTests(ServiceContainerFixture serviceContainerFixture)
        {
            _serviceContainerFixture = serviceContainerFixture;
        }

        void IDisposable.Dispose()
        {
            _serviceContainerFixture.Dispose();
        }

        [Fact(DisplayName = Prefix + nameof(Constructor))]
        public void Constructor()
        {
            var exception = Assert.Throws<System.ArgumentException>(() =>
                new ClassWithCollectionOfUnions(new IDictionary<string, object>[]
                {
                    new Dictionary<string, object>
                    {
                        { "good", new StructA { RequiredString = "present"} },
                        { "bad", $"Not a {nameof(StructA)} or {nameof(StructB)}" },
                    }
                })
            );
            Assert.Equal("Expected argument unionProperty[0][\"bad\"] to be one of: Amazon.JSII.Tests.CalculatorNamespace.IStructA, Amazon.JSII.Tests.CalculatorNamespace.IStructB; received System.String (Parameter 'unionProperty')", exception.Message);
        }

        [Fact(DisplayName = Prefix + nameof(Setter))]
        public void Setter()
        {
            var subject = new ClassWithCollectionOfUnions(Array.Empty<IDictionary<string, object>>());
            var exception = Assert.Throws<System.ArgumentException>(() =>
                    subject.UnionProperty = new IDictionary<string, object>[]
                    {
                        new Dictionary<string, object>
                        {
                            { "good", new StructA { RequiredString = "present" } },
                            { "bad", $"Not a {nameof(StructA)} or {nameof(StructB)}" },
                        }
                    });
            Assert.Equal("Expected value[0][\"bad\"] to be one of: Amazon.JSII.Tests.CalculatorNamespace.IStructA, Amazon.JSII.Tests.CalculatorNamespace.IStructB; received System.String (Parameter 'value')", exception.Message);
        }

        [Fact(DisplayName = Prefix + nameof(StaticMethod))]
        public void StaticMethod()
        {
            var exception = Assert.Throws<System.ArgumentException>(() =>
                StructUnionConsumer.IsStructA("Not a StructA"));
            Assert.Equal("Expected argument struct to be one of: Amazon.JSII.Tests.CalculatorNamespace.IStructA, Amazon.JSII.Tests.CalculatorNamespace.IStructB; received System.String (Parameter 'struct')", exception.Message);
        }

        [Fact(DisplayName = Prefix + nameof(AnonymousObjectIsValid))]
        public void AnonymousObjectIsValid()
        {
            var anonymousObject = UseOptions.Provide("A");
            Assert.IsType<AnonymousObject>(anonymousObject);
            Assert.Equal("A", UseOptions.Consume(anonymousObject));
        }

        [Fact(DisplayName = Prefix + nameof(NestedUnion))]
        public void NestedUnion()
        {
            var exception1 = Assert.Throws<System.ArgumentException>(() =>
                new ClassWithNestedUnion(new object[] { 1337.42 }));
            Assert.Equal("Expected argument unionProperty[0] to be one of: System.Collections.Generic.IDictionary<string, object>, object[]; received System.Double (Parameter 'unionProperty')", exception1.Message);

            var exception2 = Assert.Throws<System.ArgumentException>(() =>
                new ClassWithNestedUnion(new object[]
                    { new object[] { new StructA { RequiredString = "present" }, 1337 } }));
            Assert.Equal("Expected argument unionProperty[0][1] to be one of: Amazon.JSII.Tests.CalculatorNamespace.IStructA, Amazon.JSII.Tests.CalculatorNamespace.IStructB; received System.Int32 (Parameter 'unionProperty')", exception2.Message);

            var exception3 = Assert.Throws<System.ArgumentException>(() =>
                new ClassWithNestedUnion(new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "good", new StructA { RequiredString = "present" } },
                        { "bad", "Not a StructA or StructB" }
                    }
                }));
            Assert.Equal("Expected argument unionProperty[0][\"bad\"] to be one of: Amazon.JSII.Tests.CalculatorNamespace.IStructA, Amazon.JSII.Tests.CalculatorNamespace.IStructB; received System.String (Parameter 'unionProperty')", exception3.Message);
        }
    }
}

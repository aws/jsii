
using System;
using System.Collections.Generic;
using Amazon.JSII.Tests.CalculatorNamespace;
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
    }
}
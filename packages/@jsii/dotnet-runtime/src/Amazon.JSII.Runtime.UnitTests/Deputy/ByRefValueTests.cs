using Amazon.JSII.Runtime.Deputy;
using Xunit;

namespace Amazon.JSII.Runtime.UnitTests.Deputy
{
    public sealed class ByRefValueTests
    {
        const string Prefix = "Runtime.Deputy." + nameof(ByRefValue) + ".";

        [Fact(DisplayName = Prefix + nameof(ObjectReferenceOmitsEmptyInterfaces))]
        public void ObjectReferenceOmitsEmptyInterfaces()
        {
            var reference = new ByRefValue("Object@10000").ToObjectReference();

            Assert.Equal("Object@10000", reference["$jsii.byref"]);
            Assert.False(reference.ContainsKey("$jsii.interfaces"));
        }

        [Fact(DisplayName = Prefix + nameof(ProxyForInterfaceAddsTheInterface))]
        public void ProxyForInterfaceAddsTheInterface()
        {
            var original = new ByRefValue("Object@10000", new[] { "test.IFirst" });

            var proxy = original.ForProxy("test.ISecond");

            Assert.True(proxy.IsProxy);
            Assert.Equal(new[] { "test.IFirst", "test.ISecond" }, proxy.Interfaces);
            Assert.Equal(new[] { "test.IFirst", "test.ISecond" }, proxy.ToObjectReference()["$jsii.interfaces"]);
            // The original reference is not changed
            Assert.Equal(new[] { "test.IFirst" }, original.Interfaces);
        }

        [Fact(DisplayName = Prefix + nameof(ProxyForKnownInterfaceKeepsInterfaces))]
        public void ProxyForKnownInterfaceKeepsInterfaces()
        {
            var original = new ByRefValue("Object@10000", new[] { "test.IFirst" });

            Assert.Equal(new[] { "test.IFirst" }, original.ForProxy("test.IFirst").Interfaces);
        }
    }
}

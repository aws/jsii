using System;
using Amazon.JSII.Runtime.Deputy;
using Xunit;
using Xunit.Sdk;

namespace Amazon.JSII.Runtime.UnitTests.Deputy
{
    public sealed class DeputyBaseTests
    {
        const string Prefix = "Runtime.Deputy." + nameof(DeputyBase) + ".";

        [Fact(DisplayName = Prefix + nameof(CanCastToAnyInterface))]
        public void CanCastToAnyInterface()
        {
            var subject = new AnonymousObject(new ByRefValue("object@10000", Array.Empty<string>()));
            var result = subject.UnsafeCast<IManagedInterface>();
            Assert.IsType<ManagedInterfaceProxy>(result);
        }
        
        [JsiiInterface(typeof(IManagedInterface), "test.IManagedInterface")]
        private interface IManagedInterface
        {
            bool BooleanProperty { get; }
        }

        [JsiiTypeProxy(typeof(IManagedInterface), "test.IManagedInterface")]
        private class ManagedInterfaceProxy : DeputyBase, IManagedInterface
        {
            public ManagedInterfaceProxy(ByRefValue byRef): base(byRef)
            {
                BooleanProperty = true;
            }
            
            public bool BooleanProperty { get; }
        }
    }
}
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(ImplementsInterfaceWithInternalSubclass), "jsii-calc.ImplementsInterfaceWithInternalSubclass", "[]")]
    public class ImplementsInterfaceWithInternalSubclass : ImplementsInterfaceWithInternal
    {
        public ImplementsInterfaceWithInternalSubclass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ImplementsInterfaceWithInternalSubclass(ByRefValue reference): base(reference)
        {
        }

        protected ImplementsInterfaceWithInternalSubclass(DeputyProps props): base(props)
        {
        }
    }
}
using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(ImplementsInterfaceWithInternalSubclass), fullyQualifiedName: "jsii-calc.ImplementsInterfaceWithInternalSubclass")]
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

using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(ImplementsInterfaceWithInternal), fullyQualifiedName: "jsii-calc.ImplementsInterfaceWithInternal")]
    public class ImplementsInterfaceWithInternal : DeputyBase, IIInterfaceWithInternal
    {
        public ImplementsInterfaceWithInternal(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ImplementsInterfaceWithInternal(ByRefValue reference): base(reference)
        {
        }

        protected ImplementsInterfaceWithInternal(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "visible", isOverride: true)]
        public virtual void Visible()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}

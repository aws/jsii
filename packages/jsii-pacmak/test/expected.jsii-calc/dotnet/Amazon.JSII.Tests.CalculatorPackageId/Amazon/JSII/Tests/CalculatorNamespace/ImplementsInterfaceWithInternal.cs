using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ImplementsInterfaceWithInternal), fullyQualifiedName: "jsii-calc.ImplementsInterfaceWithInternal")]
    public class ImplementsInterfaceWithInternal : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithInternal
    {
        /// <summary></summary>
        public ImplementsInterfaceWithInternal(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected ImplementsInterfaceWithInternal(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected ImplementsInterfaceWithInternal(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "visible", isOverride: true)]
        public virtual void Visible()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ImplementsInterfaceWithInternalSubclass), fullyQualifiedName: "jsii-calc.ImplementsInterfaceWithInternalSubclass")]
    public class ImplementsInterfaceWithInternalSubclass : Amazon.JSII.Tests.CalculatorNamespace.ImplementsInterfaceWithInternal
    {
        public ImplementsInterfaceWithInternalSubclass(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ImplementsInterfaceWithInternalSubclass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ImplementsInterfaceWithInternalSubclass(DeputyProps props): base(props)
        {
        }
    }
}

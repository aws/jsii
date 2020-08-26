using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
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

using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.AnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.compliance.AnonymousImplementationProvider")]
    public class AnonymousImplementationProvider : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnonymousImplementationProvider
    {
        public AnonymousImplementationProvider(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AnonymousImplementationProvider(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AnonymousImplementationProvider(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.Implementation\"}}", isOverride: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.Implementation ProvideAsClass()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.Implementation>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.IAnonymouslyImplementMe\"}}", isOverride: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnonymouslyImplementMe ProvideAsInterface()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnonymouslyImplementMe>(new System.Type[]{}, new object[]{});
        }
    }
}

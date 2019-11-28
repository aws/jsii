using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.AnonymousImplementationProvider")]
    public class AnonymousImplementationProvider : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IAnonymousImplementationProvider
    {
        public AnonymousImplementationProvider(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AnonymousImplementationProvider(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AnonymousImplementationProvider(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.Implementation\"}}", isOverride: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Implementation ProvideAsClass()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Implementation>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IAnonymouslyImplementMe\"}}", isOverride: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe ProvideAsInterface()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe>(new System.Type[]{}, new object[]{});
        }
    }
}

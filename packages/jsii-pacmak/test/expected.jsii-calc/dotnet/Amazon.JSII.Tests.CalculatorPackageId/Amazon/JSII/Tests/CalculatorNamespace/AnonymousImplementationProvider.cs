using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.AnonymousImplementationProvider")]
    public class AnonymousImplementationProvider : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IAnonymousImplementationProvider
    {
        /// <summary></summary>
        public AnonymousImplementationProvider(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected AnonymousImplementationProvider(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected AnonymousImplementationProvider(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.Implementation\"}}", isOverride: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Implementation ProvideAsClass()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Implementation>(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IAnonymouslyImplementMe\"}}", isOverride: true)]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe ProvideAsInterface()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe>(new System.Type[]{}, new object[]{});
        }
    }
}

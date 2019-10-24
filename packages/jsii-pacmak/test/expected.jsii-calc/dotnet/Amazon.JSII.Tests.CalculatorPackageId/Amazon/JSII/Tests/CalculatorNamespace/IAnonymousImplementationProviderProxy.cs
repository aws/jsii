using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can return an anonymous interface implementation from an override without losing the interface declarations.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IAnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.IAnonymousImplementationProvider")]
    internal sealed class IAnonymousImplementationProviderProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IAnonymousImplementationProvider
    {
        private IAnonymousImplementationProviderProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "provide", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IAnonymouslyImplementMe\"}}")]
        public Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe Provide()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe>(new System.Type[]{}, new object[]{});
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>We can return an anonymous interface implementation from an override without losing the interface declarations.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IAnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.compliance.IAnonymousImplementationProvider")]
    internal sealed class IAnonymousImplementationProviderProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnonymousImplementationProvider
    {
        private IAnonymousImplementationProviderProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.Implementation\"}}")]
        public Amazon.JSII.Tests.CalculatorNamespace.Compliance.Implementation ProvideAsClass()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.Implementation>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.IAnonymouslyImplementMe\"}}")]
        public Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnonymouslyImplementMe ProvideAsInterface()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnonymouslyImplementMe>(new System.Type[]{}, new object[]{});
        }
    }
}

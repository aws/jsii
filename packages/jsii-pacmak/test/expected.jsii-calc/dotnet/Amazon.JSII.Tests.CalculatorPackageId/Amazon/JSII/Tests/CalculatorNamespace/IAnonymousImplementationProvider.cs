using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can return an anonymous interface implementation from an override without losing the interface declarations.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IAnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.IAnonymousImplementationProvider")]
    public interface IAnonymousImplementationProvider
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "provide", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IAnonymouslyImplementMe\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe Provide();
    }
}

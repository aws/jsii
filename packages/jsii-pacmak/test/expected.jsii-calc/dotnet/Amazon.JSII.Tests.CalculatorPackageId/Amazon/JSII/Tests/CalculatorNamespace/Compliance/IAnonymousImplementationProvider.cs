using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>We can return an anonymous interface implementation from an override without losing the interface declarations.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IAnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.compliance.IAnonymousImplementationProvider")]
    public interface IAnonymousImplementationProvider
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.Implementation\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.Compliance.Implementation ProvideAsClass();
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.IAnonymouslyImplementMe\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.Compliance.IAnonymouslyImplementMe ProvideAsInterface();
    }
}

using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can return an anonymous interface implementation from an override without losing the interface declarations. (experimental)</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IAnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.IAnonymousImplementationProvider")]
    public interface IAnonymousImplementationProvider
    {
        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.Implementation\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.Implementation ProvideAsClass();
        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "provideAsInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IAnonymouslyImplementMe\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe ProvideAsInterface();
    }
}

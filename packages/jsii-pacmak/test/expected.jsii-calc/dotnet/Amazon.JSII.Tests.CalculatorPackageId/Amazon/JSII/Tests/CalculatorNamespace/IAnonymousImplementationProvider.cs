using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>We can return an anonymous interface implementation from an override without losing the interface declarations.</summary>
    [JsiiInterface(nativeType: typeof(IAnonymousImplementationProvider), fullyQualifiedName: "jsii-calc.IAnonymousImplementationProvider")]
    public interface IAnonymousImplementationProvider
    {
        [JsiiMethod(name: "provideAsClass", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.Implementation\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.Implementation ProvideAsClass();
        [JsiiMethod(name: "provideAsInterface", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.IAnonymouslyImplementMe\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.IAnonymouslyImplementMe ProvideAsInterface();
    }
}

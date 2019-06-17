using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIPublicInterface2), fullyQualifiedName: "jsii-calc.IPublicInterface2")]
    public interface IIPublicInterface2
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Ciao();
    }
}

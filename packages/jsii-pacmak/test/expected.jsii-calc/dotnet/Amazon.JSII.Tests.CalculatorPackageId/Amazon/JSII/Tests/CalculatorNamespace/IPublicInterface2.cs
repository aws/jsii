using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IPublicInterface2), fullyQualifiedName: "jsii-calc.IPublicInterface2")]
    public interface IPublicInterface2
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "ciao", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Ciao();
    }
}

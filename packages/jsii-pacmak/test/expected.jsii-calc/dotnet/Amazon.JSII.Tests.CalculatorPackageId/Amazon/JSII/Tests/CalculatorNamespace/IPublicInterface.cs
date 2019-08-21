using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IPublicInterface), fullyQualifiedName: "jsii-calc.IPublicInterface")]
    public interface IPublicInterface
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "bye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Bye();
    }
}

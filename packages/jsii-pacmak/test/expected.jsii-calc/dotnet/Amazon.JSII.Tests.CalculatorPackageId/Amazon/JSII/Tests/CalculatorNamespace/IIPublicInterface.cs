using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIPublicInterface), fullyQualifiedName: "jsii-calc.IPublicInterface")]
    public interface IIPublicInterface
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "bye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Bye();
    }
}

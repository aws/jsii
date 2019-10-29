using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IAnonymouslyImplementMe), fullyQualifiedName: "jsii-calc.IAnonymouslyImplementMe")]
    public interface IAnonymouslyImplementMe
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"number\"}")]
        double Value
        {
            get;
        }
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "verb", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Verb();
    }
}

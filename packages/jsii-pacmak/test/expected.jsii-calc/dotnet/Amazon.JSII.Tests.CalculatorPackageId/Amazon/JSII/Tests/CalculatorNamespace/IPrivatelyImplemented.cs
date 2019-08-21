using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IPrivatelyImplemented), fullyQualifiedName: "jsii-calc.IPrivatelyImplemented")]
    public interface IPrivatelyImplemented
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Success
        {
            get;
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IIPrivatelyImplemented), fullyQualifiedName: "jsii-calc.IPrivatelyImplemented")]
    public interface IIPrivatelyImplemented
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Success
        {
            get;
        }
    }
}

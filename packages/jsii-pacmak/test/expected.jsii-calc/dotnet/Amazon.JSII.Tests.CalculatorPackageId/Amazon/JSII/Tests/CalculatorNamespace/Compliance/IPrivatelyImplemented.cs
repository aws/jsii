using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IPrivatelyImplemented), fullyQualifiedName: "jsii-calc.compliance.IPrivatelyImplemented")]
    public interface IPrivatelyImplemented
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "success", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Success
        {
            get;
        }
    }
}

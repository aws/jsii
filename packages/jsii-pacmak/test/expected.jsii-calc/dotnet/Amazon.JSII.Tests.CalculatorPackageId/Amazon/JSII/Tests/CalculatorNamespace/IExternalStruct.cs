using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>External</strong>: true
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IExternalStruct), fullyQualifiedName: "jsii-calc.ExternalStruct")]
    public interface IExternalStruct
    {
        /// <remarks>
        /// <strong>External</strong>: true
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        string ReadonlyProperty
        {
            get;
        }
    }
}

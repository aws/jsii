using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IInterfaceWithProperties), fullyQualifiedName: "jsii-calc.compliance.IInterfaceWithProperties")]
    public interface IInterfaceWithProperties
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "readOnlyString", typeJson: "{\"primitive\":\"string\"}")]
        string ReadOnlyString
        {
            get;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "readWriteString", typeJson: "{\"primitive\":\"string\"}")]
        string ReadWriteString
        {
            get;
            set;
        }
    }
}

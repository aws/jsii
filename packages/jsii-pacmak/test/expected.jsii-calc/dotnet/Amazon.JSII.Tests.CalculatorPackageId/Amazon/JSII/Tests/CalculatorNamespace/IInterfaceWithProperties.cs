using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IInterfaceWithProperties), fullyQualifiedName: "jsii-calc.IInterfaceWithProperties")]
    public interface IInterfaceWithProperties
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "readOnlyString", typeJson: "{\"primitive\":\"string\"}")]
        string ReadOnlyString
        {
            get;
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "readWriteString", typeJson: "{\"primitive\":\"string\"}")]
        string ReadWriteString
        {
            get;
            set;
        }
    }
}

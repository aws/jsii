using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: stable
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStableStruct), fullyQualifiedName: "jsii-calc.StableStruct")]
    public interface IStableStruct
    {
        /// <remarks>
        /// stability: stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        string ReadonlyProperty
        {
            get;
        }
    }
}

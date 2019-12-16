using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Stable
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStableStruct), fullyQualifiedName: "jsii-calc.StableStruct")]
    public interface IStableStruct
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Stable
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        string ReadonlyProperty
        {
            get;
        }
    }
}

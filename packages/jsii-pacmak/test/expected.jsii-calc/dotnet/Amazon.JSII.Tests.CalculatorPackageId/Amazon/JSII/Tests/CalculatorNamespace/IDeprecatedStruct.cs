using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDeprecatedStruct), fullyQualifiedName: "jsii-calc.DeprecatedStruct")]
    [System.Obsolete("it just wraps a string")]
    public interface IDeprecatedStruct
    {
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("well, yeah")]
        string ReadonlyProperty
        {
            get;
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// deprecated: it just wraps a string
    /// stability: deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDeprecatedStruct), fullyQualifiedName: "jsii-calc.DeprecatedStruct")]
    [System.Obsolete()]
    public interface IDeprecatedStruct
    {
        /// <remarks>
        /// deprecated: well, yeah
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete()]
        string ReadonlyProperty
        {
            get;
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDeprecatedStruct), fullyQualifiedName: "jsii-calc.DeprecatedStruct")]
    [System.Obsolete("it just wraps a string")]
    public interface IDeprecatedStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("well, yeah")]
        string ReadonlyProperty
        {
            get;
        }
    }
}

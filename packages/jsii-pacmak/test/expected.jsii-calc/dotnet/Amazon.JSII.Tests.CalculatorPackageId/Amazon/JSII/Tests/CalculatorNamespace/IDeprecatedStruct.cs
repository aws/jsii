using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Deprecated</remarks>
    [JsiiInterface(nativeType: typeof(IDeprecatedStruct), fullyQualifiedName: "jsii-calc.DeprecatedStruct")]
    [System.Obsolete("for the show")]
    public interface IDeprecatedStruct
    {
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete("for the show")]
        string ReadonlyProperty
        {
            get;
        }
    }
}
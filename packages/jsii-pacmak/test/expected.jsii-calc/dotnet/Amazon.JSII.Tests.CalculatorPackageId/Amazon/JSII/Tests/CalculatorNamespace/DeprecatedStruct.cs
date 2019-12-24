using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.DeprecatedStruct")]
    public class DeprecatedStruct : Amazon.JSII.Tests.CalculatorNamespace.IDeprecatedStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        [System.Obsolete("well, yeah")]
        public string ReadonlyProperty
        {
            get;
            set;
        }
    }
}

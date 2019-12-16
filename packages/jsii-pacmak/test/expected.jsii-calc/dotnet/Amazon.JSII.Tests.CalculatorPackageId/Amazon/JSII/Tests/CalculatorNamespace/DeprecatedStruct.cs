using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.DeprecatedStruct")]
    public class DeprecatedStruct : Amazon.JSII.Tests.CalculatorNamespace.IDeprecatedStruct
    {
        /// <summary></summary>
        /// <remarks>
        /// stability: Deprecated
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

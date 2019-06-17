using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// deprecated: it just wraps a string
    /// stability: deprecated
    /// </remarks>
    [JsiiByValue]
    public class DeprecatedStruct : IDeprecatedStruct
    {
        /// <remarks>
        /// deprecated: well, yeah
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        [System.Obsolete()]
        public string ReadonlyProperty
        {
            get;
            set;
        }
    }
}

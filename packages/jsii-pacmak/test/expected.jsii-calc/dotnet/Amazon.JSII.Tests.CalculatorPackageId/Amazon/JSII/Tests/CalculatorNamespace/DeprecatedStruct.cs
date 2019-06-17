using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: deprecated
    /// </remarks>
    [JsiiByValue]
    public class DeprecatedStruct : IDeprecatedStruct
    {
        /// <remarks>
        /// stability: deprecated
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

using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Deprecated</remarks>
    [JsiiByValue]
    public class DeprecatedStruct : IDeprecatedStruct
    {
        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        [System.Obsolete("well, yeah")]
        public string ReadonlyProperty
        {
            get;
            set;
        }
    }
}
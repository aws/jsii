using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

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

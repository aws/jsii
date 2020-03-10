using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.OptionalStruct")]
    public class OptionalStruct : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IOptionalStruct
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "field", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Field
        {
            get;
            set;
        }
    }
}

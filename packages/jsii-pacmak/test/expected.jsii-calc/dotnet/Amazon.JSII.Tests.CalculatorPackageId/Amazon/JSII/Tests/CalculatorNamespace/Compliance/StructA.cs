using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    #pragma warning disable CS8618

    /// <summary>We can serialize and deserialize structs without silently ignoring optional fields.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.compliance.StructA")]
    public class StructA : Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructA
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "requiredString", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string RequiredString
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalNumber", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        public double? OptionalNumber
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalString", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? OptionalString
        {
            get;
            set;
        }
    }
}

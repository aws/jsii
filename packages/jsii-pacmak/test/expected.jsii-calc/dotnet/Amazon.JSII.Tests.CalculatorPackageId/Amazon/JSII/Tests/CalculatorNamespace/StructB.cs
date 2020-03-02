using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    /// <summary>This intentionally overlaps with StructA (where only requiredString is provided) to test htat the kernel properly disambiguates those.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.StructB")]
    public class StructB : Amazon.JSII.Tests.CalculatorNamespace.IStructB
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
        [JsiiProperty(name: "optionalBoolean", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true, isOverride: true)]
        public bool? OptionalBoolean
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalStructA", typeJson: "{\"fqn\":\"jsii-calc.StructA\"}", isOptional: true, isOverride: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.IStructA? OptionalStructA
        {
            get;
            set;
        }
    }
}

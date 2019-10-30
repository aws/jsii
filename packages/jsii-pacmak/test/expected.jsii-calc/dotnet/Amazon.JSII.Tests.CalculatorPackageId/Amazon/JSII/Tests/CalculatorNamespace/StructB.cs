using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This intentionally overlaps with StructA (where only requiredString is provided) to test htat the kernel properly disambiguates those.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.StructB")]
    public class StructB : Amazon.JSII.Tests.CalculatorNamespace.IStructB
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "requiredString", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string RequiredString
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalBoolean", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true, isOverride: true)]
        public bool? OptionalBoolean
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "optionalStructA", typeJson: "{\"fqn\":\"jsii-calc.StructA\"}", isOptional: true, isOverride: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.IStructA OptionalStructA
        {
            get;
            set;
        }
    }
}

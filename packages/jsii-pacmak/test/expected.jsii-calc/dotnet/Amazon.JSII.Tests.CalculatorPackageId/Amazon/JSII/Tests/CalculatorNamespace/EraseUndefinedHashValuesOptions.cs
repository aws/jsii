using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.EraseUndefinedHashValuesOptions")]
    public class EraseUndefinedHashValuesOptions : Amazon.JSII.Tests.CalculatorNamespace.IEraseUndefinedHashValuesOptions
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "option1", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Option1
        {
            get;
            set;
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "option2", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Option2
        {
            get;
            set;
        }
    }
}

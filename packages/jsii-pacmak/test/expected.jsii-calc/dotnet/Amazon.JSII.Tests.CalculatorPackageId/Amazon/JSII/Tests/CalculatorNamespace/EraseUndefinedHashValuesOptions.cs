using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue]
    public class EraseUndefinedHashValuesOptions : Amazon.JSII.Tests.CalculatorNamespace.IEraseUndefinedHashValuesOptions
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "option1", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        [JsiiOptional]
        public string Option1
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "option2", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        [JsiiOptional]
        public string Option2
        {
            get;
            set;
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiByValue]
    public class EraseUndefinedHashValuesOptions : IEraseUndefinedHashValuesOptions
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "option1", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Option1
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "option2", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Option2
        {
            get;
            set;
        }
    }
}

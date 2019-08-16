using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue]
    public class CalculatorProps : Amazon.JSII.Tests.CalculatorNamespace.ICalculatorProps
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "initialValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        [JsiiOptional]
        public double? InitialValue
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "maximumValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        [JsiiOptional]
        public double? MaximumValue
        {
            get;
            set;
        }
    }
}

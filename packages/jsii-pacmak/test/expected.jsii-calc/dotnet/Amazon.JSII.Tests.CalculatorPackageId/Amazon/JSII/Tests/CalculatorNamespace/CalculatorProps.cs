using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiByValue]
    public class CalculatorProps : ICalculatorProps
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "initialValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        public double? InitialValue
        {
            get;
            set;
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "maximumValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        public double? MaximumValue
        {
            get;
            set;
        }
    }
}

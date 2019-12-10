using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.CalculatorProps")]
    public class CalculatorProps : Amazon.JSII.Tests.CalculatorNamespace.ICalculatorProps
    {
        /// <summary>The initial value of the calculator.</summary>
        /// <remarks>
        /// NOTE: Any number works here, it's fine.
        /// default:
        /// 0
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "initialValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        public double? InitialValue
        {
            get;
            set;
        }

        /// <summary>The maximum value the calculator can store.</summary>
        /// <remarks>
        /// default:
        /// none
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "maximumValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true, isOverride: true)]
        public double? MaximumValue
        {
            get;
            set;
        }
    }
}

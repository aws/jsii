using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiByValue(fqn: "jsii-calc.CalculatorProps")]
    public class CalculatorProps : Amazon.JSII.Tests.CalculatorNamespace.ICalculatorProps
    {
        /// <summary>The initial value of the calculator.</summary>
        /// <remarks>
        /// NOTE: Any number works here, it's fine.
        /// 
        /// <strong>Default</strong>: 0
        /// 
        /// <strong>Stability</strong>: Experimental
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
        /// <strong>Default</strong>: none
        /// 
        /// <strong>Stability</strong>: Experimental
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

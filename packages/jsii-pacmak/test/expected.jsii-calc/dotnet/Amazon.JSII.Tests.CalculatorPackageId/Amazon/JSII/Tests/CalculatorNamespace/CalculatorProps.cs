using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    [JsiiByValue(fqn: "jsii-calc.CalculatorProps")]
    public class CalculatorProps : Amazon.JSII.Tests.CalculatorNamespace.ICalculatorProps
    {
        /// <summary>The initial value of the calculator.</summary>
        /// <remarks>
        /// NOTE: Any number works here, it's fine.
        /// 
        /// <strong>Default</strong>: 0
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

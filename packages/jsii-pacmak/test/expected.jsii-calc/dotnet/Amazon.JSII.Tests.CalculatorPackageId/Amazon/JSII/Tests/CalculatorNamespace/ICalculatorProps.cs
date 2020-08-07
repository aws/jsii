using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator. (experimental)</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(ICalculatorProps), fullyQualifiedName: "jsii-calc.CalculatorProps")]
    public interface ICalculatorProps
    {
        /// <summary>The initial value of the calculator. (experimental)</summary>
        /// <remarks>
        /// NOTE: Any number works here, it's fine.
        /// 
        /// <strong>Default</strong>: 0
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "initialValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        double? InitialValue
        {
            get
            {
                return null;
            }
        }

        /// <summary>The maximum value the calculator can store. (experimental)</summary>
        /// <remarks>
        /// <strong>Default</strong>: none
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "maximumValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        double? MaximumValue
        {
            get
            {
                return null;
            }
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(ICalculatorProps), fullyQualifiedName: "jsii-calc.CalculatorProps")]
    public interface ICalculatorProps
    {
        /// <summary>The initial value of the calculator.</summary>
        /// <remarks>
        /// NOTE: Any number works here, it's fine.
        /// 
        /// default:
        /// 0
        /// 
        /// stability: Experimental
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

        /// <summary>The maximum value the calculator can store.</summary>
        /// <remarks>
        /// default:
        /// none
        /// 
        /// stability: Experimental
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

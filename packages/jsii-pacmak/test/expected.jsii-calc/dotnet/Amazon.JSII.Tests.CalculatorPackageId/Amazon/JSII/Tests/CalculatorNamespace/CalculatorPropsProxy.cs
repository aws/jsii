using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(ICalculatorProps), fullyQualifiedName: "jsii-calc.CalculatorProps")]
    internal sealed class CalculatorPropsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.ICalculatorProps
    {
        private CalculatorPropsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The initial value of the calculator.</summary>
        /// <remarks>
        /// NOTE: Any number works here, it's fine.
        /// 
        /// default:
        /// 0
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "initialValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? InitialValue
        {
            get => GetInstanceProperty<double?>();
        }

        /// <summary>The maximum value the calculator can store.</summary>
        /// <remarks>
        /// default:
        /// none
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "maximumValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? MaximumValue
        {
            get => GetInstanceProperty<double?>();
        }
    }
}

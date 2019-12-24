using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(ICalculatorProps), fullyQualifiedName: "jsii-calc.CalculatorProps")]
    internal sealed class CalculatorPropsProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.ICalculatorProps
    {
        private CalculatorPropsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The initial value of the calculator.</summary>
        /// <remarks>
<<<<<<< HEAD
        /// <strong>Stability</strong>: Experimental
=======
        /// NOTE: Any number works here, it's fine.
        /// 
        /// default:
        /// 0
        /// 
        /// stability: Experimental
>>>>>>> origin/master
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "initialValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? InitialValue
        {
            get => GetInstanceProperty<double?>();
        }

        /// <summary>The maximum value the calculator can store.</summary>
        /// <remarks>
<<<<<<< HEAD
        /// <strong>Stability</strong>: Experimental
=======
        /// default:
        /// none
        /// 
        /// stability: Experimental
>>>>>>> origin/master
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "maximumValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? MaximumValue
        {
            get => GetInstanceProperty<double?>();
        }
    }
}

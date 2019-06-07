using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    [JsiiTypeProxy(nativeType: typeof(ICalculatorProps), fullyQualifiedName: "jsii-calc.CalculatorProps")]
    internal sealed class CalculatorPropsProxy : DeputyBase, ICalculatorProps
    {
        private CalculatorPropsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty(name: "initialValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? InitialValue
        {
            get => GetInstanceProperty<double?>();
        }

        [JsiiProperty(name: "maximumValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? MaximumValue
        {
            get => GetInstanceProperty<double?>();
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>Properties for Calculator.</summary>
    [JsiiInterfaceProxy(typeof(ICalculatorProps), "jsii-calc.CalculatorProps")]
    internal class CalculatorPropsProxy : DeputyBase, ICalculatorProps
    {
        private CalculatorPropsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("initialValue", "{\"primitive\":\"number\",\"optional\":true}")]
        public virtual double? InitialValue
        {
            get => GetInstanceProperty<double? >();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("maximumValue", "{\"primitive\":\"number\",\"optional\":true}")]
        public virtual double? MaximumValue
        {
            get => GetInstanceProperty<double? >();
            set => SetInstanceProperty(value);
        }
    }
}
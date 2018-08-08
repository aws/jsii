using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>Properties for Calculator.</summary>
    public class CalculatorProps : DeputyBase, ICalculatorProps
    {
        [JsiiProperty("initialValue", "{\"primitive\":\"number\",\"optional\":true}", true)]
        public double? InitialValue
        {
            get;
            set;
        }

        [JsiiProperty("maximumValue", "{\"primitive\":\"number\",\"optional\":true}", true)]
        public double? MaximumValue
        {
            get;
            set;
        }
    }
}
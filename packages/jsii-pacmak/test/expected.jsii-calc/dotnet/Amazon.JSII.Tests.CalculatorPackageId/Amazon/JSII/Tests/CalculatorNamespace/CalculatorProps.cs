using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    [JsiiByValue]
    public class CalculatorProps : ICalculatorProps
    {
        [JsiiProperty("initialValue", "{\"type\":{\"primitive\":\"number\"},\"optional\":true}", true)]
        public double? InitialValue
        {
            get;
            set;
        }

        [JsiiProperty("maximumValue", "{\"type\":{\"primitive\":\"number\"},\"optional\":true}", true)]
        public double? MaximumValue
        {
            get;
            set;
        }
    }
}
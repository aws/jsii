using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: Properties for Calculator.</remarks>
    [JsiiByValue]
    public class CalculatorProps : ICalculatorProps
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
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    [JsiiInterface(typeof(ICalculatorProps), "jsii-calc.CalculatorProps")]
    public interface ICalculatorProps
    {
        [JsiiProperty("initialValue", "{\"type\":{\"primitive\":\"number\"},\"optional\":true}")]
        double? InitialValue
        {
            get;
        }

        [JsiiProperty("maximumValue", "{\"type\":{\"primitive\":\"number\"},\"optional\":true}")]
        double? MaximumValue
        {
            get;
        }
    }
}
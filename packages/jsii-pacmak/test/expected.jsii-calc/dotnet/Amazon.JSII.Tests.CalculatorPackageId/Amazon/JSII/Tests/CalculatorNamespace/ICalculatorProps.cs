using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Properties for Calculator.</summary>
    [JsiiInterface(typeof(ICalculatorProps), "jsii-calc.CalculatorProps")]
    public interface ICalculatorProps
    {
        [JsiiProperty("initialValue", "{\"primitive\":\"number\",\"nullable\":true}")]
        double? InitialValue
        {
            get;
        }

        [JsiiProperty("maximumValue", "{\"primitive\":\"number\",\"nullable\":true}")]
        double? MaximumValue
        {
            get;
        }
    }
}
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>Properties for Calculator.</summary>
    [JsiiInterface(typeof(ICalculatorProps), "jsii-calc.CalculatorProps")]
    public interface ICalculatorProps
    {
        [JsiiProperty("initialValue", "{\"primitive\":\"number\",\"optional\":true}")]
        double? InitialValue
        {
            get;
            set;
        }

        [JsiiProperty("maximumValue", "{\"primitive\":\"number\",\"optional\":true}")]
        double? MaximumValue
        {
            get;
            set;
        }
    }
}
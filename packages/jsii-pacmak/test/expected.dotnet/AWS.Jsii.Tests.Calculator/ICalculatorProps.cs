using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>Properties for Calculator.</summary>
    [JsiiInterface("jsii-calc", "jsii$jsii_calc$.CalculatorProps")]
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
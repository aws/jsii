using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: Properties for Calculator.</remarks>
    [JsiiInterface(typeof(ICalculatorProps), "jsii-calc.CalculatorProps")]
    public interface ICalculatorProps
    {
        [JsiiProperty("initialValue", "{\"primitive\":\"number\",\"optional\":true}")]
        double? InitialValue
        {
            get;
        }

        [JsiiProperty("maximumValue", "{\"primitive\":\"number\",\"optional\":true}")]
        double? MaximumValue
        {
            get;
        }
    }
}
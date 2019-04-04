using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IEraseUndefinedHashValuesOptions), "jsii-calc.EraseUndefinedHashValuesOptions")]
    public interface IEraseUndefinedHashValuesOptions
    {
        [JsiiProperty("option1", "{\"primitive\":\"string\",\"nullable\":true}")]
        string Option1
        {
            get;
        }

        [JsiiProperty("option2", "{\"primitive\":\"string\",\"nullable\":true}")]
        string Option2
        {
            get;
        }
    }
}
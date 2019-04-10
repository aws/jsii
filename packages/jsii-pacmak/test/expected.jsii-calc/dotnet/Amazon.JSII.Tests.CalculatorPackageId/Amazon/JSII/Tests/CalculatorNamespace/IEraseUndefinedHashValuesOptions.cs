using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IEraseUndefinedHashValuesOptions), "jsii-calc.EraseUndefinedHashValuesOptions")]
    public interface IEraseUndefinedHashValuesOptions
    {
        [JsiiProperty(name: "option1", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Option1
        {
            get;
        }

        [JsiiProperty(name: "option2", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        string Option2
        {
            get;
        }
    }
}
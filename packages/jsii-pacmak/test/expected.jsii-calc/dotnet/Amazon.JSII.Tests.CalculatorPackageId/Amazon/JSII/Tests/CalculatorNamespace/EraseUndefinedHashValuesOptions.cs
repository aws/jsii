using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class EraseUndefinedHashValuesOptions : IEraseUndefinedHashValuesOptions
    {
        [JsiiProperty(name: "option1", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Option1
        {
            get;
            set;
        }

        [JsiiProperty(name: "option2", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string Option2
        {
            get;
            set;
        }
    }
}

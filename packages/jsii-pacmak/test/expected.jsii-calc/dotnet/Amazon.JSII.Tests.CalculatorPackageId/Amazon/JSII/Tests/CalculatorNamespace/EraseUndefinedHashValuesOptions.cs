using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue(fqn: "jsii-calc.EraseUndefinedHashValuesOptions")]
    public class EraseUndefinedHashValuesOptions : Amazon.JSII.Tests.CalculatorNamespace.IEraseUndefinedHashValuesOptions
    {
        [JsiiOptional]
        [JsiiProperty(name: "option1", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Option1
        {
            get;
            set;
        }

        [JsiiOptional]
        [JsiiProperty(name: "option2", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Option2
        {
            get;
            set;
        }
    }
}

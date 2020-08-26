using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue(fqn: "jsii-calc.OptionalStruct")]
    public class OptionalStruct : Amazon.JSII.Tests.CalculatorNamespace.IOptionalStruct
    {
        [JsiiOptional]
        [JsiiProperty(name: "field", typeJson: "{\"primitive\":\"string\"}", isOptional: true, isOverride: true)]
        public string? Field
        {
            get;
            set;
        }
    }
}

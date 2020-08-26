using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue(fqn: "jsii-calc.ConfusingToJacksonStruct")]
    public class ConfusingToJacksonStruct : Amazon.JSII.Tests.CalculatorNamespace.IConfusingToJacksonStruct
    {
        [JsiiOptional]
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"collection\":{\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"@scope/jsii-calc-lib.IFriendly\"},{\"fqn\":\"jsii-calc.AbstractClass\"}]}},\"kind\":\"array\"}}]}}", isOptional: true, isOverride: true)]
        public object? UnionProperty
        {
            get;
            set;
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    #pragma warning disable CS8618

    [JsiiByValue(fqn: "jsii-calc.UnionProperties")]
    public class UnionProperties : Amazon.JSII.Tests.CalculatorNamespace.IUnionProperties
    {
        [JsiiProperty(name: "bar", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.AllTypes\"}]}}", isOverride: true)]
        public object Bar
        {
            get;
            set;
        }

        [JsiiOptional]
        [JsiiProperty(name: "foo", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]}}", isOptional: true, isOverride: true)]
        public object? Foo
        {
            get;
            set;
        }
    }
}

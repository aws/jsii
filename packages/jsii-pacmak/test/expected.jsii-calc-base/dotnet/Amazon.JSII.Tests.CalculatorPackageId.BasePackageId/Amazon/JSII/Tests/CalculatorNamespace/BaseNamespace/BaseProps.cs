using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiByValue]
    public class BaseProps : IBaseProps
    {
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Bar
        {
            get;
            set;
        }

        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}", isOverride: true)]
        public Very Foo
        {
            get;
            set;
        }
    }
}
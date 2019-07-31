using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiByValue]
    public class BaseProps : Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.IBaseProps
    {
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        public string Bar
        {
            get;
            set;
        }

        [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}", isOverride: true)]
        public Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.Very Foo
        {
            get;
            set;
        }
    }
}

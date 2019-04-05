using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiByValue]
    public class BaseProps : IBaseProps
    {
        [JsiiProperty("bar", "{\"type\":{\"primitive\":\"string\"}}", true)]
        public string Bar
        {
            get;
            set;
        }

        [JsiiProperty("foo", "{\"type\":{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}}", true)]
        public Very Foo
        {
            get;
            set;
        }
    }
}
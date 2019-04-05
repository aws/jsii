using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class UnionProperties : IUnionProperties
    {
        [JsiiProperty("bar", "{\"type\":{\"union\":{\"types\":[{\"type\":{\"primitive\":\"string\"}},{\"type\":{\"primitive\":\"number\"}},{\"type\":{\"fqn\":\"jsii-calc.AllTypes\"}}]}}}", true)]
        public object Bar
        {
            get;
            set;
        }

        [JsiiProperty("foo", "{\"type\":{\"union\":{\"types\":[{\"type\":{\"primitive\":\"string\"}},{\"type\":{\"primitive\":\"number\"}}]}},\"optional\":true}", true)]
        public object Foo
        {
            get;
            set;
        }
    }
}
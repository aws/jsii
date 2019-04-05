using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IUnionProperties), "jsii-calc.UnionProperties")]
    public interface IUnionProperties
    {
        [JsiiProperty("bar", "{\"type\":{\"union\":{\"types\":[{\"type\":{\"primitive\":\"string\"}},{\"type\":{\"primitive\":\"number\"}},{\"type\":{\"fqn\":\"jsii-calc.AllTypes\"}}]}}}")]
        object Bar
        {
            get;
        }

        [JsiiProperty("foo", "{\"type\":{\"union\":{\"types\":[{\"type\":{\"primitive\":\"string\"}},{\"type\":{\"primitive\":\"number\"}}]}},\"optional\":true}")]
        object Foo
        {
            get;
        }
    }
}
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterface(typeof(IUnionProperties), "jsii-calc.UnionProperties")]
    public interface IUnionProperties
    {
        [JsiiProperty("foo", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]},\"optional\":true}")]
        object Foo
        {
            get;
            set;
        }

        [JsiiProperty("bar", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.AllTypes\"}]}}")]
        object Bar
        {
            get;
        }
    }
}
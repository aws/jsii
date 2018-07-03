using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiInterface("jsii-calc", "jsii$jsii_calc$.UnionProperties")]
    public interface IUnionProperties
    {
        [JsiiProperty("foo", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]},\"optional\":true}")]
        object Foo
        {
            get;
            set;
        }

        [JsiiProperty("bar", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii$jsii_calc$.AllTypes\"}]}}")]
        object Bar
        {
            get;
        }
    }
}
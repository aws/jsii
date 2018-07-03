using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    public class UnionProperties : DeputyBase, IUnionProperties
    {
        [JsiiProperty("foo", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]},\"optional\":true}", true)]
        public object Foo
        {
            get;
            set;
        }

        [JsiiProperty("bar", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii$jsii_calc$.AllTypes\"}]}}", true)]
        public object Bar
        {
            get;
        }
    }
}
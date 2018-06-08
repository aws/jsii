using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiInterfaceProxy("jsii-calc", "jsii$jsii_calc$.UnionProperties")]
    internal class UnionPropertiesProxy : DeputyBase, IUnionProperties
    {
        private UnionPropertiesProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("foo", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]},\"optional\":true}")]
        public virtual object Foo
        {
            get => GetProperty<object>();
            set => SetProperty(value);
        }

        [JsiiProperty("bar", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii$jsii_calc$.AllTypes\"}]}}")]
        public virtual object Bar
        {
            get => GetProperty<object>();
        }
    }
}
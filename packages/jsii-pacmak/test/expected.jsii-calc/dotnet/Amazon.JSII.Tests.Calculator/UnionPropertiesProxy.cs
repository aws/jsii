using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterfaceProxy(typeof(IUnionProperties), "jsii-calc.UnionProperties")]
    internal class UnionPropertiesProxy : DeputyBase, IUnionProperties
    {
        private UnionPropertiesProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("foo", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]},\"optional\":true}")]
        public virtual object Foo
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("bar", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.AllTypes\"}]}}")]
        public virtual object Bar
        {
            get => GetInstanceProperty<object>();
        }
    }
}
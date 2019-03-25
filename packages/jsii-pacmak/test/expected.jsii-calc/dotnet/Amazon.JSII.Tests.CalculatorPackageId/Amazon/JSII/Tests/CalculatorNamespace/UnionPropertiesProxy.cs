using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IUnionProperties), "jsii-calc.UnionProperties")]
    internal sealed class UnionPropertiesProxy : DeputyBase, IUnionProperties
    {
        private UnionPropertiesProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("bar", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.AllTypes\"}]}}")]
        public object Bar
        {
            get => GetInstanceProperty<object>();
        }

        [JsiiProperty("foo", "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]},\"optional\":true}")]
        public object Foo
        {
            get => GetInstanceProperty<object>();
        }
    }
}
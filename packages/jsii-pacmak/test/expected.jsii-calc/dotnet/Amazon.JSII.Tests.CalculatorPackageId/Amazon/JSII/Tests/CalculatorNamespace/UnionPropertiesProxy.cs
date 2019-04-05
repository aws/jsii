using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IUnionProperties), "jsii-calc.UnionProperties")]
    internal sealed class UnionPropertiesProxy : DeputyBase, IUnionProperties
    {
        private UnionPropertiesProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("bar", "{\"type\":{\"union\":{\"types\":[{\"type\":{\"primitive\":\"string\"}},{\"type\":{\"primitive\":\"number\"}},{\"type\":{\"fqn\":\"jsii-calc.AllTypes\"}}]}}}")]
        public object Bar
        {
            get => GetInstanceProperty<object>();
        }

        [JsiiProperty("foo", "{\"type\":{\"union\":{\"types\":[{\"type\":{\"primitive\":\"string\"}},{\"type\":{\"primitive\":\"number\"}}]}},\"optional\":true}")]
        public object Foo
        {
            get => GetInstanceProperty<object>();
        }
    }
}
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiTypeProxy(nativeType: typeof(IUnionProperties), fullyQualifiedName: "jsii-calc.UnionProperties")]
    internal sealed class UnionPropertiesProxy : DeputyBase, IUnionProperties
    {
        private UnionPropertiesProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.AllTypes\"}]}}")]
        public object Bar
        {
            get => GetInstanceProperty<object>();
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]}}", isOptional: true)]
        public object Foo
        {
            get => GetInstanceProperty<object>();
        }
    }
}
using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IUnionProperties), fullyQualifiedName: "jsii-calc.compliance.UnionProperties")]
    internal sealed class UnionPropertiesProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IUnionProperties
    {
        private UnionPropertiesProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"},{\"fqn\":\"jsii-calc.compliance.AllTypes\"}]}}")]
        public object Bar
        {
            get => GetInstanceProperty<object>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "foo", typeJson: "{\"union\":{\"types\":[{\"primitive\":\"string\"},{\"primitive\":\"number\"}]}}", isOptional: true)]
        public object? Foo
        {
            get => GetInstanceProperty<object?>();
        }
    }
}

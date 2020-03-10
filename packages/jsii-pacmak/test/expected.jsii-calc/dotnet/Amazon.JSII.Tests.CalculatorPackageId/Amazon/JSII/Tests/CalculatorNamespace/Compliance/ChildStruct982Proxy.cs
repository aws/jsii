using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IChildStruct982), fullyQualifiedName: "jsii-calc.compliance.ChildStruct982")]
    internal sealed class ChildStruct982Proxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IChildStruct982
    {
        private ChildStruct982Proxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"number\"}")]
        public double Bar
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"string\"}")]
        public string Foo
        {
            get => GetInstanceProperty<string>();
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IChildStruct982), fullyQualifiedName: "jsii-calc.ChildStruct982")]
    internal sealed class ChildStruct982Proxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IChildStruct982
    {
        private ChildStruct982Proxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "bar", typeJson: "{\"primitive\":\"number\"}")]
        public double Bar
        {
            get => GetInstanceProperty<double>();
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"string\"}")]
        public string Foo
        {
            get => GetInstanceProperty<string>();
        }
    }
}

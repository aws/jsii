using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IHello), fullyQualifiedName: "jsii-calc.InterfaceInNamespaceOnlyInterface.Hello")]
    internal sealed class HelloProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface.IHello
    {
        private HelloProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        public double Foo
        {
            get => GetInstanceProperty<double>();
        }
    }
}

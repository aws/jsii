using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.InterfaceInNamespaceOnlyInterface
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IHello), fullyQualifiedName: "jsii-calc.InterfaceInNamespaceOnlyInterface.Hello")]
    internal sealed class HelloProxy : DeputyBase, IHello
    {
        private HelloProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        public double Foo
        {
            get => GetInstanceProperty<double>();
        }
    }
}

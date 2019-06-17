using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: stable
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IIStableInterface), fullyQualifiedName: "jsii-calc.IStableInterface")]
    internal sealed class IStableInterfaceProxy : DeputyBase, IIStableInterface
    {
        private IStableInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: stable
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// stability: stable
        /// </remarks>
        [JsiiMethod(name: "method")]
        public void Method()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}

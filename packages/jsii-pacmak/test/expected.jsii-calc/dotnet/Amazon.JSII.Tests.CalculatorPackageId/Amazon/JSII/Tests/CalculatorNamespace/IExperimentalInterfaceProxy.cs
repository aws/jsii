using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IIExperimentalInterface), fullyQualifiedName: "jsii-calc.IExperimentalInterface")]
    internal sealed class IExperimentalInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IIExperimentalInterface
    {
        private IExperimentalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "method")]
        public void Method()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}

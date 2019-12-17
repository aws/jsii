using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IExperimentalInterface), fullyQualifiedName: "jsii-calc.IExperimentalInterface")]
    internal sealed class IExperimentalInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IExperimentalInterface
    {
        private IExperimentalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
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

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "method")]
        public void Method()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

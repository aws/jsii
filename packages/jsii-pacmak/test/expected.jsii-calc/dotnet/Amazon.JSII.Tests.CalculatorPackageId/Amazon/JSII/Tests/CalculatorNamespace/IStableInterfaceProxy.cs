using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Stable
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStableInterface), fullyQualifiedName: "jsii-calc.IStableInterface")]
    internal sealed class IStableInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IStableInterface
    {
        private IStableInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Stable
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
        /// stability: Stable
        /// </remarks>
        [JsiiMethod(name: "method")]
        public void Method()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

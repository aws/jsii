using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations
{
    /// <remarks>
    /// <strong>Stability</strong>: Stable
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStableInterface), fullyQualifiedName: "jsii-calc.stability_annotations.IStableInterface")]
    internal sealed class IStableInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.StabilityAnnotations.IStableInterface
    {
        private IStableInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Stable
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Stable
        /// </remarks>
        [JsiiMethod(name: "method")]
        public void Method()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

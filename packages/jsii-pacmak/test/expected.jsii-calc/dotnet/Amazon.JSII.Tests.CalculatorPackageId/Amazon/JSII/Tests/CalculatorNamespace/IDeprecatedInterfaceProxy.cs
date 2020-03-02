using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IDeprecatedInterface), fullyQualifiedName: "jsii-calc.IDeprecatedInterface")]
    [System.Obsolete("useless interface")]
    internal sealed class IDeprecatedInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IDeprecatedInterface
    {
        private IDeprecatedInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete("could be better")]
        public double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete("services no purpose")]
        public void Method()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

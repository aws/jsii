using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: deprecated
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IIDeprecatedInterface), fullyQualifiedName: "jsii-calc.IDeprecatedInterface")]
    [System.Obsolete("useless interface")]
    internal sealed class IDeprecatedInterfaceProxy : DeputyBase, IIDeprecatedInterface
    {
        private IDeprecatedInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete("could be better")]
        public double? MutableProperty
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete("services no purpose")]
        public void Method()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}

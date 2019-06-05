using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Deprecated</remarks>
    [JsiiTypeProxy(nativeType: typeof(IIDeprecatedInterface), fullyQualifiedName: "jsii-calc.IDeprecatedInterface")]
    [System.Obsolete("for the show")]
    internal sealed class IDeprecatedInterfaceProxy : DeputyBase, IIDeprecatedInterface
    {
        private IDeprecatedInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Deprecated</remarks>
        [JsiiProperty(name: "mutableProperty", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete("for the show")]
        public double? MutableProperty
        {
            get => GetInstanceProperty<double? >();
            set => SetInstanceProperty(value);
        }

        /// <remarks>stability: Deprecated</remarks>
        [JsiiMethod(name: "method")]
        [System.Obsolete("for the show")]
        public void Method()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
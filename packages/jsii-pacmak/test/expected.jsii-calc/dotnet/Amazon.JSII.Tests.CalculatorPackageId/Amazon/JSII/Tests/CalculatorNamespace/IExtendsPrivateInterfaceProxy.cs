using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IExtendsPrivateInterface), fullyQualifiedName: "jsii-calc.IExtendsPrivateInterface")]
    internal sealed class IExtendsPrivateInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IExtendsPrivateInterface
    {
        private IExtendsPrivateInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "moreThings", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public string[] MoreThings
        {
            get => GetInstanceProperty<string[]>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "private", typeJson: "{\"primitive\":\"string\"}")]
        public string Private
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}

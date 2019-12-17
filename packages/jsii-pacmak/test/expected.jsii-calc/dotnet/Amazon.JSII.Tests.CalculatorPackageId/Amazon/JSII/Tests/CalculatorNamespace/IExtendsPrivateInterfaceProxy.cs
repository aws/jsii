using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IExtendsPrivateInterface), fullyQualifiedName: "jsii-calc.IExtendsPrivateInterface")]
    internal sealed class IExtendsPrivateInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IExtendsPrivateInterface
    {
        private IExtendsPrivateInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "moreThings", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public string[] MoreThings
        {
            get => GetInstanceProperty<string[]>();
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "private", typeJson: "{\"primitive\":\"string\"}")]
        public string Private
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}

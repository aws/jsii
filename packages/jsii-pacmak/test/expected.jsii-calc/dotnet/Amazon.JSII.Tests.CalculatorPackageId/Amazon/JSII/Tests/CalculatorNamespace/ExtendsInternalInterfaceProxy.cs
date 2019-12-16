using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IExtendsInternalInterface), fullyQualifiedName: "jsii-calc.ExtendsInternalInterface")]
    internal sealed class ExtendsInternalInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IExtendsInternalInterface
    {
        private ExtendsInternalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "boom", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Boom
        {
            get => GetInstanceProperty<bool>();
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}")]
        public string Prop
        {
            get => GetInstanceProperty<string>();
        }
    }
}

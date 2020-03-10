using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IExtendsInternalInterface), fullyQualifiedName: "jsii-calc.compliance.ExtendsInternalInterface")]
    internal sealed class ExtendsInternalInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IExtendsInternalInterface
    {
        private ExtendsInternalInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "boom", typeJson: "{\"primitive\":\"boolean\"}")]
        public bool Boom
        {
            get => GetInstanceProperty<bool>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "prop", typeJson: "{\"primitive\":\"string\"}")]
        public string Prop
        {
            get => GetInstanceProperty<string>();
        }
    }
}

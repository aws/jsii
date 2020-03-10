using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IInterfaceWithProperties), fullyQualifiedName: "jsii-calc.compliance.IInterfaceWithProperties")]
    internal sealed class IInterfaceWithPropertiesProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IInterfaceWithProperties
    {
        private IInterfaceWithPropertiesProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "readOnlyString", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadOnlyString
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "readWriteString", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadWriteString
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}

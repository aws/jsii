using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IInterfaceWithPropertiesExtension), fullyQualifiedName: "jsii-calc.IInterfaceWithPropertiesExtension")]
    internal sealed class IInterfaceWithPropertiesExtensionProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithPropertiesExtension
    {
        private IInterfaceWithPropertiesExtensionProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "foo", typeJson: "{\"primitive\":\"number\"}")]
        public double Foo
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "readOnlyString", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadOnlyString
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "readWriteString", typeJson: "{\"primitive\":\"string\"}")]
        public string ReadWriteString
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}

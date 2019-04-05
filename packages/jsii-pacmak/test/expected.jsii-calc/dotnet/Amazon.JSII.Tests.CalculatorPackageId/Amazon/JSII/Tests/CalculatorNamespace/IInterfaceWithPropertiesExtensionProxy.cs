using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIInterfaceWithPropertiesExtension), "jsii-calc.IInterfaceWithPropertiesExtension")]
    internal sealed class IInterfaceWithPropertiesExtensionProxy : DeputyBase, IIInterfaceWithPropertiesExtension
    {
        private IInterfaceWithPropertiesExtensionProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("foo", "{\"type\":{\"primitive\":\"number\"}}")]
        public double Foo
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("readOnlyString", "{\"type\":{\"primitive\":\"string\"}}")]
        public string ReadOnlyString
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("readWriteString", "{\"type\":{\"primitive\":\"string\"}}")]
        public string ReadWriteString
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
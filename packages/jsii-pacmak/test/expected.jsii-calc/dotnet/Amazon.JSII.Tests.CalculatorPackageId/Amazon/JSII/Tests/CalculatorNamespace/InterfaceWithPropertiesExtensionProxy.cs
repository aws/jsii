using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IInterfaceWithPropertiesExtension), "jsii-calc.InterfaceWithPropertiesExtension")]
    internal sealed class InterfaceWithPropertiesExtensionProxy : DeputyBase, IInterfaceWithPropertiesExtension
    {
        private InterfaceWithPropertiesExtensionProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("foo", "{\"primitive\":\"number\"}")]
        public double Foo
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("readOnlyString", "{\"primitive\":\"string\"}")]
        public string ReadOnlyString
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("readWriteString", "{\"primitive\":\"string\"}")]
        public string ReadWriteString
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
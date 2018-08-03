using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterfaceProxy(typeof(IIInterfaceWithPropertiesExtension), "jsii-calc.IInterfaceWithPropertiesExtension")]
    internal class IInterfaceWithPropertiesExtensionProxy : DeputyBase, IIInterfaceWithPropertiesExtension
    {
        private IInterfaceWithPropertiesExtensionProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("foo", "{\"primitive\":\"number\"}")]
        public virtual double Foo
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("readOnlyString", "{\"primitive\":\"string\"}")]
        public virtual string ReadOnlyString
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("readWriteString", "{\"primitive\":\"string\"}")]
        public virtual string ReadWriteString
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
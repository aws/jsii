using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
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
            get => GetProperty<double>();
            set => SetProperty(value);
        }

        [JsiiProperty("readOnlyString", "{\"primitive\":\"string\"}")]
        public virtual string ReadOnlyString
        {
            get => GetProperty<string>();
        }

        [JsiiProperty("readWriteString", "{\"primitive\":\"string\"}")]
        public virtual string ReadWriteString
        {
            get => GetProperty<string>();
            set => SetProperty(value);
        }
    }
}
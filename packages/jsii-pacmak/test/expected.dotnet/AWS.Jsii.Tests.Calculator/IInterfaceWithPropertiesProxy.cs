using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiInterfaceProxy("jsii-calc", "jsii$jsii_calc$.IInterfaceWithProperties")]
    internal class IInterfaceWithPropertiesProxy : DeputyBase, IIInterfaceWithProperties
    {
        private IInterfaceWithPropertiesProxy(ByRefValue reference): base(reference)
        {
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
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterfaceProxy(typeof(IIInterfaceWithProperties), "jsii-calc.IInterfaceWithProperties")]
    internal class IInterfaceWithPropertiesProxy : DeputyBase, IIInterfaceWithProperties
    {
        private IInterfaceWithPropertiesProxy(ByRefValue reference): base(reference)
        {
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
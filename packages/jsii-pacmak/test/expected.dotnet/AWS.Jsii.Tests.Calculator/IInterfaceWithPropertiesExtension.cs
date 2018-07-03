using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    public class IInterfaceWithPropertiesExtension : DeputyBase, IIInterfaceWithPropertiesExtension
    {
        [JsiiProperty("foo", "{\"primitive\":\"number\"}", true)]
        public double Foo
        {
            get;
            set;
        }

        [JsiiProperty("readOnlyString", "{\"primitive\":\"string\"}", true)]
        public string ReadOnlyString
        {
            get;
        }

        [JsiiProperty("readWriteString", "{\"primitive\":\"string\"}", true)]
        public string ReadWriteString
        {
            get;
            set;
        }
    }
}
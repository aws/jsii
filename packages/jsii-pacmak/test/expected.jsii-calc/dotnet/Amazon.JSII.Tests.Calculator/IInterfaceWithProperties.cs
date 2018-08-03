using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    public class IInterfaceWithProperties : DeputyBase, IIInterfaceWithProperties
    {
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
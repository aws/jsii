using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    public class InterfaceWithProperties : DeputyBase, IInterfaceWithProperties
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
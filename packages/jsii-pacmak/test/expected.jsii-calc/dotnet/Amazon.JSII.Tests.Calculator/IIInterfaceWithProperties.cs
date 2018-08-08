using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiInterface(typeof(IIInterfaceWithProperties), "jsii-calc.IInterfaceWithProperties")]
    public interface IIInterfaceWithProperties
    {
        [JsiiProperty("readOnlyString", "{\"primitive\":\"string\"}")]
        string ReadOnlyString
        {
            get;
        }

        [JsiiProperty("readWriteString", "{\"primitive\":\"string\"}")]
        string ReadWriteString
        {
            get;
            set;
        }
    }
}
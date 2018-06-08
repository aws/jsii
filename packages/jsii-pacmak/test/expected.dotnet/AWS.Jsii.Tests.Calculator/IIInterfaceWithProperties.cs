using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiInterface("jsii-calc", "jsii$jsii_calc$.IInterfaceWithProperties")]
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
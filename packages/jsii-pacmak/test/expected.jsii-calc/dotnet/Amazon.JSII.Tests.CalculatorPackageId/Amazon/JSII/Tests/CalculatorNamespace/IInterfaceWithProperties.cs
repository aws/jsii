using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IInterfaceWithProperties), "jsii-calc.InterfaceWithProperties")]
    public interface IInterfaceWithProperties
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
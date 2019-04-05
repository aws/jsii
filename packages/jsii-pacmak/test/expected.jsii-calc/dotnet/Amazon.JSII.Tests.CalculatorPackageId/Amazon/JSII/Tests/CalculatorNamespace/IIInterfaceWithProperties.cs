using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIInterfaceWithProperties), "jsii-calc.IInterfaceWithProperties")]
    public interface IIInterfaceWithProperties
    {
        [JsiiProperty("readOnlyString", "{\"type\":{\"primitive\":\"string\"}}")]
        string ReadOnlyString
        {
            get;
        }

        [JsiiProperty("readWriteString", "{\"type\":{\"primitive\":\"string\"}}")]
        string ReadWriteString
        {
            get;
            set;
        }
    }
}
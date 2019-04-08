using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIPrivatelyImplemented), "jsii-calc.IPrivatelyImplemented")]
    public interface IIPrivatelyImplemented
    {
        [JsiiProperty("success", "{\"primitive\":\"boolean\"}")]
        bool Success
        {
            get;
        }
    }
}
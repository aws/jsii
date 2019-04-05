using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IINonInternalInterface), "jsii-calc.INonInternalInterface")]
    public interface IINonInternalInterface : IIAnotherPublicInterface
    {
        [JsiiProperty("b", "{\"type\":{\"primitive\":\"string\"}}")]
        string B
        {
            get;
            set;
        }

        [JsiiProperty("c", "{\"type\":{\"primitive\":\"string\"}}")]
        string C
        {
            get;
            set;
        }
    }
}
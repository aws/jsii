using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IINonInternalInterface), "jsii-calc.INonInternalInterface")]
    public interface IINonInternalInterface : IIAnotherPublicInterface
    {
        [JsiiProperty("c", "{\"primitive\":\"string\"}")]
        string C
        {
            get;
            set;
        }
    }
}
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIAnotherPublicInterface), "jsii-calc.IAnotherPublicInterface")]
    public interface IIAnotherPublicInterface
    {
        [JsiiProperty("a", "{\"primitive\":\"string\"}")]
        string A
        {
            get;
            set;
        }
    }
}
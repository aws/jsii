using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIPublicInterface), "jsii-calc.IPublicInterface")]
    public interface IIPublicInterface
    {
        [JsiiMethod("bye", "{\"primitive\":\"string\"}", "[]")]
        string Bye();
    }
}
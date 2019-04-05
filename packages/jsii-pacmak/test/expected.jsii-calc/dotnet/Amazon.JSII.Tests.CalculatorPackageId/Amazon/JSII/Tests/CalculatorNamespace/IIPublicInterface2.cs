using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIPublicInterface2), "jsii-calc.IPublicInterface2")]
    public interface IIPublicInterface2
    {
        [JsiiMethod("ciao", "{\"type\":{\"primitive\":\"string\"}}", "[]")]
        string Ciao();
    }
}
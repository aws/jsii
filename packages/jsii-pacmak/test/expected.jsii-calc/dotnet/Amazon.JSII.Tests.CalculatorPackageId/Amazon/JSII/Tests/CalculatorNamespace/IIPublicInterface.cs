using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIPublicInterface), "jsii-calc.IPublicInterface")]
    public interface IIPublicInterface
    {
        [JsiiMethod(name: "bye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[]")]
        string Bye();
    }
}
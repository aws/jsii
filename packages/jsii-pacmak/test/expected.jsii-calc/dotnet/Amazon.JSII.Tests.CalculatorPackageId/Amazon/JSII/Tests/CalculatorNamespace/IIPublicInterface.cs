using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIPublicInterface), fullyQualifiedName: "jsii-calc.IPublicInterface")]
    public interface IIPublicInterface
    {
        [JsiiMethod(name: "bye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        string Bye();
    }
}

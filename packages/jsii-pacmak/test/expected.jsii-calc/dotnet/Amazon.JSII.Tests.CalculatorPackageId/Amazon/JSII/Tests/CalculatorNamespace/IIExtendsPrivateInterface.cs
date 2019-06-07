using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(nativeType: typeof(IIExtendsPrivateInterface), fullyQualifiedName: "jsii-calc.IExtendsPrivateInterface")]
    public interface IIExtendsPrivateInterface
    {
        [JsiiProperty(name: "moreThings", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        string[] MoreThings
        {
            get;
        }

        [JsiiProperty(name: "private", typeJson: "{\"primitive\":\"string\"}")]
        string Private
        {
            get;
            set;
        }
    }
}

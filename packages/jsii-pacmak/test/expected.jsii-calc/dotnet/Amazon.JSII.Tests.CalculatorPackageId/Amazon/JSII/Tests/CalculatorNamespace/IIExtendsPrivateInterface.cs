using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIExtendsPrivateInterface), "jsii-calc.IExtendsPrivateInterface")]
    public interface IIExtendsPrivateInterface
    {
        [JsiiProperty(name: "moreThings", typeJson: "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
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
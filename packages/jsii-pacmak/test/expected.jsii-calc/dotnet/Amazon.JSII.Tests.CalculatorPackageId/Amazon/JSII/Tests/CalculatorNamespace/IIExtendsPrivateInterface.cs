using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIExtendsPrivateInterface), "jsii-calc.IExtendsPrivateInterface")]
    public interface IIExtendsPrivateInterface
    {
        [JsiiProperty("moreThings", "{\"type\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"type\":{\"primitive\":\"string\"}}}}}")]
        string[] MoreThings
        {
            get;
        }

        [JsiiProperty("private", "{\"type\":{\"primitive\":\"string\"}}")]
        string Private
        {
            get;
            set;
        }
    }
}
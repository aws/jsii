using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IIExtendsPrivateInterface), "jsii-calc.IExtendsPrivateInterface")]
    public interface IIExtendsPrivateInterface
    {
        [JsiiProperty("moreThings", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        string[] MoreThings
        {
            get;
        }

        [JsiiProperty("private", "{\"primitive\":\"string\"}")]
        string Private
        {
            get;
            set;
        }
    }
}
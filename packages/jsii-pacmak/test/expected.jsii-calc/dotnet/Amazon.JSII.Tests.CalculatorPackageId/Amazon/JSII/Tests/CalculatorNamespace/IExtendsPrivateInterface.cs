using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiInterface(typeof(IExtendsPrivateInterface), "jsii-calc.ExtendsPrivateInterface")]
    public interface IExtendsPrivateInterface
    {
        [JsiiProperty("moreThings", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        string[] MoreThings
        {
            get;
        }
    }
}
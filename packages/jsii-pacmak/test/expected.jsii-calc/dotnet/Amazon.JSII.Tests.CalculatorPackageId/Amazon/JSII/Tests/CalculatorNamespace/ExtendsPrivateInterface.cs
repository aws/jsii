using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class ExtendsPrivateInterface : IExtendsPrivateInterface
    {
        [JsiiProperty("moreThings", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", true)]
        public string[] MoreThings
        {
            get;
            set;
        }
    }
}
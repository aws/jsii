using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    public class ExtendsPrivateInterface : DeputyBase, IExtendsPrivateInterface
    {
        [JsiiProperty("moreThings", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"primitive\":\"string\"}}}", true)]
        public string[] MoreThings
        {
            get;
            set;
        }
    }
}
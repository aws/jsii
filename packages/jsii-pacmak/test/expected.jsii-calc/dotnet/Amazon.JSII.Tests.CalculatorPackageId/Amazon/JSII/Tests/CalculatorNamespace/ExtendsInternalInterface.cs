using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class ExtendsInternalInterface : IExtendsInternalInterface
    {
        [JsiiProperty("boom", "{\"type\":{\"primitive\":\"boolean\"}}", true)]
        public bool Boom
        {
            get;
            set;
        }

        [JsiiProperty("prop", "{\"type\":{\"primitive\":\"string\"}}", true)]
        public string Prop
        {
            get;
            set;
        }
    }
}
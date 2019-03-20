using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiByValue]
    public class ExtendsInternalInterface : IExtendsInternalInterface
    {
        [JsiiProperty("boom", "{\"primitive\":\"boolean\"}", true)]
        public bool Boom
        {
            get;
            set;
        }
    }
}
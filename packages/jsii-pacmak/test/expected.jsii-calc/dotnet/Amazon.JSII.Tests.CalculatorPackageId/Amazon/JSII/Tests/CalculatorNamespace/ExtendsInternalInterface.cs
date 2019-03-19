using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    public class ExtendsInternalInterface : DeputyBase, IExtendsInternalInterface
    {
        [JsiiProperty("boom", "{\"primitive\":\"boolean\"}", true)]
        public bool Boom
        {
            get;
            set;
        }
    }
}
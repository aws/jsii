using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIPublicInterface2), "jsii-calc.IPublicInterface2")]
    internal sealed class IPublicInterface2Proxy : DeputyBase, IIPublicInterface2
    {
        private IPublicInterface2Proxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod("ciao", "{\"primitive\":\"string\"}", "[]")]
        public string Ciao()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}
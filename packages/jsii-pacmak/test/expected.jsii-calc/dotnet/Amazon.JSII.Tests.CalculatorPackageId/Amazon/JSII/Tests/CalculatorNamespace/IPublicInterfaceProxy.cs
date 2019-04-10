using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIPublicInterface), "jsii-calc.IPublicInterface")]
    internal sealed class IPublicInterfaceProxy : DeputyBase, IIPublicInterface
    {
        private IPublicInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(name: "bye", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[]")]
        public string Bye()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}
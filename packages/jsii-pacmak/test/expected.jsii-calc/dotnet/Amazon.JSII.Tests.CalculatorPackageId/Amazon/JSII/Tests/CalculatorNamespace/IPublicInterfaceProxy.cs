using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIPublicInterface), "jsii-calc.IPublicInterface")]
    internal sealed class IPublicInterfaceProxy : DeputyBase, IIPublicInterface
    {
        private IPublicInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod("bye", null, "[]")]
        public void Bye()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
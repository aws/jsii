using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIInterfaceWithMethods), "jsii-calc.IInterfaceWithMethods")]
    internal sealed class IInterfaceWithMethodsProxy : DeputyBase, IIInterfaceWithMethods
    {
        private IInterfaceWithMethodsProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiProperty("value", "{\"type\":{\"primitive\":\"string\"}}")]
        public string Value
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiMethod("doThings", null, "[]")]
        public void DoThings()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
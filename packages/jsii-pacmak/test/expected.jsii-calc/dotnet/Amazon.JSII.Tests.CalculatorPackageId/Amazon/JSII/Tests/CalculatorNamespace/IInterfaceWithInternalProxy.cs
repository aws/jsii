using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(typeof(IIInterfaceWithInternal), "jsii-calc.IInterfaceWithInternal")]
    internal sealed class IInterfaceWithInternalProxy : DeputyBase, IIInterfaceWithInternal
    {
        private IInterfaceWithInternalProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(name: "visible", returnsJson: null, parametersJson: "[]")]
        public void Visible()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
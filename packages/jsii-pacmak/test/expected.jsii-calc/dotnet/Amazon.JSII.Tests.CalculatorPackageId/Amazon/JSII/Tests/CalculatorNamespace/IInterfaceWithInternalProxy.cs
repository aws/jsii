using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IIInterfaceWithInternal), fullyQualifiedName: "jsii-calc.IInterfaceWithInternal")]
    internal sealed class IInterfaceWithInternalProxy : DeputyBase, IIInterfaceWithInternal
    {
        private IInterfaceWithInternalProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(name: "visible")]
        public void Visible()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}

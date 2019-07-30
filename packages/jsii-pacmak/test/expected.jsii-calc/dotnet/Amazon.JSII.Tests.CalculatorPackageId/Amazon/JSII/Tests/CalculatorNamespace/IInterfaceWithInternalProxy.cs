using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>stability: Experimental</remarks>
    [JsiiTypeProxy(nativeType: typeof(IIInterfaceWithInternal), fullyQualifiedName: "jsii-calc.IInterfaceWithInternal")]
    internal sealed class IInterfaceWithInternalProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IIInterfaceWithInternal
    {
        private IInterfaceWithInternalProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>stability: Experimental</remarks>
        [JsiiMethod(name: "visible")]
        public void Visible()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
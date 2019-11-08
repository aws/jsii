using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IVeryBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base-of-base.IVeryBaseInterface")]
    internal sealed class IVeryBaseInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.IVeryBaseInterface
    {
        private IVeryBaseInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

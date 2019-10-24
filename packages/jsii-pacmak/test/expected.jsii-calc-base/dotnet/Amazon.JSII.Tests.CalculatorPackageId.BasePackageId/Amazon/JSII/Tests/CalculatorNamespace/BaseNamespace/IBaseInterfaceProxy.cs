using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base.IBaseInterface")]
    internal sealed class IBaseInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.IBaseInterface
    {
        private IBaseInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(name: "bar")]
        public void Bar()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

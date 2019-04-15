using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    [JsiiTypeProxy(nativeType: typeof(IIBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base.IBaseInterface")]
    internal sealed class IBaseInterfaceProxy : DeputyBase, IIBaseInterface
    {
        private IBaseInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        [JsiiMethod(name: "bar")]
        public void Bar()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
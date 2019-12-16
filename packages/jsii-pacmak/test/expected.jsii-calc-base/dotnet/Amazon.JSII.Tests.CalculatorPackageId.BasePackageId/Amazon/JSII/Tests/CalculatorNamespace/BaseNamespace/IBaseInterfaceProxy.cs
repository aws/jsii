using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace
{
    /// <summary></summary>
    [JsiiTypeProxy(nativeType: typeof(IBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base.IBaseInterface")]
    internal sealed class IBaseInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.BaseNamespace.IBaseInterface
    {
        private IBaseInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        [JsiiMethod(name: "bar")]
        public void Bar()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

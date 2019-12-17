using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace
{
    /// <summary></summary>
    [JsiiTypeProxy(nativeType: typeof(IVeryBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base-of-base.IVeryBaseInterface")]
    internal sealed class IVeryBaseInterfaceProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.BaseOfBaseNamespace.IVeryBaseInterface
    {
        private IVeryBaseInterfaceProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        [JsiiMethod(name: "foo")]
        public void Foo()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

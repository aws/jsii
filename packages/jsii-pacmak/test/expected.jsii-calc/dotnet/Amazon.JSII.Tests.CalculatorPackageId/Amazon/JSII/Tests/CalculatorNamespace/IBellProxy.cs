using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IBell), fullyQualifiedName: "jsii-calc.IBell")]
    internal sealed class IBellProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IBell
    {
        private IBellProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "ring")]
        public void Ring()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

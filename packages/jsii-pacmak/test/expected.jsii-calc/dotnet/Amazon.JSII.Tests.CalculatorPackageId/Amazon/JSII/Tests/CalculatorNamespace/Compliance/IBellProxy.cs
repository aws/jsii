using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IBell), fullyQualifiedName: "jsii-calc.compliance.IBell")]
    internal sealed class IBellProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IBell
    {
        private IBellProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "ring")]
        public void Ring()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}

using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that a "pure" implementation of an interface works correctly.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStructReturningDelegate), fullyQualifiedName: "jsii-calc.IStructReturningDelegate")]
    internal sealed class IStructReturningDelegateProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IStructReturningDelegate
    {
        private IStructReturningDelegateProxy(ByRefValue reference): base(reference)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnStruct", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.StructB\"}}")]
        public Amazon.JSII.Tests.CalculatorNamespace.IStructB ReturnStruct()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IStructB>(new System.Type[]{}, new object[]{});
        }
    }
}

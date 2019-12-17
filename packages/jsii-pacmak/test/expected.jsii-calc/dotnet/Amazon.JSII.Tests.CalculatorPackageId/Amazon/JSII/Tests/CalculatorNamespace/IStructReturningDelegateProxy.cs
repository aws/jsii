using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that a "pure" implementation of an interface works correctly.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(IStructReturningDelegate), fullyQualifiedName: "jsii-calc.IStructReturningDelegate")]
    internal sealed class IStructReturningDelegateProxy : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IStructReturningDelegate
    {
        private IStructReturningDelegateProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnStruct", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.StructB\"}}")]
        public Amazon.JSII.Tests.CalculatorNamespace.IStructB ReturnStruct()
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.IStructB>(new System.Type[]{}, new object[]{});
        }
    }
}

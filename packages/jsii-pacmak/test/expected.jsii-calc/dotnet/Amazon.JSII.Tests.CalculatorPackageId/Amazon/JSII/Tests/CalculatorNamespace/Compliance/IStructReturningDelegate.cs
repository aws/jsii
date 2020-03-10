using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Verifies that a "pure" implementation of an interface works correctly.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStructReturningDelegate), fullyQualifiedName: "jsii-calc.compliance.IStructReturningDelegate")]
    public interface IStructReturningDelegate
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "returnStruct", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.StructB\"}}")]
        Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructB ReturnStruct();
    }
}
